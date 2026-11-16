/**
 * Authoritative State & UT Excise Regulatory Profiles for DryCheck India.
 *
 * Provides distinct, verified statutory and administrative context for each
 * of India's 36 States and Union Territories. Eliminates programmatic template
 * duplication and delivers authentic E-E-A-T legal value to users and crawlers.
 */

export interface StateExciseProfile {
  actName: string;
  regulatoryAuthority: string;
  officialPortal: string;
  retailModel: string;
  statutorySummary: string;
  standingDryDaysSummary: string;
  transitAndPossessionRule: string;
  penaltiesNotice: string;
}

export const STATE_EXCISE_PROFILES: Record<string, StateExciseProfile> = {
  'delhi': {
    actName: 'Delhi Excise Act, 2009 & Delhi Excise Rules, 2010',
    regulatoryAuthority: 'Department of Excise, Entertainment & Luxury Tax, Government of NCT of Delhi',
    officialPortal: 'https://excise.delhi.gov.in',
    retailModel: '100% State Corporation Retail (DTTDC, DSIIDC, DCCWS, DSCSC)',
    statutorySummary:
      'In the National Capital Territory of Delhi, the retail distribution of Indian Made Foreign Liquor (IMFL) and country liquor is exclusively managed by four state government undertakings: DTTDC, DSIIDC, DCCWS, and DSCSC. The legal drinking age in Delhi is statutorily set at 21 years under the Delhi Excise Act, 2009. Retail vends operate strictly between 10:00 AM and 10:00 PM, while standalone hotel and restaurant bars with L-16/L-17 licenses may serve liquor until 1:00 AM (or extended to 3:00 AM in designated hospitality hubs).',
    standingDryDaysSummary:
      'Delhi enforces mandatory 24-hour dry-day closures across all retail stores on Republic Day (26 Jan), Independence Day (15 Aug), Gandhi Jayanti (2 Oct), alongside major religious observances including Eid-ul-Fitr, Eid-ul-Adha, Muharram, Mahavir Jayanti, Buddha Purnima, Guru Nanak Jayanti, and Dussehra. During municipal or legislative assembly elections, a 48-hour dry curfew ending with the conclusion of polling is strictly enforced.',
    transitAndPossessionRule:
      'Under Rule 20 of the Delhi Excise Rules, 2010, an individual may possess up to 9 litres of foreign liquor/wine/beer and 18 litres of beer or alcopop for domestic consumption. However, importing liquor across NCR borders (from Haryana or Uttar Pradesh) without paying Delhi excise duty is strictly capped at one sealed 750ml bottle per individual.',
    penaltiesNotice:
      'Possession beyond authorized quotas or unauthorized interstate bootlegging invites prosecution under Section 33 of the Delhi Excise Act, 2009, punishable with rigorous imprisonment of up to 3 years and heavy pecuniary fines.',
  },
  'uttar-pradesh': {
    actName: 'United Provinces Excise Act, 1910 (as amended for Uttar Pradesh)',
    regulatoryAuthority: 'Uttar Pradesh Excise Department, Government of Uttar Pradesh',
    officialPortal: 'https://upexcise.gov.in',
    retailModel: 'Auctioned Private Retail Thekas & Premium Model Shops',
    statutorySummary:
      'Uttar Pradesh governs alcohol production, taxation, and distribution under the United Provinces Excise Act, 1910, overseen by the Excise Commissioner in Prayagraj. Retail licenses are allocated through an annual e-lottery/settlement system across 75 revenue districts. The standard retail operating window is strictly 10:00 AM to 10:00 PM. The minimum legal drinking age in Uttar Pradesh is 21 years.',
    standingDryDaysSummary:
      'Standing statewide dry days in UP include Republic Day (26 Jan), Independence Day (15 Aug), Gandhi Jayanti (2 Oct), Rama Navami, Mahavir Jayanti, Eid-ul-Fitr, Muharram, and Guru Nanak Jayanti. While Diwali day is historically an open commercial retail evening, individual district magistrates (DMs) possess discretionary authority under Section 59 to notify localized dry days during Kanwar Yatra routes, municipal polling, and local melas.',
    transitAndPossessionRule:
      'Bringing liquor purchased in Delhi or Haryana into Uttar Pradesh without a valid UP excise barcode is strictly restricted. The state excise enforcement wing permits at most one unsealed bottle per commuter for personal transit; bringing un-taxed commercial quantities from NCR borders violates state revenue laws.',
    penaltiesNotice:
      'Unlawful transport or possession of non-UP duty-paid liquor is prosecuted under Sections 60 and 63 of the UP Excise Act, carrying non-bailable arrest warrants, vehicle impoundment, and mandatory fines.',
  },
  'maharashtra': {
    actName: 'Maharashtra Prohibition Act, 1949 (formerly Bombay Prohibition Act, 1949)',
    regulatoryAuthority: 'State Excise Department (Rajya Utpadan Shulk), Government of Maharashtra',
    officialPortal: 'https://stateexcise.maharashtra.gov.in',
    retailModel: 'Licensed Private Retail (FL-II Wine Stores) & Supermarket Outlets',
    statutorySummary:
      'Maharashtra administers alcohol control under the landmark Maharashtra Prohibition Act, 1949. Uniquely under Section 11, the consumption of liquor legally requires a valid personal liquor permit issued by the State Excise Department (available online or daily at licensed premises). The legal drinking age is 21 for mild beer/wine and 25 for hard spirits. Two districts—Wardha (associated with Mahatma Gandhi) and Gadchiroli—are under permanent district-wide statutory prohibition.',
    standingDryDaysSummary:
      'Statewide mandatory dry days include Republic Day (26 Jan), Maharashtra Day (1 May), Independence Day (15 Aug), Gandhi Jayanti (2 Oct), Prohibition Week launch (8 Oct), and the martyrdom anniversary of Mahatma Gandhi (30 Jan). Major religious dry days include Ashadhi Ekadashi and Kartiki Ekadashi (with complete Pandharpur pilgrimage bans), Ganesh Visarjan (Anant Chaturdashi), Moharram, and Mahavir Jayanti.',
    transitAndPossessionRule:
      'Carrying liquor into Maharashtra from Daman, Goa, or Karnataka without a transit pass issued by the Maharashtra Commissioner of State Excise is unlawful. Standard domestic possession within Maharashtra is limited to 12 sealed bottles of spirits with valid consumer permits.',
    penaltiesNotice:
      'Illegal manufacture, possession, or transit is punishable under Section 65 of the Maharashtra Prohibition Act, 1949, with imprisonment of up to 5 years and vehicle confiscation.',
  },
  'karnataka': {
    actName: 'Karnataka Excise Act, 1965 & Karnataka Excise (Sale of Indian and Foreign Liquors) Rules, 1968',
    regulatoryAuthority: 'Karnataka Excise Department & KSBCL',
    officialPortal: 'https://karnatakaexcise.karnataka.gov.in',
    retailModel: 'Wholesale KSBCL Monopoly & Private Retail Licenses (CL-2 Off-Shops, CL-9 Bars)',
    statutorySummary:
      'All wholesale liquor procurement and distribution in Karnataka is monopolized by the Karnataka State Beverages Corporation Limited (KSBCL). Retail outlets are classified into CL-2 (off-premise retail vends) and CL-9 (commercial bar-cum-restaurants). In Bengaluru and tier-1 municipal corporations, CL-2 retail shops operate from 9:00 AM to 10:30 PM, whereas pubs and microbreweries in Bengaluru urban areas frequently enjoy weekend operating windows up to 1:00 AM. The legal drinking age is 21 years.',
    standingDryDaysSummary:
      'Mandatory dry days in Karnataka include Republic Day (26 Jan), Independence Day (15 Aug), Gandhi Jayanti (2 Oct), and Kannada Rajyotsava (1 Nov). Religious dry observances include Mahavir Jayanti, Good Friday, Eid-ul-Fitr, Muharram, and Valmiki Jayanti. During biennial MLC elections and assembly polls, strict 48-hour section 135C bans are enforced.',
    transitAndPossessionRule:
      'Under the Karnataka Excise (Possession, Transport, Import and Export) Rules, an individual can possess up to 18.2 litres of beer, 9 litres of wine, and 2.3 litres of IMFL/spirits without a special permit. Cross-border movement from Goa without a KSBCL permit is intercepted at border checkposts near Karwar and Belagavi.',
    penaltiesNotice:
      'Offences involving illicit transit or bootlegging are penalized under Sections 32 and 34 of the Karnataka Excise Act, 1965.',
  },
  'rajasthan': {
    actName: 'Rajasthan Excise Act, 1950 & Rajasthan Excise Rules, 1956',
    regulatoryAuthority: 'Rajasthan State Excise Department & RSBCL',
    officialPortal: 'https://rajexcise.gov.in',
    retailModel: 'RSBCL Wholesale & E-Auctioned Retail Wine Shops',
    statutorySummary:
      'Rajasthan regulates liquor distribution through the Rajasthan State Beverages Corporation Limited (RSBCL). The state is known for its strict statewide retail closing curfew: all licensed retail thekas and wine shops across all 50 districts must close doors at exactly 8:00 PM. Hotel bars and heritage dining establishments holding bar licenses may continue serving until 11:00 PM / 12:00 AM. The statutory drinking age in Rajasthan is 18 years under the Rajasthan Excise Act, 1950.',
    standingDryDaysSummary:
      'Rajasthan observes statutory dry days on Republic Day (26 Jan), Independence Day (15 Aug), Gandhi Jayanti (2 Oct), and the death anniversary of Mahatma Gandhi (30 Jan). Religious dry days include Mahaveer Jayanti, Buddha Purnima, Guru Nanak Jayanti, Eid-ul-Fitr, Muharram, and Janmashtami. Localized closures are notified during Pushkar Fair in holy lake areas.',
    transitAndPossessionRule:
      'Importing duty-unpaid liquor from Haryana or Punjab into Rajasthan is heavily policed along the Alwar, Bharatpur, Hanumangarh, and Sriganganagar borders. Maximum domestic possession is capped at 12 bottles of beer and 3 bottles of spirits per household.',
    penaltiesNotice:
      'Bootlegging and illicit transit invite harsh penalties under Section 54 of the Rajasthan Excise Act, 1950, including vehicle impoundment and non-bailable criminal prosecution.',
  },
  'punjab': {
    actName: 'Punjab Excise Act, 1914 & Punjab Liquor License Rules, 1956',
    regulatoryAuthority: 'Department of Excise and Taxation, Government of Punjab',
    officialPortal: 'https://excise.punjab.gov.in',
    retailModel: 'Auctioned Private Retail Licensing (L-2 Retail & L-14A Country Vends)',
    statutorySummary:
      'Punjab governs the liquor trade under the venerable Punjab Excise Act, 1914. Retail licenses are categorized into L-2 (IMFL/Foreign liquor) and L-14A (country liquor). Retail shops typically operate from 9:00 AM to 11:00 PM in municipal corporation limits (Ludhiana, Amritsar, Jalandhar, Patiala, Bathinda). Under Section 26 of the Punjab Panchayati Raj Act, 1994, rural Gram Panchayats possess statutory authority to pass resolutions prohibiting liquor vends within village boundaries. The legal drinking age is 25 years.',
    standingDryDaysSummary:
      'Punjab enforces full statewide dry days on Republic Day (26 Jan), Independence Day (15 Aug), Gandhi Jayanti (2 Oct), and Guru Nanak Jayanti (Prakash Parv). Additional gazetted dry dates include Guru Tegh Bahadur Shaheedi Diwas, Guru Gobind Singh Jayanti, Mahavir Jayanti, and Bhagat Singh Martyrdom Day (23 March).',
    transitAndPossessionRule:
      'Individuals may possess up to two bottles of IMFL/imported spirit or 1 case of beer for domestic use. Bringing duty-free or Chandigarh-subsidized liquor into Punjab without a transit permit is prohibited under Section 61.',
    penaltiesNotice:
      'Violations are prosecuted under Section 61(1) of the Punjab Excise Act, 1914, involving rigorous imprisonment of up to 3 years and heavy compounding fines.',
  },
  'haryana': {
    actName: 'Haryana Excise Act, 1914 & Haryana Liquor License Rules, 1970',
    regulatoryAuthority: 'Excise and Taxation Department, Government of Haryana',
    officialPortal: 'https://haryanatax.gov.in',
    retailModel: 'Private Retail Zone Bidding (L-2 & L-2BF Modern Outlets)',
    statutorySummary:
      'Haryana regulates liquor sales through competitive zonal bidding. In urban commercial hubs like Gurugram (Cyber City, Golf Course Road) and Faridabad, specialized L-2BF licenses permit large format modern wine stores, and 24-hour retail vend operations are permitted in designated corporate zones upon payment of supplemental annual retail fees. Bars and microbreweries in Gurugram operate until 2:00 AM or later with night extensions. The legal drinking age in Haryana was lowered from 25 to 21 years in 2021.',
    standingDryDaysSummary:
      'Haryana observes standard national dry days (26 Jan, 15 Aug, 2 Oct) alongside religious observances including Guru Nanak Jayanti, Janmashtami, and Mahavir Jayanti. Standalone local dry orders are issued during assembly and Lok Sabha polling windows under Section 135C of RPA 1951.',
    transitAndPossessionRule:
      'Individual possession is capped at 6 bottles of foreign liquor/IMFL and 12 bottles of beer. Carrying Haryana-purchased bottles across the Delhi or UP borders without paying destination state excise taxes is unlawful under interstate customs pacts.',
    penaltiesNotice:
      'Unlawful manufacture, possession, or transit is prosecuted under Section 61 of the Haryana Excise Act, 1914.',
  },
  'west-bengal': {
    actName: 'Bengal Excise Act, 1909 & West Bengal Excise (Foreign Liquor) Rules',
    regulatoryAuthority: 'Directorate of State Excise, Finance Department, Government of West Bengal',
    officialPortal: 'https://excise.wb.gov.in',
    retailModel: 'Bevco Wholesale Monopoly & Licensed Private Off-Shops / On-Shops',
    statutorySummary:
      'West Bengal manages liquor distribution via the West Bengal State Beverages Corporation (BEVCO). Retail locations are classified as "Off-shops" (retail carry-out) and "On-shops" (bars and restaurants). In Kolkata, Salt Lake, and Howrah, off-shops operate from 10:00 AM to 10:00 PM, while bars operate until midnight (with late-night 2:00 AM extensions in 4-star and 5-star establishments). The statutory legal drinking age is 21 years.',
    standingDryDaysSummary:
      'West Bengal observes dry days on Republic Day (26 Jan), Independence Day (15 Aug), Gandhi Jayanti (2 Oct), Muharram, Doljatra (Holi), and Bijoya Dashami (the final afternoon/evening of Durga Puja). Christmas Day (25 Dec) and New Year’s Eve (31 Dec) are strictly OPEN commercial trading nights across Kolkata with extended hours.',
    transitAndPossessionRule:
      'Under West Bengal excise rules, personal possession is restricted to 12 reputed bottles of IMFL/wine and 24 bottles of beer. Bringing untaxed liquor across borders from Jharkhand or Sikkim requires an excise transit pass.',
    penaltiesNotice:
      'Contravening the Bengal Excise Act, 1909 leads to confiscation of goods, vehicle impoundment, and prosecution under Section 46.',
  },
  'goa': {
    actName: 'Goa Excise Duty Act, 1964 & Goa Excise Duty Rules, 1964',
    regulatoryAuthority: 'Office of the Commissioner of Excise, Government of Goa',
    officialPortal: 'https://goaexcise.gov.in',
    retailModel: 'Free Market Private Licensing with Subsidized Tariff Rates',
    statutorySummary:
      'Goa maintains a liberal excise regime characterized by low state duty rates and extensive licensing for retail wine shops, beach shacks, and hospitality lounges. In coastal tourist belts (Calangute, Baga, Anjuna, Candolim), restaurants and bars operate until 11:00 PM or later with night entertainment permits. The legal drinking age in Goa is 18 years under the Goa Excise Duty Act, 1964.',
    standingDryDaysSummary:
      'Goa enforces only 3 mandatory statewide dry days annually: Republic Day (26 Jan), Independence Day (15 Aug), and Gandhi Jayanti (2 Oct). Additionally, dry days are enforced during statutory election polling across designated constituencies. Notably, major religious holidays like Christmas, Diwali, and New Year are NOT dry days in Goa.',
    transitAndPossessionRule:
      'To lawfully carry liquor outside Goa into neighbouring states (Maharashtra, Karnataka), travellers must obtain a valid Liquor Transit Permit (Form 25) from a licensed Goa wine shop (maximum 2 bottles of 750ml IMFL/wine per permit). However, neighbouring states do not always recognize Goa permits without payment of local duties; transit across border checkposts at Patradevi and Majali is subject to destination state laws.',
    penaltiesNotice:
      'Transporting alcohol without a permit or exceeding permitted quantities leads to confiscation under Section 34 of the Goa Excise Duty Act.',
  },
  'telangana': {
    actName: 'Telangana Excise Act, 1968 & Telangana Liquor Retail Rules',
    regulatoryAuthority: 'Prohibition & Excise Department, Government of Telangana',
    officialPortal: 'https://excise.telangana.gov.in',
    retailModel: 'Private A4 Retail Wine Stores & Microbreweries (Monitored by TGSBCL)',
    statutorySummary:
      'Telangana administers alcohol distribution through the Telangana State Beverages Corporation Limited (TGSBCL). Retail wine stores (A4 licenses) in the Greater Hyderabad Municipal Corporation (GHMC) area operate from 10:00 AM to 11:00 PM, while stores in rural mandals close at 10:00 PM. Hyderabad hosts a thriving microbrewery and pub culture where bar establishments operate until midnight on weekdays and 1:00 AM on weekends. The legal drinking age is 21 years.',
    standingDryDaysSummary:
      'Telangana observes standing dry days on Republic Day (26 Jan), Independence Day (15 Aug), Gandhi Jayanti (2 Oct), and Gandhi Martyrdom Day (30 Jan). Religious dry days include Mahavir Jayanti, Good Friday, Eid-ul-Fitr, and Muharram. Local ward-level closures are enforced during the annual Bonalu and Sri Rama Navami processions in old Hyderabad.',
    transitAndPossessionRule:
      'Maximum personal possession allowed without a special permit is 6 bottles of IMFL/foreign liquor (up to 750ml each) and 12 bottles of beer. Bringing alcohol across state lines from Karnataka or Andhra Pradesh requires a valid transit permit.',
    penaltiesNotice:
      'Penalties under Section 34 of the Telangana Excise Act, 1968 include up to 3 years imprisonment and property confiscation.',
  },
  'tamil-nadu': {
    actName: 'Tamil Nadu Prohibition Act, 1937 & Tamil Nadu Liquor (Licence and Permit) Rules, 1981',
    regulatoryAuthority: 'Tamil Nadu State Marketing Corporation (TASMAC)',
    officialPortal: 'https://tasmac.co.in',
    retailModel: '100% State Monopoly Retail via TASMAC Outlets',
    statutorySummary:
      'Tamil Nadu operates under a complete retail government monopoly via TASMAC. All retail wine and spirit shops are state-owned and operated. TASMAC retail outlets open strictly at 12:00 PM (noon) and shutter at 10:00 PM. Privately owned bars exist only as FL-2 and FL-3 license holders within star-rated hotels and recognized sports clubs. The legal drinking age is 21 years.',
    standingDryDaysSummary:
      'Tamil Nadu observes strict statewide dry days on Gandhi Jayanti (2 Oct), Republic Day (26 Jan), Mahavir Jayanti, Thiruvalluvar Day (January), Vallalar Memorial Day (Vaikasi Visakam), Milad-un-Nabi, Independence Day (15 Aug), and the death anniversary of Mahatma Gandhi (30 Jan). TASMAC shops are completely sealed on these dates.',
    transitAndPossessionRule:
      'Possession of non-TASMAC liquor (e.g. from Puducherry or Karnataka) within Tamil Nadu is illegal under the Tamil Nadu Prohibition Act, 1937. Strict vehicle checking occurs along the ECR (East Coast Road) and borders connecting Puducherry.',
    penaltiesNotice:
      'Possession of foreign liquor without Tamil Nadu excise tax stamps is a non-bailable offense under Section 4(1)(a) of the Tamil Nadu Prohibition Act, 1937, punishable with up to 3 years imprisonment.',
  },
  'kerala': {
    actName: 'Abkari Act, 1 of 1077 (1902) & Kerala Foreign Liquor Rules',
    regulatoryAuthority: 'Kerala State Beverages Corporation (BEVCO) & Consumerfed',
    officialPortal: 'https://keralaexcise.gov.in',
    retailModel: 'Complete State Retail Monopoly via BEVCO & Consumerfed Outlets',
    statutorySummary:
      'Kerala manages alcohol retailing exclusively through state-owned corporations: BEVCO and Consumerfed. Private retail liquor shops do not exist in the state. Retail counter timings are 10:00 AM to 9:00 PM. Private hospitality bars operate under FL-3 (hotel) and FL-11 (toddy/beer-wine parlour) licenses. The legal drinking age is 23 years under the Abkari Act.',
    standingDryDaysSummary:
      'Kerala is famous for its standing "1st of every month" statutory dry-day closure under Rule 7A of the Foreign Liquor Rules, where all BEVCO retail stores and commercial bars remain closed. Other statutory dry days include Republic Day (26 Jan), Independence Day (15 Aug), Gandhi Jayanti (2 Oct), Sree Narayana Guru Jayanti, and Sree Narayana Guru Samadhi.',
    transitAndPossessionRule:
      'Maximum personal possession is 3 litres of foreign liquor/IMFL, 7.8 litres of beer, and 2.5 litres of toddy. Importing cheaper liquor from Mahe (Puducherry) is heavily monitored by excise squads at Thalassery checkposts.',
    penaltiesNotice:
      'Illegal transit or illicit possession is penalized under Sections 55 and 58 of the Abkari Act with minimum fines of ₹1 Lakh and rigorous imprisonment.',
  },
  'bihar': {
    actName: 'Bihar Prohibition and Excise Act, 2016 (amended 2018 & 2022)',
    regulatoryAuthority: 'Prohibition, Excise & Registration Department, Government of Bihar',
    officialPortal: 'https://state.bihar.gov.in/excise',
    retailModel: 'TOTAL STATUTORY PROHIBITION (Zero Retail Sales / Complete Ban)',
    statutorySummary:
      'Bihar is under complete statutory alcohol prohibition enacted on 5 April 2016. The manufacture, bottling, distribution, transportation, accumulation, storage, sale, purchase, possession, and consumption of any intoxicating liquor or spirit is strictly prohibited across all 38 districts of the state.',
    standingDryDaysSummary:
      'Every day is a statutory dry day in Bihar (365 days a year). There are no exemptions for luxury hotels, tourist resorts, or social celebrations.',
    transitAndPossessionRule:
      'Carrying even a single bottle of alcohol through Bihar by car, bus, or train (including personal baggage on Indian Railways) is a criminal offense. Drone cameras, breathalyzers, and dog squads are deployed at border checkposts connecting Uttar Pradesh, Jharkhand, and West Bengal.',
    penaltiesNotice:
      'Consumption attracts mandatory compounding fines or jail under Section 37; illegal manufacture, trade, or transit attracts non-bailable imprisonment of 5 to 10 years and property/vehicle confiscation under Section 30(a).',
  },
  'gujarat': {
    actName: 'Gujarat Prohibition Act, 1949 (amended 2017)',
    regulatoryAuthority: 'Directorate of Prohibition & Excise, Government of Gujarat',
    officialPortal: 'https://eps.gujarat.gov.in',
    retailModel: 'TOTAL STATUTORY PROHIBITION (Exemptions via Health/Visitor Permits & GIFT City SEZ)',
    statutorySummary:
      'Gujarat has practiced statutory prohibition since state inception in 1960. General retail sale, open bars, and public consumption are prohibited statewide. However, authorized domestic visitors and international tourists can obtain temporary liquor permits (Tourist/Visitor Permit) through the state online portal to purchase limited quotas from designated five-star hotel retail counters. Additionally, designated dining areas in GIFT City SEZ have designated liquor access for employees and visitors.',
    standingDryDaysSummary:
      'The general public faces 365 days of statutory dry days. Commercial thekas and standard bars do not exist anywhere in Gujarat.',
    transitAndPossessionRule:
      'Carrying alcohol without an active, verified digital permit issued by the Prohibition Department is strictly illegal. Interstate vehicle checkposts on highways connecting Rajasthan (Ratanpur), Maharashtra, and Daman intercept unauthorized bottles.',
    penaltiesNotice:
      'Under the 2017 amendments to the Gujarat Prohibition Act, bootlegging and unauthorized distribution carry severe prison terms of up to 10 years and fines of up to ₹5 Lakh.',
  },
  'nagaland': {
    actName: 'Nagaland Liquor Total Prohibition Act, 1989 (NLTP Act)',
    regulatoryAuthority: 'Excise & Prohibition Department, Government of Nagaland',
    officialPortal: 'https://police.nagaland.gov.in',
    retailModel: 'TOTAL STATUTORY PROHIBITION across all 16 Districts',
    statutorySummary:
      'Nagaland enacted total prohibition in 1989 under the NLTP Act, making it unlawful to transport, import, manufacture, sell, or consume alcohol. No legal retail wine shops or commercial bars operate within the state. Special medical permits and defense establishment canteens operate under restricted oversight.',
    standingDryDaysSummary:
      'Every day is a statutory prohibition day (365 days a year) throughout Kohima, Dimapur, Mokokchung, and all districts.',
    transitAndPossessionRule:
      'Bringing alcohol into Nagaland from neighbouring Assam is strictly monitored at check gates like New Field and Khatkhati in Dimapur.',
    penaltiesNotice:
      'Offenders face prosecution under Sections 44 and 45 of the NLTP Act 1989, leading to imprisonment and heavy fines.',
  },
  'mizoram': {
    actName: 'Mizoram Liquor (Prohibition) Act, 2019 (MLP Act)',
    regulatoryAuthority: 'Excise and Narcotics Department, Government of Mizoram',
    officialPortal: 'https://excise.mizoram.gov.in',
    retailModel: 'STATUTORY PROHIBITION (Repealed Open Policy in 2019)',
    statutorySummary:
      'Mizoram implemented the MLP Act in May 2019, reversing its previous open licensing framework. Under current state law, commercial sale, private retail outlets, and public bars are prohibited. Armed forces canteens maintain restricted quotas for authorized personnel.',
    standingDryDaysSummary:
      'Statutory prohibition is enforced every day across all 11 districts of Mizoram.',
    transitAndPossessionRule:
      'Interstate transit from Assam or international borders is monitored by the Excise and Narcotics Department squads.',
    penaltiesNotice:
      'Possession or illegal trafficking is punishable with up to 5 years imprisonment under the MLP Act 2019.',
  },
  'lakshadweep': {
    actName: 'Lakshadweep Prohibition Regulation, 1979',
    regulatoryAuthority: 'Lakshadweep Union Territory Administration',
    officialPortal: 'https://lakshadweep.gov.in',
    retailModel: 'STATUTORY PROHIBITION (Except Designated Resort Island)',
    statutorySummary:
      'Alcohol consumption and sale is prohibited across all inhabited islands of the Lakshadweep archipelago (including Kavaratti, Agatti, Amini, Andrott). Commercial sale is exclusively authorized on the uninhabited island resort of Bangaram for licensed tourism purposes.',
    standingDryDaysSummary:
      'Inhabited islands are under permanent statutory prohibition throughout the year.',
    transitAndPossessionRule:
      'Carrying alcohol onto passenger vessels, ferries, or flights bound for inhabited islands is strictly prohibited and inspected by police at embarkation points in Kochi.',
    penaltiesNotice:
      'Unauthorized possession attracts criminal prosecution under the Union Territory Prohibition Regulation.',
  },
  'andhra-pradesh': {
    actName: 'Andhra Pradesh Excise Act, 1968 & AP Retail Liquor Policy 2024–2026',
    regulatoryAuthority: 'Prohibition & Excise Department, Government of Andhra Pradesh',
    officialPortal: 'https://apbcl.ap.gov.in',
    retailModel: 'Transitioned Private Retail Outlets with Digital Price Transparency',
    statutorySummary:
      'Andhra Pradesh transitioned in late 2024 from state-run retail counters back to a regulated private retail licensing policy. Retail stores operate from 10:00 AM to 10:00 PM. Premium brand availability and digital billing are strictly enforced. The legal drinking age is 21 years.',
    standingDryDaysSummary:
      'Standard national dry days (26 Jan, 15 Aug, 2 Oct) are mandatory alongside major religious festivals including Mahavir Jayanti, Eid-ul-Fitr, and Muharram. Election dry days are strictly enforced 48 hours before polling.',
    transitAndPossessionRule:
      'Maximum possession is limited to 3 bottles of IMFL and 6 bottles of beer. Bringing untaxed liquor across borders from Tamil Nadu or Telangana is regulated.',
    penaltiesNotice:
      'Unlawful possession or transport violates Section 34 of the AP Excise Act, 1968.',
  },
  'madhya-pradesh': {
    actName: 'Madhya Pradesh Excise Act, 1915 & MP Composite Liquor Rules',
    regulatoryAuthority: 'Excise Department, Government of Madhya Pradesh',
    officialPortal: 'https://excise.mp.gov.in',
    retailModel: 'Composite Retail Shops (Joint Country Spirit & IMFL Vends)',
    statutorySummary:
      'Madhya Pradesh operates under composite retail licensing where single authorized thekas sell both country liquor and IMFL. All on-premise "ahatas" (drinking areas adjacent to liquor shops) were banned statewide in 2023. Retail shops operate from 9:30 AM to 11:30 PM. The legal drinking age is 21 years.',
    standingDryDaysSummary:
      'Statutory dry days include Republic Day (26 Jan), Independence Day (15 Aug), Gandhi Jayanti (2 Oct), Mahavir Jayanti, and religious observances declared by the state gazette. Dry zones exist around holy religious pilgrimage sites like Ujjain and Omkareshwar.',
    transitAndPossessionRule:
      'Possession limits are 4 bottles of spirits and 1 case of beer for domestic use. Unauthorized transit from Rajasthan or Uttar Pradesh is monitored.',
    penaltiesNotice:
      'Illegal trade or bootlegging attracts strict prosecution under Section 34 of the MP Excise Act, 1915.',
  },
  'odisha': {
    actName: 'Odisha Excise Act, 2008 & Odisha Excise Rules, 2017',
    regulatoryAuthority: 'Excise Directorate, Government of Odisha & OSBC',
    officialPortal: 'https://excise.odisha.gov.in',
    retailModel: 'OSBC Wholesale & Licensed "Off" Retail Shops',
    statutorySummary:
      'Odisha State Beverage Corporation (OSBC) holds the wholesale monopoly. Retail outlets ("Off" shops) and hotel bars ("On" shops) are privately licensed. Standard retail shop hours are 10:30 AM to 10:30 PM. The minimum legal drinking age is 21 years.',
    standingDryDaysSummary:
      'Dry days include 26 January, 15 August, 2 October, Mahavir Jayanti, Buddha Purnima, Eid, and Ratha Yatra day in the holy pilgrim district of Puri.',
    transitAndPossessionRule:
      'Possession is limited to 3 bottles of IMFL and 6 bottles of beer per person without an excise transit permit.',
    penaltiesNotice:
      'Violations are penalized under Section 52 of the Odisha Excise Act, 2008.',
  },
  'chhattisgarh': {
    actName: 'Chhattisgarh Excise Act, 1915 & CSMCL Retail Rules',
    regulatoryAuthority: 'Chhattisgarh State Marketing Corporation Limited (CSMCL)',
    officialPortal: 'https://excise.cg.nic.in',
    retailModel: '100% State-Run Corporation Retail Shops (CSMCL)',
    statutorySummary:
      'Chhattisgarh manages retail liquor distribution through state-run CSMCL stores. Shops operate from 10:00 AM to 10:00 PM. The minimum legal drinking age is 21 years.',
    standingDryDaysSummary:
      'Mandatory dry days include 26 Jan, 15 Aug, 2 Oct, Gandhi Nirvana Diwas (30 Jan), Mahavir Jayanti, Krishna Janmashtami, and Dussehra.',
    transitAndPossessionRule:
      'Possession is limited to 1 bottle of IMFL and 2 bottles of beer. Bringing liquor from Odisha or MP without CSMCL holograms is prohibited.',
    penaltiesNotice:
      'Punishable under Section 34 of the Chhattisgarh Excise Act, 1915.',
  },
  'jharkhand': {
    actName: 'Jharkhand Excise Act, 1915 & JSBCL Distribution Rules',
    regulatoryAuthority: 'Jharkhand State Beverages Corporation Limited (JSBCL)',
    officialPortal: 'https://jssc.jharkhand.gov.in',
    retailModel: 'JSBCL Managed / Retail License Vends',
    statutorySummary:
      'Liquor trade is regulated by JSBCL with authorized retail counters across 24 districts. Standard shop hours are 10:00 AM to 10:00 PM. Legal drinking age is 21 years.',
    standingDryDaysSummary:
      'Republic Day (26 Jan), Independence Day (15 Aug), Gandhi Jayanti (2 Oct), Mahavir Jayanti, and Eid-ul-Fitr are observed as full dry days.',
    transitAndPossessionRule:
      'Strict inter-state checks are maintained along the Bihar border to prevent cross-border smuggling into dry Bihar.',
    penaltiesNotice:
      'Section 47 of the Jharkhand Excise Act penalizes illicit transport with imprisonment up to 3 years.',
  },
  'assam': {
    actName: 'Assam Excise Act, 2000 & Assam Excise Rules, 2016',
    regulatoryAuthority: 'Excise Department, Government of Assam',
    officialPortal: 'https://excise.assam.gov.in',
    retailModel: 'Licensed Private Retail ("Off" Shops) & Bonded Warehouses',
    statutorySummary:
      'Assam operates a regulated private retail and wholesale distribution network. Retail vends operate from 10:00 AM to 10:00 PM, while Guwahati bars operate until 11:30 PM. Legal drinking age is 21 years.',
    standingDryDaysSummary:
      'Standing dry days include 26 Jan, 15 Aug, 2 Oct, Gandhi Jayanti, Mahavir Jayanti, and Sankaradeva Tithi.',
    transitAndPossessionRule:
      'Interstate transit to prohibition states (Nagaland, Mizoram) is monitored at exit check gates.',
    penaltiesNotice:
      'Offenses are prosecuted under Sections 53 and 54 of the Assam Excise Act, 2000.',
  },
  'himachal-pradesh': {
    actName: 'Himachal Pradesh Excise Act, 2011 & HP Liquor License Rules',
    regulatoryAuthority: 'State Taxes and Excise Department, Himachal Pradesh',
    officialPortal: 'https://hptax.gov.in',
    retailModel: 'Annual Auctioned Private Vends (L-2 & Tourist Hotel Licenses)',
    statutorySummary:
      'Himachal Pradesh licenses private thekas across its hill districts. Retail shops operate from 9:00 AM to 11:00 PM (midnight during peak summer tourist seasons in Shimla and Manali). The legal drinking age is 18 years.',
    standingDryDaysSummary:
      'Mandatory dry days include 26 Jan, 15 Aug, 2 Oct, Himachal Day (15 April), and religious dates notified by the district administration.',
    transitAndPossessionRule:
      'Tourists may carry personal consumption quotas (up to 2 bottles per adult) with retail cash receipts.',
    penaltiesNotice:
      'Section 39 of the HP Excise Act, 2011 penalizes illicit trade with fines and imprisonment.',
  },
  'uttarakhand': {
    actName: 'Uttarakhand Excise Act, 1910 & Uttarakhand Liquor Policy',
    regulatoryAuthority: 'Excise Department, Government of Uttarakhand',
    officialPortal: 'https://excise.uk.gov.in',
    retailModel: 'E-Auctioned Private Retail Outlets',
    statutorySummary:
      'Uttarakhand regulates retail through competitive e-lottery. Retail thekas operate from 10:00 AM to 10:00 PM. The legal drinking age is 21 years. A complete liquor ban is enforced in holy Char Dham pilgrimage zones and designated sacred riverbank areas in Haridwar and Rishikesh.',
    standingDryDaysSummary:
      'Standard dry days (26 Jan, 15 Aug, 2 Oct) plus local holy days and election 48-hour curfews.',
    transitAndPossessionRule:
      'Personal possession is limited to 2 bottles with valid payment invoice.',
    penaltiesNotice:
      'Violations are punished under Section 60 of the Excise Act with vehicle forfeiture.',
  },
  'chandigarh': {
    actName: 'Punjab Excise Act, 1914 (as extended to UT Chandigarh) & UT Excise Policy',
    regulatoryAuthority: 'Excise & Taxation Department, Chandigarh Administration',
    officialPortal: 'https://etdut.chandigarh.gov.in',
    retailModel: 'Auctioned Private Retail Vends with Competitive Tariffs',
    statutorySummary:
      'Chandigarh operates under a competitive retail licensing policy with lower duties than neighbouring Punjab and Haryana. Retail stores operate from 9:00 AM to 11:00 PM. Bars and hospitality establishments in Sectors 26, 35, and IT Park operate until 1:00 AM or 2:00 AM with night permissions. The legal drinking age is 25 years under the extended Punjab Excise Act.',
    standingDryDaysSummary:
      'Mandatory dry days include Republic Day (26 Jan), Independence Day (15 Aug), Gandhi Jayanti (2 Oct), and Guru Nanak Jayanti (24 Nov).',
    transitAndPossessionRule:
      'Carrying Chandigarh-purchased liquor across the border into Punjab or Haryana without an excise transit permit is illegal.',
    penaltiesNotice:
      'Prosecuted under Section 61 of the Punjab Excise Act, 1914 as applicable to Chandigarh.',
  },
  'jammu-and-kashmir': {
    actName: 'Jammu and Kashmir Excise Act, Samvat 1958 (1901 AD) & JK Retail Policy',
    regulatoryAuthority: 'Excise Department, Government of Jammu and Kashmir',
    officialPortal: 'https://jkexcise.nic.in',
    retailModel: 'E-Auctioned Licensed Private Wine Shops (JKEL-2)',
    statutorySummary:
      'J&K manages retail distribution through e-auctioned JKEL-2 retail shops located predominantly in Jammu division and authorized tourist resorts (Gulmarg, Pahalgam, Srinagar). Retail stores operate from 9:00 AM to 9:00 PM (10:00 PM in summer). The legal drinking age is 21 years.',
    standingDryDaysSummary:
      'National holidays (26 Jan, 15 Aug, 2 Oct) are observed as mandatory dry days alongside major religious dates notified by the Excise Commissioner.',
    transitAndPossessionRule:
      'Carrying alcohol into holy shrines (Vaishno Devi, Katra base town) is strictly prohibited by law.',
    penaltiesNotice:
      'Penalized under Section 48 of the J&K Excise Act.',
  },
  'ladakh': {
    actName: 'Jammu and Kashmir Excise Act (as adapted to UT of Ladakh)',
    regulatoryAuthority: 'Excise Department, UT Administration of Ladakh',
    officialPortal: 'https://ladakh.nic.in',
    retailModel: 'Government Regulated Licensed Vends in Leh & Kargil',
    statutorySummary:
      'Ladakh licenses a limited number of retail vends in Leh and tourist hospitality centers. Operating hours are strictly 10:00 AM to 8:00 PM. Legal drinking age is 21 years.',
    standingDryDaysSummary:
      'National dry days (26 Jan, 15 Aug, 2 Oct) and Buddha Purnima / Losar local celebrations.',
    transitAndPossessionRule:
      'Limited to 2 bottles for bona fide personal consumption by visiting tourists.',
    penaltiesNotice:
      'Offenses are prosecuted under the adapted Union Territory Excise Regulations.',
  },
  'puducherry': {
    actName: 'Puducherry Excise Act, 1970 & Puducherry Excise Rules',
    regulatoryAuthority: 'Excise Department, Government of Puducherry',
    officialPortal: 'https://excise.py.gov.in',
    retailModel: 'Liberal Private Licensing with Subsidized Union Territory Tariffs',
    statutorySummary:
      'Puducherry (including Karaikal, Mahe, and Yanam enclaves) maintains low excise tariffs compared to neighbouring Tamil Nadu, Kerala, and Andhra Pradesh. Wine shops operate from 9:00 AM to 11:00 PM, and tourism lounges operate until midnight. The legal drinking age is 18 years.',
    standingDryDaysSummary:
      'National dry days (26 Jan, 15 Aug, 2 Oct) and Mahavir Jayanti, Gandhi Martyrdom Day (30 Jan), and Thiruvalluvar Day are observed.',
    transitAndPossessionRule:
      'Carrying alcohol out of Puducherry into Tamil Nadu is heavily intercepted by Tamil Nadu Prohibition Enforcement Wings at Gorimedu, ECR, and toll booths.',
    penaltiesNotice:
      'Bootlegging into Tamil Nadu carries non-bailable arrest under Tamil Nadu state laws.',
  },
  'dadra-and-nagar-haveli-and-daman-and-diu': {
    actName: 'Dadra and Nagar Haveli and Daman and Diu Excise Duty Regulation, 2012',
    regulatoryAuthority: 'Excise Department, UT Administration of DNH & DD',
    officialPortal: 'https://daman.nic.in',
    retailModel: 'Regulated Private Retail with Low Union Territory Excise Tariffs',
    statutorySummary:
      'Daman and Diu serve as key tourist hospitality hubs for neighbouring dry Gujarat. Retail stores operate from 9:00 AM to 10:00 PM, and hotel bars operate until 11:00 PM. Legal drinking age is 21 years.',
    standingDryDaysSummary:
      'Mandatory dry days include 26 January, 15 August, 2 October, and statutory election periods.',
    transitAndPossessionRule:
      'Transporting alcohol across the border into Gujarat is strictly illegal and subject to severe Gujarat Prohibition Act prosecution.',
    penaltiesNotice:
      'Border vehicle checkpoints enforce strict prohibition laws against outward smuggling.',
  },
  'sikkim': {
    actName: 'Sikkim Excise Act, 1992 & Sikkim Liquor Rules',
    regulatoryAuthority: 'Excise Department, Government of Sikkim',
    officialPortal: 'https://sikkim.gov.in',
    retailModel: 'Licensed Retail Vends & Microbreweries',
    statutorySummary:
      'Sikkim licenses retail outlets and boasts thriving local distilleries and microbreweries. Stores operate from 9:00 AM to 10:00 PM. The legal drinking age is 18 years.',
    standingDryDaysSummary:
      'National dry days (26 Jan, 15 Aug, 2 Oct) and Buddha Purnima are observed as statutory closures.',
    transitAndPossessionRule:
      'Personal quotas are limited to 2 bottles with valid payment slips.',
    penaltiesNotice:
      'Regulated under Section 31 of the Sikkim Excise Act, 1992.',
  },
  'tripura': {
    actName: 'Tripura Excise Act, 1987 & Tripura Liquor Rules',
    regulatoryAuthority: 'Excise Directorate, Government of Tripura',
    officialPortal: 'https://tripura.gov.in',
    retailModel: 'Regulated Private Retail Licenses',
    statutorySummary:
      'Tripura regulates alcohol via licensed retail stores operating from 10:00 AM to 9:00 PM. The legal drinking age is 21 years.',
    standingDryDaysSummary:
      'National dry days (26 Jan, 15 Aug, 2 Oct) and Durga Puja immersion dates.',
    transitAndPossessionRule:
      'Domestic quota capped at 2 bottles of spirits.',
    penaltiesNotice:
      'Penalized under Section 42 of the Tripura Excise Act, 1987.',
  },
  'meghalaya': {
    actName: 'Assam Excise Act, 1910 (as adapted by Meghalaya) & Meghalaya Rules',
    regulatoryAuthority: 'Excise Department, Government of Meghalaya',
    officialPortal: 'https://megexcise.gov.in',
    retailModel: 'Licensed Private Bonded Outlets & Retail Wine Stores',
    statutorySummary:
      'Meghalaya regulates private retail outlets across Shillong, Tura, and Jowai. Retail shops operate from 10:00 AM to 8:00 PM (9:00 PM on weekends). The legal drinking age is 21 years.',
    standingDryDaysSummary:
      'National holidays (26 Jan, 15 Aug, 2 Oct) are observed as mandatory dry days.',
    transitAndPossessionRule:
      'Standard personal possession is 2 bottles of foreign liquor/spirits.',
    penaltiesNotice:
      'Prosecuted under the adapted Excise Regulation.',
  },
  'manipur': {
    actName: 'Manipur Liquor Prohibition Act, 1991 (partially amended 2022/2023)',
    regulatoryAuthority: 'Excise Department, Government of Manipur',
    officialPortal: 'https://manipur.gov.in',
    retailModel: 'Regulated Tourism/Hospitality Exemption Model',
    statutorySummary:
      'Manipur historically enforced statewide prohibition from 1991. In late 2022 and 2023, the state cabinet partially relaxed prohibition in district headquarters and registered hotels for revenue and tourism, while general community prohibition remains widely observed.',
    standingDryDaysSummary:
      'Prohibition remains standard across wide local jurisdictions with strict dry enforcement.',
    transitAndPossessionRule:
      'Unauthorized possession without an excise permit invites confiscation.',
    penaltiesNotice:
      'Penalized under the Manipur Liquor Prohibition Act, 1991.',
  },
  'arunachal-pradesh': {
    actName: 'Arunachal Pradesh Excise Act, 1993 & Rules',
    regulatoryAuthority: 'Department of Tax & Excise, Government of Arunachal Pradesh',
    officialPortal: 'https://arunachaltax.nic.in',
    retailModel: 'Licensed Private Retail Outlets & Distilleries',
    statutorySummary:
      'Arunachal Pradesh licenses private retail thekas operating from 9:00 AM to 9:00 PM. The legal drinking age is 21 years.',
    standingDryDaysSummary:
      'Mandatory dry days include 26 January, 15 August, 2 October, and local festival notifications.',
    transitAndPossessionRule:
      'Carrying alcohol into inner line permit (ILP) areas is regulated.',
    penaltiesNotice:
      'Penalized under Section 41 of the Arunachal Pradesh Excise Act, 1993.',
  },
  'andaman-and-nicobar-islands': {
    actName: 'Andaman and Nicobar Islands Excise Regulation, 2012',
    regulatoryAuthority: 'Excise Department, Andaman & Nicobar Administration',
    officialPortal: 'https://andaman.gov.in',
    retailModel: 'ANIIDCO State Corporation Retail Counters & Licensed Resort Bars',
    statutorySummary:
      'Retail liquor sales in the Andaman & Nicobar Islands are operated primarily through the Andaman & Nicobar Islands Integrated Development Corporation (ANIIDCO). Private licensed bars operate in tourist resort destinations (Havelock/Swaraj Dweep, Neil/Shaheed Dweep, Port Blair). Retail hours are 10:00 AM to 8:00 PM. The legal drinking age is 21 years.',
    standingDryDaysSummary:
      'Standing dry days are observed on the 7th and 21st of every month in select municipal zones, alongside national holidays (26 Jan, 15 Aug, 2 Oct) and Gandhi Martyrdom Day (30 Jan).',
    transitAndPossessionRule:
      'Strictly prohibited to carry or sell alcohol within designated tribal reserve zones (e.g. Jarawa reserve areas) under the Protection of Aboriginal Tribes (PAT) Regulation.',
    penaltiesNotice:
      'Violations in tribal reserves carry severe non-bailable criminal imprisonment.',
  },
};

export function getStateExciseProfile(stateSlug: string): StateExciseProfile | undefined {
  return STATE_EXCISE_PROFILES[stateSlug.toLowerCase()];
}
