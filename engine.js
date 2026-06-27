/* ============================================================================
   engine.js — THE SHARED BRAIN
   Pure logic, no DOM. Used by BOTH the web app and the Chrome extension so the
   detection rules live in one place. Reads root.CASE_DATA (from cases.js).

   Detection works on FIVE signals, not just "X v. Y":
     (1) landmark name from the index            ("Puttaswamy", no "v.")
     (2) a citation that matches the index        ("(2017) 10 SCC 1" alone)
     (3) party-vs-party, any connector            (v / v. / vs / vs. / versus)
     (4) a name (or bare citation) before a cite  ("Tata Sons Ltd, AIR 2010 SC 9")
     (5) statutes & constitutional Articles        (rule-based, all-India)
   ========================================================================== */
(function (root) {
  var CASES = root.CASE_DATA || [];

  function escRe(s){ return s.replace(/[.*+?^${}()|[\]\\]/g, "\\$&"); }
  function citeRegex(cite){ return new RegExp(cite.trim().split(/\s+/).map(escRe).join("\\s+") + "(?!\\d)", "g"); }

  var CITE_INDEX = [];
  CASES.forEach(function (c) { [c.air, c.scc].forEach(function (ci) { if (ci) CITE_INDEX.push({ re: citeRegex(ci), case: c }); }); });

  var CONNECT = "(?:v\\.?|vs\\.?|versus|V\\.?|Vs\\.?|VS|Versus|VERSUS)";
  var LC = "(?:of|the|&)";
  var WORD = "(?:[A-Z][A-Za-z.&'’()\\/-]*|" + LC + ")";
  var PARTY = "[A-Z][A-Za-z.&'’()\\/-]+(?:\\s+" + WORD + ")*";
  var CASE_RE = new RegExp("\\b(" + PARTY + ")\\s+" + CONNECT + "\\s+(" + PARTY + ")", "g");
  var REP_RE = /((?:19|20)\d{2}\s+SCC\s+OnLine\s+[A-Za-z]{2,5}\s+\d{1,6})|(\(\s*(?:19|20)\d{2}\s*\)\s*\d{1,3}\s+(?:SCC|SCR)\s+\d{1,6})|(AIR\s+(?:19|20)\d{2}\s+[A-Za-z]{2,6}\s+\d{1,6})|((?:19|20)\d{2}\s+INSC\s+\d{1,6})|((?:19|20)\d{2}\s*:\s*[A-Z]{2,6}\s*:\s*\d{1,6})/g;
  var PARTY_END = new RegExp(PARTY + "\\s*,?\\s*$");

  // statutes & Articles — rule-based, works for ANY Indian statute
  // Section(s) N[, N and N] of [the] <Name> Act/Code/Sanhita/Adhiniyam[, YEAR] — "the" and year optional
  var STATUTE_RE = /\bS(?:ections?|ecs?\.?|\.)\s*\d+[A-Z]{0,3}(?:\(\d+\))?(?:\s*(?:,|and|&|to)\s*\d+[A-Z]{0,3}(?:\(\d+\))?)*\s+of\s+(?:the\s+)?[A-Z][A-Za-z0-9()'’.\- ]+?(?:Act|Code|Sanhita|Adhiniyam)(?:,?\s+(?:18|19|20)\d{2})?\b/g;
  var ARTICLE_RE = /\bArticles?\s+\d+[A-Z]?(?:\(\d+\))?(?:\s*(?:,|and|&|to)\s*\d+[A-Z]?(?:\(\d+\))?)*\s+of\s+the\s+Constitution(?:\s+of\s+India)?\b/g;
  var CODE_RE = /\bS(?:ections?|ecs?\.?|\.)\s*\d+[A-Z]{0,3}(?:\(\d+\))?(?:\s*(?:,|and|&|to)\s*\d+[A-Z]{0,3})*\s+(?:of\s+the\s+)?(?:IPC|CrPC|Cr\.?P\.?C\.?|CPC|C\.?P\.?C\.?|BNS|BNSS|BSA)\b/g;

  // canonical names for commonly abbreviated Acts (so "Contract Act" → its full title)
  var ACT_ALIASES = [
    {re:/contract act/i, name:"Indian Contract Act, 1872"},
    {re:/indian penal code|\bi\.?p\.?c\.?\b/i, name:"Indian Penal Code, 1860"},
    {re:/code of criminal procedure|\bcr\.?\s?p\.?c\.?\b/i, name:"Code of Criminal Procedure, 1973"},
    {re:/code of civil procedure|\bc\.?p\.?c\.?\b/i, name:"Code of Civil Procedure, 1908"},
    {re:/evidence act/i, name:"Indian Evidence Act, 1872"},
    {re:/transfer of property act/i, name:"Transfer of Property Act, 1882"},
    {re:/information technology act|\bit act\b/i, name:"Information Technology Act, 2000"},
    {re:/specific relief act/i, name:"Specific Relief Act, 1963"},
    {re:/negotiable instruments act/i, name:"Negotiable Instruments Act, 1881"},
    {re:/sale of goods act/i, name:"Sale of Goods Act, 1930"},
    {re:/companies act/i, name:"Companies Act, 2013"},
    {re:/bharatiya nyaya sanhita|\bbns\b/i, name:"Bharatiya Nyaya Sanhita, 2023"},
    {re:/bharatiya nagarik suraksha sanhita|\bbnss\b/i, name:"Bharatiya Nagarik Suraksha Sanhita, 2023"},
    {re:/bharatiya sakshya adhiniyam|\bbsa\b/i, name:"Bharatiya Sakshya Adhiniyam, 2023"}
  ];
  function canonicalAct(raw){ for (var i=0;i<ACT_ALIASES.length;i++) if (ACT_ALIASES[i].re.test(raw)) return ACT_ALIASES[i].name; return null; }

  function resolve(spanText){
    var t = spanText.toLowerCase(), best = null, bestLen = 0;
    for (var i=0;i<CASES.length;i++){ var c=CASES[i]; for (var j=0;j<c.trig.length;j++){ var tg=c.trig[j]; if (t.indexOf(tg)!==-1 && tg.length>bestLen){ best=c; bestLen=tg.length; } } }
    return best;
  }

  function findMentions(text){
    var low = text.toLowerCase(), spans = [], i, m;
    // (1) landmark names
    for (i=0;i<CASES.length;i++){ var c=CASES[i]; for (var j=0;j<c.trig.length;j++){ var tg=c.trig[j], from=0, k; while ((k=low.indexOf(tg,from))!==-1){ spans.push({start:k,end:k+tg.length,case:c,label:text.slice(k,k+tg.length)}); from=k+tg.length; } } }
    // (2) citations matching the index
    for (i=0;i<CITE_INDEX.length;i++){ var ci=CITE_INDEX[i]; ci.re.lastIndex=0; while ((m=ci.re.exec(text))!==null){ spans.push({start:m.index,end:m.index+m[0].length,case:ci.case,label:ci.case.name}); } }
    // (3) party vs party, any connector
    CASE_RE.lastIndex=0; while ((m=CASE_RE.exec(text))!==null){ var raw=m[0].trim(); spans.push({start:m.index,end:m.index+m[0].length,case:resolve(raw),label:raw}); }
    // (4) name (or bare citation) just before a reporter citation
    REP_RE.lastIndex=0; var r;
    while ((r=REP_RE.exec(text))!==null){
      var cite=r[0], cStart=r.index, base=Math.max(0,cStart-90), pre=text.slice(base,cStart), byCite=null;
      for (i=0;i<CITE_INDEX.length;i++){ CITE_INDEX[i].re.lastIndex=0; if (CITE_INDEX[i].re.test(cite)){ byCite=CITE_INDEX[i].case; break; } }
      var tail=pre.match(PARTY_END), name=tail?tail[0].replace(/[\s,]+$/,""):null;
      var start=name?base+tail.index:cStart, cse=byCite||(name?resolve(name):null);
      spans.push({start:start,end:cStart+cite.length,case:cse,label:cse?cse.name:(name||cite)});
    }
    spans.sort(function(a,b){ return a.start-b.start || (b.end-b.start)-(a.end-a.start) || ((b.case?1:0)-(a.case?1:0)); });
    var kept=[], lastEnd=-1;
    for (i=0;i<spans.length;i++){ if (spans[i].start<lastEnd) continue; kept.push(spans[i]); lastEnd=spans[i].end; }
    return kept;
  }

  function buildAuthorities(mentions){
    var order=[], byKey={};
    for (var i=0;i<mentions.length;i++){ var mm=mentions[i];
      var key = mm.case ? ("db:"+mm.case.name) : ("nm:"+mm.label.replace(/\s+/g," ").trim().toLowerCase());
      if (!(key in byKey)){ byKey[key]={num:order.length+1, case:mm.case, label:mm.label.replace(/\s+/g," ").trim()}; order.push(byKey[key]); }
      mm.num = byKey[key].num;
    }
    return order;
  }

  function findStatutes(text){
    var out=[], seen={}, defs=[["Statute",STATUTE_RE],["Article",ARTICLE_RE],["Code",CODE_RE]], m;
    for (var d=0; d<defs.length; d++){ var type=defs[d][0], re=defs[d][1]; re.lastIndex=0;
      while ((m=re.exec(text))!==null){ var raw=m[0].replace(/\s+/g," ").trim(), key=raw.toLowerCase(); if (seen[key]) continue; seen[key]=1; out.push({raw:raw,type:type,canon:(type==="Article"?null:canonicalAct(raw))}); } }
    return out;
  }

  function findReporters(text){
    var out=[], seen={}, pats=[
      {re:/\b(?:19|20)\d{2}\s+SCC\s+OnLine\s+[A-Za-z]{2,5}\s+\d{1,6}\b/gi,t:"SCC OnLine"},
      {re:/\(\s*(?:19|20)\d{2}\s*\)\s*\d{1,3}\s+SCC\s+\d{1,6}\b/gi,t:"SCC"},
      {re:/\bAIR\s+(?:19|20)\d{2}\s+[A-Za-z]{2,6}\s+\d{1,6}\b/gi,t:"AIR"},
      {re:/\b(?:19|20)\d{2}\s+INSC\s+\d{1,6}\b/gi,t:"Neutral (SC)"},
      {re:/\b(?:19|20)\d{2}\s*:\s*[A-Z]{2,6}\s*:\s*\d{1,6}\b/gi,t:"Neutral (HC)"}
    ], m;
    pats.forEach(function(p){ while ((m=p.re.exec(text))!==null){ var k=m[0].toLowerCase().replace(/\s+/g," "); if (seen[k]) continue; seen[k]=1; out.push({raw:m[0].replace(/\s+/g," ").trim(),type:p.t}); } });
    return out;
  }

  var CUR_YEAR = new Date().getFullYear();
  function checkReporter(c){
    var flags=[], y=(c.raw.match(/(?:19|20)\d{2}/)||[])[0];
    if (y && parseInt(y,10)>CUR_YEAR) flags.push(["bad","Impossible year ("+y+")"]);
    if (/\bS\.C\.C\.|A\.I\.R\./i.test(c.raw)) flags.push(["warn","Drop full stops: SCC / AIR"]);
    var pg=(c.raw.match(/\b(\d{3,6})\b(?!.*\d)/)||[])[1];
    if (pg && /^(9999|0000)$/.test(pg)) flags.push(["warn","Page looks artificial ("+pg+")"]);
    if (!flags.length) flags.push(["ok","Format looks valid"]);
    return flags;
  }

  function primaryCite(c, style){ return style==="court" ? (c.air||c.scc) : (c.scc||c.air); }
  function secondaryCite(c, style){ return style==="court" ? (c.air?c.scc:"") : (c.scc?c.air:""); }
  function citePlain(c, style){ return c.name + ", " + primaryCite(c, style); }
  function kanoonCase(c){ var q=c.name.replace(/\s+v\.?\s+/i," ")+" "+(c.air||c.scc||""); return "https://indiankanoon.org/search/?formInput="+encodeURIComponent(q.trim()); }
  function kanoonRaw(s){ return "https://indiankanoon.org/search/?formInput="+encodeURIComponent(s); }

  function plainExport(text, mentions, authorities, statutes, style){
    mentions.sort(function(a,b){return a.start-b.start;});
    var body="", cur=0;
    for (var i=0;i<mentions.length;i++){ var m=mentions[i]; if (m.end<cur) continue; body+=text.slice(cur,m.end)+"["+m.num+"]"; cur=m.end; }
    body+=text.slice(cur);
    var notes="\n\n— Table of Authorities —\n";
    for (i=0;i<authorities.length;i++){ var a=authorities[i];
      notes += (i+1)+". " + (a.case ? citePlain(a.case, style)+"   ["+a.case.bench+" bench, "+a.case.year+(a.case.treatment?"; "+a.case.treatment.status.toUpperCase():"")+"]" : a.label+"  [citation needed — verify]") + "\n"; }
    if (statutes && statutes.length){ notes+="\n— Statutes & provisions —\n"; for (i=0;i<statutes.length;i++) notes += "• "+statutes[i].raw+"\n"; }
    return body+notes;
  }

  root.LegalCite = {
    CASES: CASES,
    findMentions: findMentions,
    buildAuthorities: buildAuthorities,
    findStatutes: findStatutes,
    findReporters: findReporters,
    checkReporter: checkReporter,
    resolve: resolve,
    primaryCite: primaryCite,
    secondaryCite: secondaryCite,
    citePlain: citePlain,
    kanoonCase: kanoonCase,
    kanoonRaw: kanoonRaw,
    plainExport: plainExport
  };
})(typeof window !== "undefined" ? window : globalThis);
