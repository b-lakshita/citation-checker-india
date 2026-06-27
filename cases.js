/* ============================================================================
   cases.js — THE EDITABLE INDEX
   This is the only file you touch to grow the tool. Add an object in the same
   shape and both the web app and the Chrome extension pick it up automatically.

   Every citation here was verified against Indian Kanoon / official reporters.
   Before adding a NEW case, confirm its citation the same way — a citation tool
   that ships a wrong cite is worse than none.

   Fields:
     name      canonical case name (how it should appear in a footnote)
     air       AIR citation (or "" if none)
     scc       SCC / SCR citation
     year      year of decision
     bench     bench strength, e.g. "9-judge"
     trig      lowercase phrases that identify the case in running text
     treatment OPTIONAL {status, note} — status: "overruled" | "partly" | "doubted".
               Omit for cases that remain good law with no notable adverse history.
   ========================================================================== */
(function (root) {
  root.CASE_DATA = [
    {name:"M.P. Sharma v. Satish Chandra", air:"AIR 1954 SC 300", scc:"1954 SCR 1077", year:1954, bench:"8-judge", trig:["m.p. sharma","m. p. sharma","mp sharma","sharma v. satish","sharma v satish"],
      treatment:{status:"partly", note:"Its observation that the Constitution contains no right to privacy was overruled in K.S. Puttaswamy (2017)."}},
    {name:"A.K. Gopalan v. State of Madras", air:"AIR 1950 SC 27", scc:"1950 SCR 88", year:1950, bench:"6-judge", trig:["a.k. gopalan","a. k. gopalan","ak gopalan","gopalan v. state of madras","gopalan v state","gopalan"],
      treatment:{status:"overruled", note:"The 'mutually exclusive fundamental rights' approach was overruled in R.C. Cooper (1970) and Maneka Gandhi (1978)."}},
    {name:"Kharak Singh v. State of U.P.", air:"AIR 1963 SC 1295", scc:"(1964) 1 SCR 332", year:1963, bench:"6-judge", trig:["kharak singh"],
      treatment:{status:"partly", note:"Its holding that privacy is not a guaranteed right was overruled in K.S. Puttaswamy (2017); the surveillance reasoning was doubted."}},
    {name:"Kameshwar Prasad v. State of Bihar", air:"AIR 1962 SC 1166", scc:"1962 Supp (3) SCR 369", year:1962, bench:"5-judge", trig:["kameshwar prasad"]},
    {name:"R.C. Cooper v. Union of India", air:"AIR 1970 SC 564", scc:"(1970) 1 SCC 248", year:1970, bench:"11-judge", trig:["r.c. cooper","rc cooper","cooper v. union","bank nationalisation","bank nationalization"]},
    {name:"Kesavananda Bharati v. State of Kerala", air:"AIR 1973 SC 1461", scc:"(1973) 4 SCC 225", year:1973, bench:"13-judge", trig:["kesavananda"]},
    {name:"Indira Nehru Gandhi v. Raj Narain", air:"AIR 1975 SC 2299", scc:"1975 Supp SCC 1", year:1975, bench:"5-judge", trig:["indira nehru gandhi","raj narain"]},
    {name:"Gobind v. State of M.P.", air:"AIR 1975 SC 1378", scc:"(1975) 2 SCC 148", year:1975, bench:"3-judge", trig:["gobind v.","gobind v state","govind v. state of m"]},
    {name:"ADM Jabalpur v. Shivkant Shukla", air:"AIR 1976 SC 1207", scc:"(1976) 2 SCC 521", year:1976, bench:"5-judge", trig:["adm jabalpur","a.d.m. jabalpur","shivkant shukla","shivakant shukla","jabalpur v"],
      treatment:{status:"overruled", note:"Expressly overruled in K.S. Puttaswamy (2017); the lone dissent of Khanna J. was vindicated."}},
    {name:"Maneka Gandhi v. Union of India", air:"AIR 1978 SC 597", scc:"(1978) 1 SCC 248", year:1978, bench:"7-judge", trig:["maneka gandhi"]},
    {name:"Minerva Mills v. Union of India", air:"AIR 1980 SC 1789", scc:"(1980) 3 SCC 625", year:1980, bench:"5-judge", trig:["minerva mills"]},
    {name:"Bachan Singh v. State of Punjab", air:"AIR 1980 SC 898", scc:"(1980) 2 SCC 684", year:1980, bench:"5-judge", trig:["bachan singh"]},
    {name:"Olga Tellis v. Bombay Municipal Corporation", air:"AIR 1986 SC 180", scc:"(1985) 3 SCC 545", year:1985, bench:"5-judge", trig:["olga tellis"]},
    {name:"Bijoe Emmanuel v. State of Kerala", air:"AIR 1987 SC 748", scc:"(1986) 3 SCC 615", year:1986, bench:"2-judge", trig:["bijoe emmanuel"]},
    {name:"Indra Sawhney v. Union of India", air:"AIR 1993 SC 477", scc:"1992 Supp (3) SCC 217", year:1992, bench:"9-judge", trig:["indra sawhney","indira sawhney","mandal commission"]},
    {name:"S.R. Bommai v. Union of India", air:"AIR 1994 SC 1918", scc:"(1994) 3 SCC 1", year:1994, bench:"9-judge", trig:["bommai"]},
    {name:"Vishaka v. State of Rajasthan", air:"AIR 1997 SC 3011", scc:"(1997) 6 SCC 241", year:1997, bench:"3-judge", trig:["vishaka","vishakha"],
      treatment:{status:"partly", note:"The Vishaka Guidelines were largely superseded by the Sexual Harassment of Women at Workplace Act, 2013 (the POSH Act)."}},
    {name:"D.K. Basu v. State of West Bengal", air:"AIR 1997 SC 610", scc:"(1997) 1 SCC 416", year:1997, bench:"2-judge", trig:["d.k. basu","dk basu"]},
    {name:"I.R. Coelho v. State of Tamil Nadu", air:"AIR 2007 SC 861", scc:"(2007) 2 SCC 1", year:2007, bench:"9-judge", trig:["i.r. coelho","ir coelho","coelho"]},
    {name:"Shreya Singhal v. Union of India", air:"AIR 2015 SC 1523", scc:"(2015) 5 SCC 1", year:2015, bench:"2-judge", trig:["shreya singhal","section 66a","66a"]},
    {name:"K.S. Puttaswamy v. Union of India", air:"AIR 2017 SC 4161", scc:"(2017) 10 SCC 1", year:2017, bench:"9-judge", trig:["puttaswamy","puttuswamy"]},
    {name:"Navtej Singh Johar v. Union of India", air:"AIR 2018 SC 4321", scc:"(2018) 10 SCC 1", year:2018, bench:"5-judge", trig:["navtej","section 377","s. 377"]},
    {name:"Joseph Shine v. Union of India", air:"AIR 2018 SC 4898", scc:"(2019) 3 SCC 39", year:2019, bench:"5-judge", trig:["joseph shine"]},
    {name:"Indian Young Lawyers Assn. v. State of Kerala", air:"", scc:"(2019) 11 SCC 1", year:2019, bench:"5-judge", trig:["young lawyers","sabarimala"]},

    // ---- Contract & tort ----
    {name:"Mohori Bibee v. Dharmodas Ghose", air:"", scc:"(1903) 30 IA 114; ILR (1903) 30 Cal 539", year:1903, bench:"Privy Council", trig:["mohori bibee","mohori bibi","mohoree bibee","dharmodas ghose","dharmodas","dharmadas"]},
    {name:"Lalman Shukla v. Gauri Dutt", air:"", scc:"(1913) 11 All LJ 489", year:1913, bench:"Allahabad HC", trig:["lalman shukla","gauri dutt"]},
    {name:"Satyabrata Ghose v. Mugneeram Bangur & Co.", air:"AIR 1954 SC 44", scc:"1954 SCR 310", year:1954, bench:"3-judge", trig:["satyabrata ghose","mugneeram bangur"]},
    {name:"Central Inland Water Transport Corp. v. Brojo Nath Ganguly", air:"AIR 1986 SC 1571", scc:"(1986) 3 SCC 156", year:1986, bench:"2-judge", trig:["central inland water","brojo nath ganguly","brojo nath"]},
    {name:"M.C. Mehta v. Union of India (Oleum Gas Leak)", air:"AIR 1987 SC 1086", scc:"(1987) 1 SCC 395", year:1987, bench:"5-judge", trig:["oleum","shriram food","absolute liability"]},
    {name:"Indian Medical Association v. V.P. Shantha", air:"AIR 1996 SC 550", scc:"(1995) 6 SCC 651", year:1995, bench:"3-judge", trig:["v.p. shantha","vp shantha"]},
    {name:"Rudul Sah v. State of Bihar", air:"AIR 1983 SC 1086", scc:"(1983) 4 SCC 141", year:1983, bench:"3-judge", trig:["rudul sah"]},

    // ---- Constitutional ----
    {name:"State of Madras v. Champakam Dorairajan", air:"AIR 1951 SC 226", scc:"1951 SCR 525", year:1951, bench:"7-judge", trig:["champakam","dorairajan"],
      treatment:{status:"partly", note:"Superseded by the Constitution (First Amendment) Act 1951, which inserted Article 15(4)."}},
    {name:"I.C. Golaknath v. State of Punjab", air:"AIR 1967 SC 1643", scc:"(1967) 2 SCR 762", year:1967, bench:"11-judge", trig:["golaknath","golak nath"],
      treatment:{status:"overruled", note:"Overruled by Kesavananda Bharati (1973)."}},
    {name:"In re Berubari Union", air:"AIR 1960 SC 845", scc:"(1960) 3 SCR 250", year:1960, bench:"8-judge", trig:["berubari"],
      treatment:{status:"doubted", note:"Its view that the Preamble is not part of the Constitution was disapproved in Kesavananda Bharati (1973)."}},
    {name:"Waman Rao v. Union of India", air:"AIR 1981 SC 271", scc:"(1981) 2 SCC 362", year:1981, bench:"5-judge", trig:["waman rao"]},
    {name:"State of West Bengal v. Anwar Ali Sarkar", air:"AIR 1952 SC 75", scc:"1952 SCR 284", year:1952, bench:"7-judge", trig:["anwar ali sarkar","anwar ali"]},
    {name:"E.P. Royappa v. State of Tamil Nadu", air:"AIR 1974 SC 555", scc:"(1974) 4 SCC 3", year:1974, bench:"5-judge", trig:["royappa"]},
    {name:"Ajay Hasia v. Khalid Mujib Sehravardi", air:"AIR 1981 SC 487", scc:"(1981) 1 SCC 722", year:1981, bench:"5-judge", trig:["ajay hasia","khalid mujib"]},
    {name:"Mohini Jain v. State of Karnataka", air:"AIR 1992 SC 1858", scc:"(1992) 3 SCC 666", year:1992, bench:"2-judge", trig:["mohini jain"],
      treatment:{status:"partly", note:"Its broad holding was limited by Unni Krishnan (1993)."}},
    {name:"Unni Krishnan v. State of A.P.", air:"AIR 1993 SC 2178", scc:"(1993) 1 SCC 645", year:1993, bench:"5-judge", trig:["unni krishnan","unnikrishnan"],
      treatment:{status:"partly", note:"The scheme it laid down was overruled by T.M.A. Pai Foundation (2002)."}},
    {name:"Hussainara Khatoon v. State of Bihar", air:"AIR 1979 SC 1369", scc:"(1980) 1 SCC 98", year:1979, bench:"2-judge", trig:["hussainara khatoon","hussainara"]},
    {name:"Sunil Batra v. Delhi Administration", air:"AIR 1978 SC 1675", scc:"(1978) 4 SCC 494", year:1978, bench:"5-judge", trig:["sunil batra"]},
    {name:"Francis Coralie Mullin v. UT of Delhi", air:"AIR 1981 SC 746", scc:"(1981) 1 SCC 608", year:1981, bench:"2-judge", trig:["francis coralie","coralie mullin"]},
    {name:"NALSA v. Union of India", air:"AIR 2014 SC 1863", scc:"(2014) 5 SCC 438", year:2014, bench:"2-judge", trig:["nalsa","national legal services authority"]},
    {name:"A.K. Kraipak v. Union of India", air:"AIR 1970 SC 150", scc:"(1969) 2 SCC 262", year:1969, bench:"5-judge", trig:["kraipak"]},

    // ---- Criminal ----
    {name:"K.M. Nanavati v. State of Maharashtra", air:"AIR 1962 SC 605", scc:"(1962) Supp 1 SCR 567", year:1962, bench:"3-judge", trig:["nanavati"]},
    {name:"Virsa Singh v. State of Punjab", air:"AIR 1958 SC 465", scc:"1958 SCR 1495", year:1958, bench:"3-judge", trig:["virsa singh"]},
    {name:"Machhi Singh v. State of Punjab", air:"AIR 1983 SC 957", scc:"(1983) 3 SCC 470", year:1983, bench:"3-judge", trig:["machhi singh"]},
    {name:"Nandini Satpathy v. P.L. Dani", air:"AIR 1978 SC 1025", scc:"(1978) 2 SCC 424", year:1978, bench:"3-judge", trig:["nandini satpathy"]},
    {name:"Selvi v. State of Karnataka", air:"AIR 2010 SC 1974", scc:"(2010) 7 SCC 263", year:2010, bench:"3-judge", trig:["selvi v","narco-analysis","narcoanalysis"]},
    {name:"Tukaram v. State of Maharashtra (Mathura)", air:"AIR 1979 SC 185", scc:"(1979) 2 SCC 143", year:1979, bench:"3-judge", trig:["tukaram v","mathura case","mathura rape"],
      treatment:{status:"partly", note:"Its core holding was effectively nullified by the Criminal Law (Amendment) Act 1983 (Section 114A, Evidence Act)."}},

    // ---- Company / IPR / commercial ----
    {name:"Eastern Book Company v. D.B. Modak", air:"AIR 2008 SC 809", scc:"(2008) 1 SCC 1", year:2008, bench:"2-judge", trig:["eastern book company","d.b. modak","db modak"]},
    {name:"R.G. Anand v. Delux Films", air:"AIR 1978 SC 1613", scc:"(1978) 4 SCC 118", year:1978, bench:"3-judge", trig:["r.g. anand","rg anand","delux films"]},
    {name:"Novartis AG v. Union of India", air:"AIR 2013 SC 1311", scc:"(2013) 6 SCC 1", year:2013, bench:"2-judge", trig:["novartis"]},
    {name:"LIC v. Escorts Ltd.", air:"AIR 1986 SC 1370", scc:"(1986) 1 SCC 264", year:1986, bench:"5-judge", trig:["escorts ltd","lic v. escorts"]},
    {name:"Bennett Coleman & Co. v. Union of India", air:"AIR 1973 SC 106", scc:"(1972) 2 SCC 788", year:1972, bench:"5-judge", trig:["bennett coleman"]},
  ];
})(typeof window !== "undefined" ? window : globalThis);
