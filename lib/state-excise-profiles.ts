/**
 * Authoritative State & UT Excise Regulatory Profiles for DryCheck India.
 *
 * Provides distinct, verified statutory and administrative context for each
 * of India's 36 States and Union Territories. Eliminates programmatic template
 * duplication and delivers authentic E-E-A-T legal value to users and crawlers.
 */

export interface LicenseCategory {
  code: string;
  name: string;
  description: string;
}

export interface StateExciseFaq {
  question: string;
  answer: string;
}

export interface StateExciseProfile {
  actName: string;
  regulatoryAuthority: string;
  officialPortal: string;
  retailModel: string;
  statutorySummary: string;
  standingDryDaysSummary: string;
  transitAndPossessionRule: string;
  penaltiesNotice: string;
  historyAndPolicy: string;
  retailAndLicensingDetails: string;
  licenseCategories: LicenseCategory[];
  interstateTransitGuidance: string;
  onlineDeliveryPolicy: string;
  districtAndCityNuances: string;
  bespokeFaqs: StateExciseFaq[];
}

export const STATE_EXCISE_PROFILES: Record<string, StateExciseProfile> = {
  "delhi": {
    "actName": "Delhi Excise Act, 2009 & Delhi Excise Rules, 2010",
    "regulatoryAuthority": "Department of Excise, Entertainment & Luxury Tax, Government of NCT of Delhi",
    "officialPortal": "https://excise.delhi.gov.in",
    "retailModel": "100% State Corporation Retail (DTTDC, DSIIDC, DCCWS, DSCSC)",
    "statutorySummary": "In the National Capital Territory of Delhi, retail liquor distribution is exclusively managed by four state government undertakings: DTTDC, DSIIDC, DCCWS, and DSCSC. The legal drinking age in Delhi is statutorily set at 21 years under the Delhi Excise Act, 2009. Retail vends operate strictly between 10:00 AM and 10:00 PM, while standalone hotel and restaurant bars holding L-16/L-17 licenses serve liquor until 1:00 AM (extended to 3:00 AM in designated hospitality hubs like Aerocity).",
    "standingDryDaysSummary": "Delhi enforces mandatory 24-hour dry-day closures across all retail stores on Republic Day (26 Jan), Independence Day (15 Aug), Gandhi Jayanti (2 Oct), alongside major religious observances including Eid-ul-Fitr, Eid-ul-Adha, Muharram, Mahavir Jayanti, Buddha Purnima, Guru Nanak Jayanti, and Dussehra. During municipal or legislative assembly elections, a 48-hour dry curfew ending with the conclusion of polling is strictly enforced.",
    "transitAndPossessionRule": "Under Rule 20 of the Delhi Excise Rules, 2010, an individual may possess up to 9 litres of foreign liquor/wine and 18 litres of beer or alcopop for domestic consumption. However, importing liquor across NCR borders (from Haryana or Uttar Pradesh) without paying Delhi excise duty is strictly capped at one sealed 750ml bottle per individual.",
    "penaltiesNotice": "Possession beyond authorized quotas or unauthorized interstate bootlegging invites prosecution under Section 33 of the Delhi Excise Act, 2009, punishable with rigorous imprisonment of up to 3 years and heavy pecuniary fines.",
    "historyAndPolicy": "Delhi transitioned back to its legacy government-corporation retail regime in September 2022 following the rollback of the 2021-22 privatization policy. The current regulatory environment prioritizes strict revenue protection, regulated brand registration, standardized wholesale pricing, and state-controlled inventory dispatch via electronic excise portals.",
    "retailAndLicensingDetails": "Over 600 government vends are strategically distributed across municipal zones. Each vend operates computerized POS billing with real-time barcode authentication to prevent counterfeit products. Retail margins are statutorily fixed, and all bottles must carry the high-security hologram issued by the Delhi Excise Commissionerate.",
    "licenseCategories": [
      {
        "code": "L-1 / L-2",
        "name": "Wholesale & Retail Government Vend",
        "description": "Packaged liquor retail run exclusively by government undertakings (10:00 AM – 10:00 PM)."
      },
      {
        "code": "L-16 / L-17",
        "name": "Independent Restaurant & Hotel Bar",
        "description": "Table service of Indian and imported liquor in certified commercial dining establishments (up to 1:00 AM / 3:00 AM)."
      },
      {
        "code": "L-10",
        "name": "Premium Retail Vend in Shopping Malls",
        "description": "Air-conditioned walk-in shopping experience for premium spirits and imported wines."
      },
      {
        "code": "P-10",
        "name": "One-Day Event & Banquet Permit",
        "description": "Temporary commercial liquor service license for weddings, farmhouses, and corporate parties."
      }
    ],
    "interstateTransitGuidance": "Delhi Police and the Excise Flying Squad conduct random vehicle inspections along NCR border points (DND Flyway, Kalindi Kunj, Badarpur, Sirhaul border). Commuters entering Delhi from Haryana or UP are restricted to at most one sealed bottle (750ml) for personal consumption. Bulk carriage or commercial transit of Haryana-labeled bottles into Delhi constitutes an unbailable revenue offence.",
    "onlineDeliveryPolicy": "Home delivery of liquor is completely illegal in the NCT of Delhi. Although legal draft provisions for app-based delivery were proposed during policy revisions, no licenses have been operationalized. Food delivery aggregators (Zomato, Swiggy, Blinkit) are prohibited from delivering alcohol; online liquor vendors operating in Delhi are fraudulent.",
    "districtAndCityNuances": "New Delhi Municipal Council (NDMC) and South Delhi zones (Connaught Place, Khan Market, Mehrauli, Aerocity) feature the highest density of L-16 restobars and extended night-time hospitality hours. In contrast, residential vends in East and North East Delhi face strict 10:00 PM shuttering with intense local community policing.",
    "bespokeFaqs": [
      {
        "question": "Can I bring liquor from Gurgaon (Haryana) or Noida (UP) into Delhi?",
        "answer": "Yes, but under Rule 20 of the Delhi Excise Rules, 2010, an individual is legally permitted to bring at most one sealed 750ml bottle of liquor across NCR borders for personal consumption without paying Delhi state excise duty. Carrying commercial quantities, unmanifested cartons, or multiple bottles from Haryana or UP into Delhi constitutes illegal bootlegging and is prosecuted under Section 33 with non-bailable arrest."
      },
      {
        "question": "Why do retail liquor thekas in Delhi close strictly at 10:00 PM?",
        "answer": "All retail liquor vends in Delhi are operated by state government undertakings (DTTDC, DSIIDC, DCCWS, DSCSC). Under Delhi Excise Department regulations, these government stores are mandated to close their shutters at exactly 10:00 PM sharp to maintain urban public order and prevent late-night street loitering."
      },
      {
        "question": "Which bars in Delhi are allowed to serve alcohol until 3:00 AM?",
        "answer": "Standalone restaurants and hotel bars with L-16/L-17 licenses typically close by 1:00 AM. However, licensed hospitality venues in designated tourism hubs—most notably the Aerocity hospitality district near IGI Airport and select 5-star luxury hotels in New Delhi—hold special extended licenses allowing alcohol service until 3:00 AM."
      },
      {
        "question": "Can you order alcohol online or through food apps like Swiggy or Zomato in Delhi?",
        "answer": "No. Doorstep home delivery of alcohol is completely illegal in the NCT of Delhi. Although proposed in draft policies, no online delivery license has ever been operationalized. Any website, WhatsApp group, or delivery app claiming to deliver liquor to your home in Delhi is fraudulent."
      },
      {
        "question": "What is the legal drinking age in Delhi?",
        "answer": "Under the Delhi Excise Act, 2009, the statutory minimum legal drinking age in the National Capital Territory of Delhi is 21 years."
      }
    ]
  },
  "uttar-pradesh": {
    "actName": "United Provinces Excise Act, 1910 (as amended for Uttar Pradesh)",
    "regulatoryAuthority": "Uttar Pradesh Excise Department, Government of Uttar Pradesh",
    "officialPortal": "https://upexcise.gov.in",
    "retailModel": "Auctioned Private Retail Thekas & Premium Model Shops",
    "statutorySummary": "Uttar Pradesh governs alcohol production, taxation, and distribution under the United Provinces Excise Act, 1910, overseen by the Excise Commissioner in Prayagraj. Retail licenses are allocated through an annual e-lottery/settlement system across 75 revenue districts. The standard retail operating window is strictly 10:00 AM to 10:00 PM. The minimum legal drinking age in Uttar Pradesh is 21 years.",
    "standingDryDaysSummary": "Standing statewide dry days in UP include Republic Day (26 Jan), Independence Day (15 Aug), Gandhi Jayanti (2 Oct), Rama Navami, Mahavir Jayanti, Eid-ul-Fitr, Muharram, and Guru Nanak Jayanti. While Diwali day is historically an open commercial retail evening, individual district magistrates (DMs) possess discretionary authority under Section 59 to notify localized dry days during Kanwar Yatra routes, municipal polling, and local melas.",
    "transitAndPossessionRule": "Bringing liquor purchased in Delhi or Haryana into Uttar Pradesh without a valid UP excise barcode is strictly restricted. The state excise enforcement wing permits at most one unsealed bottle per commuter for personal transit; bringing un-taxed commercial quantities from NCR borders violates state revenue laws.",
    "penaltiesNotice": "Unlawful transport or possession of non-UP duty-paid liquor is prosecuted under Sections 60 and 63 of the UP Excise Act, carrying non-bailable arrest warrants, vehicle impoundment, and mandatory fines.",
    "historyAndPolicy": "Uttar Pradesh has developed one of India’s most robust excise revenue frameworks, yielding over ₹45,000 crore annually. The state transitioned from manual tenders to transparent e-lottery allocations, establishing track-and-trace QR codes on every bottle from distillery to consumer.",
    "retailAndLicensingDetails": "Retail vends in UP are categorized into Country Liquor (Desi Theka), Foreign Liquor (IMFL), Beer Shops, and Model Shops. Model shops feature air-conditioned interiors and attached consumption cabins (ahatas), providing organized off-street consumption options in urban centers.",
    "licenseCategories": [
      {
        "code": "FL-4 / FL-5",
        "name": "Retail Foreign Liquor & Beer Vend",
        "description": "Packaged off-premise retail shops operating under strict 10:00 AM – 10:00 PM daily hours."
      },
      {
        "code": "FL-7 / FL-7B",
        "name": "Bar & Commercial Restaurant License",
        "description": "Table service of spirits and draught beer inside certified dining and hotel establishments."
      },
      {
        "code": "Model Shop",
        "name": "Premium Walk-in Store with Ahata",
        "description": "Upmarket retail stores offering packaged liquor along with an enclosed tasting cabin."
      },
      {
        "code": "Occasional Permit",
        "name": "One-Day Commercial Event License",
        "description": "Mandatory single-day excise permit for hosting alcohol service at banquets and weddings."
      }
    ],
    "interstateTransitGuidance": "Commuters crossing NCR borders (Noida, Greater Noida, Ghaziabad) from Delhi or Haryana are closely monitored at toll checkposts (Chilla, DND, Kalindi Kunj). Only one unsealed bottle per passenger is tolerated for genuine personal transit; transporting sealed cartons or bootlegged liquor from Haryana incurs immediate seizure, FIR registration, and impoundment of the vehicle.",
    "onlineDeliveryPolicy": "Doorstep home delivery of liquor is prohibited across Uttar Pradesh. E-commerce food aggregators are not authorized to deliver alcohol; purchases must be made physically at licensed counters during authorized hours.",
    "districtAndCityNuances": "Strict religious zoning is enforced: complete alcohol bans operate within the sacred perimeters of Ayodhya (Panchkosi and Chaudah Kosi parikrama rings), Mathura-Vrindavan (22 designated municipal wards), and the Kashi Vishwanath temple corridor in Varanasi. Commercial hubs like Noida and Lucknow enjoy model shop culture.",
    "bespokeFaqs": [
      {
        "question": "What are UP Model Shops, and are you allowed to drink inside them?",
        "answer": "Model Shops in Uttar Pradesh are premium, air-conditioned retail walk-in liquor stores that hold a specialized license allowing an enclosed consumption cabin called an \"Ahata\". Customers can buy chilled beer, wine, or spirits at printed retail prices and consume them legally with food inside the attached seating area."
      },
      {
        "question": "Can I bring alcohol purchased in Delhi or Haryana into Noida or Ghaziabad?",
        "answer": "UP Excise enforcement strictly monitors NCR border checkpoints such as Chilla, Kalindi Kunj, and DND Flyway. Commuters are permitted at most one unsealed bottle for transit. Carrying sealed bottles or cartons of cheaper Delhi or Haryana duty-paid liquor into UP violates Section 63 of the UP Excise Act, carrying non-bailable arrest and immediate vehicle impoundment."
      },
      {
        "question": "Why is alcohol completely prohibited in Ayodhya and Mathura?",
        "answer": "Under Uttar Pradesh government statutory notifications, absolute alcohol-free holy zones are enforced around sacred Hindu shrines. In Ayodhya, liquor sales are banned across the Panchkosi and Chaudah Kosi parikrama pilgrimage routes. In Mathura-Vrindavan, all 22 municipal wards surrounding the Krishna Janmabhoomi temple are complete dry zones."
      },
      {
        "question": "What are the theka operating hours across Uttar Pradesh?",
        "answer": "All retail liquor stores, country liquor thekas, beer shops, and model shops across all 75 districts of Uttar Pradesh operate strictly from 10:00 AM to 10:00 PM."
      },
      {
        "question": "Is home delivery of liquor permitted anywhere in Uttar Pradesh?",
        "answer": "No. Doorstep home delivery of alcohol is completely prohibited across Uttar Pradesh. In-person physical purchase at authorized licensed counters is mandatory."
      }
    ]
  },
  "maharashtra": {
    "actName": "Maharashtra Prohibition Act, 1949 (formerly Bombay Prohibition Act, 1949)",
    "regulatoryAuthority": "State Excise Department (Rajya Utpadan Shulk), Government of Maharashtra",
    "officialPortal": "https://stateexcise.maharashtra.gov.in",
    "retailModel": "Licensed Private Retail (FL-II Wine Stores) & Supermarket Outlets",
    "statutorySummary": "Maharashtra administers alcohol control under the landmark Maharashtra Prohibition Act, 1949. Uniquely under Section 11, the consumption of liquor legally requires a valid personal liquor permit issued by the State Excise Department (available online or daily at licensed premises). The legal drinking age is 21 for mild beer/wine and 25 for hard spirits. Two districts—Wardha (associated with Mahatma Gandhi) and Gadchiroli—are under permanent district-wide statutory prohibition.",
    "standingDryDaysSummary": "Statewide mandatory dry days include Republic Day (26 Jan), Maharashtra Day (1 May), Independence Day (15 Aug), Gandhi Jayanti (2 Oct), Prohibition Week launch (8 Oct), and the martyrdom anniversary of Mahatma Gandhi (30 Jan). Major religious dry days include Ashadhi Ekadashi and Kartiki Ekadashi (with complete Pandharpur pilgrimage bans), Ganesh Visarjan (Anant Chaturdashi), Moharram, and Mahavir Jayanti.",
    "transitAndPossessionRule": "Carrying liquor into Maharashtra from Daman, Goa, or Karnataka without a transit pass issued by the Maharashtra Commissioner of State Excise is unlawful. Standard domestic possession within Maharashtra is limited to 12 sealed bottles of spirits with valid consumer permits.",
    "penaltiesNotice": "Illegal manufacture, possession, or transit is punishable under Section 65 of the Maharashtra Prohibition Act, 1949, with imprisonment of up to 5 years and vehicle confiscation.",
    "historyAndPolicy": "Rooted in Gandhian temperance principles, Maharashtra maintained a permit-based legal fiction where consumption is technically authorized for medical maintenance. Over decades, this evolved into a streamlined online permit system and a booming indigenous wine industry centered around the Nashik valley.",
    "retailAndLicensingDetails": "Private retail vends (FL-II) and standalone beer/wine shoppes (FLBR-II) operate across municipal wards. Maharashtra also permits shelf sales of mild fruit wines in licensed supermarkets across major metropolitan areas.",
    "licenseCategories": [
      {
        "code": "FL-II",
        "name": "Retail Foreign Liquor Merchant Shop",
        "description": "Packaged off-premise sales of IMFL, imported spirits, beer, and wines (10:30 AM – 10:30 PM)."
      },
      {
        "code": "FL-III",
        "name": "Restaurant Permit Room & Bar",
        "description": "Table service of liquor in licensed dining rooms and lounges (operating up to 1:30 AM in Mumbai/Pune)."
      },
      {
        "code": "FLBR-II",
        "name": "Beer & Wine Shoppe",
        "description": "Exclusive retail store licensed solely for mild and strong beer and domestic table wines."
      },
      {
        "code": "Form E",
        "name": "Personal Drinking Permit",
        "description": "Lifetime or annual consumer permit required under Section 11 of the Prohibition Act."
      }
    ],
    "interstateTransitGuidance": "Maharashtra Excise maintains rigorous border check-posts along the Goa border (Banda, Patradevi) and Gujarat/Daman borders (Achhad, Talasari). Carrying liquor from Goa without a Maharashtra import pass is strictly prohibited; bottles purchased in Goa duty-free shops are routinely confiscated at highway check-posts and Konkan railway stations.",
    "onlineDeliveryPolicy": "Home delivery is legally permitted through licensed local FL-II retailers who hold home delivery permits. Delivery agents must verify the recipient’s digital excise permit upon delivery. Third-party aggregator apps operate only under strictly defined pilot partnerships in major cities.",
    "districtAndCityNuances": "Wardha and Gadchiroli are 100% dry districts where alcohol possession is completely banned. Complete pilgrimage dry closures are enforced in Pandharpur during Wari pilgrimages, Alandi, and Dehu. Mumbai, Navi Mumbai, and Pune enjoy extended dining hours up to 1:30 AM.",
    "bespokeFaqs": [
      {
        "question": "Do I legally need a liquor permit to drink alcohol in Mumbai or Pune?",
        "answer": "Yes. Under Section 11 of the Maharashtra Prohibition Act, 1949, any individual consuming or possessing alcohol is technically required to hold a valid personal liquor permit (Form E). Daily permits can be purchased for a nominal fee (around ₹5) at licensed permit rooms, or annual/lifetime permits can be obtained digitally via the state excise Aaple Sarkar portal."
      },
      {
        "question": "Why are Wardha and Gadchiroli completely dry districts in Maharashtra?",
        "answer": "Wardha enforces complete statutory prohibition in reverence to Mahatma Gandhi, who established Sevagram Ashram there. Gadchiroli enforces district-wide prohibition to protect vulnerable tribal communities and combat public health concerns associated with alcoholism."
      },
      {
        "question": "Why is the legal drinking age 25 for spirits in Maharashtra?",
        "answer": "Maharashtra enforces a bifurcated legal drinking age: adults who are 21 years old may legally purchase and consume mild beer and wine, but you must be at least 25 years old to consume or purchase hard spirits and foreign liquor."
      },
      {
        "question": "Is alcohol banned during Ganesh Visarjan in Mumbai and Pune?",
        "answer": "Yes. Anant Chaturdashi (the final day of Ganesh Visarjan) is a mandatory statewide statutory dry day in Maharashtra. All retail wine shops, permit rooms, and hotel bars are strictly mandated to remain closed."
      },
      {
        "question": "Can I carry alcohol from Goa into Maharashtra?",
        "answer": "No. Transporting liquor from Goa into Maharashtra without a valid transit pass issued by the Maharashtra Commissioner of State Excise is strictly illegal. Flying squads and border checkposts at Banda and Patradevi intercept vehicles and confiscate bottles under Section 65."
      }
    ]
  },
  "karnataka": {
    "actName": "Karnataka Excise Act, 1965 & Karnataka Excise (Sale of Indian and Foreign Liquors) Rules, 1968",
    "regulatoryAuthority": "Karnataka Excise Department & KSBCL",
    "officialPortal": "https://karnatakaexcise.karnataka.gov.in",
    "retailModel": "Wholesale KSBCL Monopoly & Private Retail Licenses (CL-2 Off-Shops, CL-9 Bars)",
    "statutorySummary": "All wholesale liquor procurement and distribution in Karnataka is monopolized by the Karnataka State Beverages Corporation Limited (KSBCL). Retail outlets are classified into CL-2 (off-premise retail vends) and CL-9 (commercial bar-cum-restaurants). In Bengaluru and tier-1 municipal corporations, CL-2 retail shops operate from 9:00 AM to 10:30 PM, whereas pubs and microbreweries in Bengaluru urban areas frequently enjoy weekend operating windows up to 1:00 AM. The legal drinking age is 21 years.",
    "standingDryDaysSummary": "Mandatory dry days in Karnataka include Republic Day (26 Jan), Independence Day (15 Aug), Gandhi Jayanti (2 Oct), and Kannada Rajyotsava (1 Nov). Religious dry observances include Mahavir Jayanti, Good Friday, Eid-ul-Fitr, Muharram, and Valmiki Jayanti. During biennial MLC elections and assembly polls, strict 48-hour section 135C bans are enforced.",
    "transitAndPossessionRule": "Under the Karnataka Excise (Possession, Transport, Import and Export) Rules, an individual can possess up to 18.2 litres of beer, 9 litres of wine, and 2.3 litres of IMFL/spirits without a special permit. Cross-border movement from Goa without a KSBCL permit is intercepted at border checkposts near Karwar and Belagavi.",
    "penaltiesNotice": "Offences involving illicit transit or bootlegging are penalized under Sections 32 and 34 of the Karnataka Excise Act, 1965.",
    "historyAndPolicy": "Karnataka established KSBCL in 2003 to eliminate spurious liquor syndicates and secure wholesale tax revenues. Bengaluru subsequently emerged as India’s craft brewing capital, developing pioneering microbrewery licensing norms that transformed the urban pub culture.",
    "retailAndLicensingDetails": "Private retailers purchase solely from government KSBCL depots. While CL-2 licenses are tightly capped in number, premium MRP supermarkets (malls) provide modern retail experiences. Commercial bars operate under CL-9 licenses.",
    "licenseCategories": [
      {
        "code": "CL-2",
        "name": "Retail Off-Premise Liquor Vend",
        "description": "Standard packaged retail store selling IMFL, beer, and wine (9:00 AM – 10:30 PM)."
      },
      {
        "code": "CL-9",
        "name": "Commercial Bar & Restaurant",
        "description": "Table service of food and alcohol in dining facilities and urban pubs."
      },
      {
        "code": "Microbrewery",
        "name": "Craft Brewery On-Premise License",
        "description": "Specialized license allowing restaurants to brew and dispense craft beer on-site."
      },
      {
        "code": "CL-4",
        "name": "Private Club License",
        "description": "Exclusive bar licenses for registered recreation and social clubs."
      }
    ],
    "interstateTransitGuidance": "Vehicles arriving from Goa via Karwar, Chorla Ghat, or Belagavi face intensive excise inspections. Bringing duty-unpaid Goa liquor into Karnataka is strictly prohibited regardless of quantity; offenders face confiscation, vehicle detention, and compounding penalties under Section 34.",
    "onlineDeliveryPolicy": "Online liquor delivery and app ordering are strictly illegal across Karnataka. The High Court of Karnataka dismissed petitions seeking online alcohol delivery, reaffirming that physical in-person sales at licensed premises are mandatory.",
    "districtAndCityNuances": "Bengaluru Urban (BBMP limits) allows commercial pubs and microbreweries to operate until 1:00 AM on Fridays and Saturdays. Coastal and interior districts (Mangaluru, Udupi, Hubballi, Mysuru) adhere strictly to standard 10:30 PM / 11:00 PM closing curfews.",
    "bespokeFaqs": [
      {
        "question": "Do Bangalore pubs and microbreweries stay open until 1:00 AM?",
        "answer": "Yes. In the Bengaluru Urban (BBMP) metropolitan area, commercial pubs, craft microbreweries, and CL-9 restaurant bars are permitted extended operating hours until 1:00 AM on Friday and Saturday nights to accommodate the city's nightlife culture."
      },
      {
        "question": "Why is online liquor delivery strictly banned in Bangalore and Karnataka?",
        "answer": "The High Court of Karnataka dismissed legal petitions seeking permission for app-based alcohol delivery, upholding the state government's policy that in-person retail sales at licensed premises are mandatory to prevent underage drinking and maintain verification standards."
      },
      {
        "question": "What is the difference between CL-2 and CL-9 licenses in Karnataka?",
        "answer": "CL-2 licenses are granted to off-premise retail liquor vends that sell sealed packaged bottles for home consumption (operating 9:00 AM – 10:30 PM). CL-9 licenses are commercial bar and restaurant licenses that permit the table service of food and alcoholic beverages on-site."
      },
      {
        "question": "Can I bring alcohol from Goa into Karnataka by road or train?",
        "answer": "No. Transporting duty-unpaid liquor from Goa into Karnataka is illegal without a permit from KSBCL. State excise checkposts along the Western Ghats (Karwar, Chorla Ghat, and Belagavi) actively search vehicles and confiscate bottles."
      },
      {
        "question": "Is Kannada Rajyotsava (1 November) a dry day across Karnataka?",
        "answer": "Yes. 1 November is an official state dry day celebrating Kannada Rajyotsava (Karnataka Formation Day); all retail wine shops, CL-2 stores, and commercial bars remain closed statewide."
      }
    ]
  },
  "rajasthan": {
    "actName": "Rajasthan Excise Act, 1950 & Rajasthan Excise Rules, 1956",
    "regulatoryAuthority": "Rajasthan State Excise Department & RSBCL",
    "officialPortal": "https://rajexcise.gov.in",
    "retailModel": "RSBCL Wholesale & E-Auctioned Retail Wine Shops",
    "statutorySummary": "Rajasthan regulates liquor distribution through the Rajasthan State Beverages Corporation Limited (RSBCL). The state is known for its strict statewide retail closing curfew: all licensed retail thekas and wine shops across all 50 districts must close doors at exactly 8:00 PM. Hotel bars and heritage dining establishments holding bar licenses may continue serving until 11:00 PM / 12:00 AM. The statutory drinking age in Rajasthan is 18 years under the Rajasthan Excise Act, 1950.",
    "standingDryDaysSummary": "Rajasthan observes statutory dry days on Republic Day (26 Jan), Independence Day (15 Aug), Gandhi Jayanti (2 Oct), and the death anniversary of Mahatma Gandhi (30 Jan). Religious dry days include Mahaveer Jayanti, Buddha Purnima, Guru Nanak Jayanti, Eid-ul-Fitr, Muharram, and Janmashtami. Localized closures are notified during Pushkar Fair in holy lake areas.",
    "transitAndPossessionRule": "Importing duty-unpaid liquor from Haryana or Punjab into Rajasthan is heavily policed along the Alwar, Bharatpur, Hanumangarh, and Sriganganagar borders. Maximum domestic possession is capped at 12 bottles of beer and 3 bottles of spirits per household.",
    "penaltiesNotice": "Bootlegging and illicit transit invite harsh penalties under Section 54 of the Rajasthan Excise Act, 1950, including vehicle impoundment and non-bailable criminal prosecution.",
    "historyAndPolicy": "Rajasthan implemented its iconic 8:00 PM retail curfew in 2008 to curb evening street drinking and domestic disturbances. The state balances strict retail restrictions with heritage hospitality tourism, permitting luxury palace hotels special exemptions.",
    "retailAndLicensingDetails": "Retail vends are allocated through an annual e-auction system. Each vend is restricted to selling RSBCL-cleared stock bearing the Rajasthan excise hologram. Counter sales are strictly barred after 8:00 PM sharp.",
    "licenseCategories": [
      {
        "code": "Retail Theka",
        "name": "Off-Premise Retail Liquor Vend",
        "description": "Packaged bottle store operating strictly from 10:00 AM to 8:00 PM curfew."
      },
      {
        "code": "Hotel Bar License",
        "name": "Heritage & Star Hotel Bar",
        "description": "Dining and lounge liquor service in recognized tourist hotels (up to 11:00 PM / Midnight)."
      },
      {
        "code": "Commercial Bar",
        "name": "Restaurant Bar & Lounge",
        "description": "Urban dining bar service operating in major municipal centers."
      },
      {
        "code": "Occasional Permit",
        "name": "Destination Wedding Liquor Permit",
        "description": "Mandatory single-day permit for hosting alcohol service at forts, palaces, and banquet lawns."
      }
    ],
    "interstateTransitGuidance": "Interstate check-posts along Haryana (Bhiwadi, Neemrana, Behror) and Punjab (Sriganganagar) are equipped with CCTV and surveillance teams. Carrying commercial quantities of cheaper Haryana alcohol into Rajasthan is treated as organized tax evasion, punishable with vehicle confiscation.",
    "onlineDeliveryPolicy": "Home delivery of liquor is completely prohibited in Rajasthan. In-person physical purchase at authorized shops before 8:00 PM is legally required.",
    "districtAndCityNuances": "Complete alcohol prohibition is enforced in the holy municipal perimeter of Pushkar (Ajmer district) around the sacred Pushkar Lake. Tourist hubs like Jaipur, Udaipur, and Jaisalmer enjoy heritage hospitality licenses that permit dining room alcohol service until late evening.",
    "bespokeFaqs": [
      {
        "question": "Why do all wine shops and thekas in Rajasthan close strictly at 8:00 PM?",
        "answer": "Under the Rajasthan Excise Rules, all licensed retail liquor thekas across all 50 districts must close their shutters at exactly 8:00 PM. This early closing curfew was implemented by the state government to maintain public safety, prevent evening street drinking, and curb drunk driving."
      },
      {
        "question": "Can heritage palace hotels in Jaipur and Udaipur serve liquor after 8:00 PM?",
        "answer": "Yes. While retail packaged thekas must close at 8:00 PM sharp, certified heritage palace hotels, star luxury resorts, and recognized restaurant bars holding valid bar licenses are permitted to serve liquor to dining guests until 11:00 PM or Midnight."
      },
      {
        "question": "Is alcohol completely prohibited in Pushkar holy town?",
        "answer": "Yes. Under local municipal regulations, alcohol sale, transport, and public consumption are strictly banned within the sacred municipal perimeter surrounding the holy Pushkar Lake and Brahma Temple."
      },
      {
        "question": "What is the legal drinking age in Rajasthan?",
        "answer": "Under the Rajasthan Excise Act, 1950, the statutory minimum legal drinking age in Rajasthan is 18 years, making it lower than Delhi (21), UP (21), or Punjab (25)."
      },
      {
        "question": "Can I carry liquor from Haryana into Rajasthan?",
        "answer": "No. Smuggling cheaper Haryana-duty alcohol across borders into Rajasthan (Alwar, Bhiwadi, Behror, Sriganganagar) is heavily penalized under Section 54 of the Rajasthan Excise Act, resulting in immediate vehicle seizure and criminal prosecution."
      }
    ]
  },
  "punjab": {
    "actName": "Punjab Excise Act, 1914 & Punjab Liquor License Rules, 1956",
    "regulatoryAuthority": "Department of Excise and Taxation, Government of Punjab",
    "officialPortal": "https://excise.punjab.gov.in",
    "retailModel": "Auctioned Private Retail Licensing (L-2 Retail & L-14A Country Vends)",
    "statutorySummary": "Punjab governs the liquor trade under the venerable Punjab Excise Act, 1914. Retail licenses are categorized into L-2 (IMFL/Foreign liquor) and L-14A (country liquor). Retail shops typically operate from 9:00 AM to 11:00 PM in municipal corporation limits (Ludhiana, Amritsar, Jalandhar, Patiala, Bathinda). Under Section 26 of the Punjab Panchayati Raj Act, 1994, rural Gram Panchayats possess statutory authority to pass resolutions prohibiting liquor vends within village boundaries. The legal drinking age is 25 years.",
    "standingDryDaysSummary": "Punjab enforces full statewide dry days on Republic Day (26 Jan), Independence Day (15 Aug), Gandhi Jayanti (2 Oct), and Guru Nanak Jayanti (Prakash Parv). Additional gazetted dry dates include Guru Tegh Bahadur Shaheedi Diwas, Guru Gobind Singh Jayanti, Mahavir Jayanti, and Bhagat Singh Martyrdom Day (23 March).",
    "transitAndPossessionRule": "An individual in Punjab may possess up to two bottles of IMFL/imported liquor without a permit, or larger quantities under a valid L-50 permit issued by the Excise Department. Transporting liquor from Chandigarh or Haryana without paying Punjab excise duty is illegal.",
    "penaltiesNotice": "Offences involving illicit transit, bootlegging, or distillation are prosecuted under Sections 61, 63, and 68 of the Punjab Excise Act, 1914.",
    "historyAndPolicy": "As one of India’s historic agricultural powerhouses, Punjab’s excise framework represents a major portion of state tax receipts. Progressive reforms have clamped down on spurious liquor networks through digital transport tracking and QR-code verification on all crates.",
    "retailAndLicensingDetails": "Retail vends are auctioned in commercial groups comprising both urban L-2 shops and rural L-14A country liquor outlets. Modern air-conditioned walk-in vends operate in major retail markets.",
    "licenseCategories": [
      {
        "code": "L-2",
        "name": "Retail Foreign Liquor Vend",
        "description": "Packaged off-premise sales of IMFL, imported spirits, and beer (9:00 AM – 11:00 PM)."
      },
      {
        "code": "L-14A",
        "name": "Country Liquor Theka",
        "description": "Licensed rural and urban retail shop for traditional country spirit sales."
      },
      {
        "code": "L-4 / L-5",
        "name": "Bar & Restaurant License",
        "description": "On-premise table service of liquor in licensed commercial dining facilities."
      },
      {
        "code": "L-50",
        "name": "Domestic Liquor Storage Permit",
        "description": "Official permit enabling private households to store higher quotas of alcohol legally."
      }
    ],
    "interstateTransitGuidance": "Check-posts between Chandigarh UT and Punjab (Zirakpur, Mohali border, Nayagaon) monitor traffic. Chandigarh alcohol carries lower local duties, and carrying un-manifested liquor into Punjab is strictly penalized under Section 61 with immediate seizure.",
    "onlineDeliveryPolicy": "Home delivery of liquor is not permitted in Punjab. All retail sales must take place over the counter at designated licensed vends.",
    "districtAndCityNuances": "Strict religious zoning prohibits alcohol vends and meat shops within the walled heritage city surrounding the Golden Temple (Harmandir Sahib) in Amritsar. Rural Gram Panchayats frequently exercise legal rights to ban vends within village territorial limits.",
    "bespokeFaqs": [
      {
        "question": "Why is the legal drinking age 25 in Punjab?",
        "answer": "Under Section 29 of the Punjab Excise Act, 1914, the statutory minimum legal drinking age is 25 years. Selling alcohol to anyone under 25 or employing minors in licensed premises is a punishable criminal offence."
      },
      {
        "question": "Can rural Gram Panchayats ban liquor thekas in their village in Punjab?",
        "answer": "Yes. Under Section 26 of the Punjab Panchayati Raj Act, 1994, any Gram Panchayat has the statutory right to pass a formal two-thirds majority resolution demanding that no retail liquor vend be opened within the territorial limits of their village."
      },
      {
        "question": "Is alcohol prohibited around the Golden Temple in Amritsar?",
        "answer": "Yes. The historic walled city surrounding Sri Harmandir Sahib (Golden Temple) in Amritsar is an officially designated sacred zone where the sale, storage, and consumption of alcohol, tobacco, and meat are completely banned."
      },
      {
        "question": "What is the difference between L-2 and L-14A thekas in Punjab?",
        "answer": "L-2 thekas are licensed retail vends for Indian Made Foreign Liquor (IMFL), imported spirits, and commercial beer. L-14A thekas are specialized rural and urban outlets licensed to sell traditional country liquor (Desi Sharab)."
      },
      {
        "question": "Can I bring cheaper liquor from Chandigarh into Mohali or Ludhiana?",
        "answer": "No. Transporting Chandigarh-labeled liquor into Punjab without paying Punjab excise duty violates Section 61. Police and excise flying squads regularly intercept vehicles along the Mohali and Zirakpur borders."
      }
    ]
  },
  "haryana": {
    "actName": "Punjab Excise Act, 1914 (as adapted for Haryana) & Haryana Excise Policy 2024-26",
    "regulatoryAuthority": "Excise and Taxation Department, Government of Haryana",
    "officialPortal": "https://haryanatax.gov.in",
    "retailModel": "E-Tendered Private Retail Vends & Modern Walk-in Boutiques",
    "statutorySummary": "Haryana regulates its vibrant liquor market under the adapted Punjab Excise Act, 1914, and biennial state excise policies. Known for competitive excise pricing and premium retail infrastructure in Cyber City Gurugram and Faridabad, retail vends operate from 8:00 AM to 12:00 Midnight, with 24/7 retail options available in designated commercial hospitality zones. The legal drinking age in Haryana is 21 years.",
    "standingDryDaysSummary": "Mandatory dry days in Haryana include Republic Day (26 Jan), Independence Day (15 Aug), and Gandhi Jayanti (2 Oct). Religious dry observances include Mahavir Jayanti, Guru Nanak Jayanti, and Eid-ul-Fitr. In addition, 48-hour election bans are enforced across assembly constituencies.",
    "transitAndPossessionRule": "Domestic possession is permitted up to 6 bottles of spirits (750ml) and 12 bottles of beer. However, transporting Haryana-duty liquor into neighboring Delhi or Uttar Pradesh is strictly restricted by those respective states to at most one bottle.",
    "penaltiesNotice": "Smuggling duty-evaded liquor into neighboring states or unlicensed retail is penalized under Section 61 of the Excise Act with stringent imprisonment and vehicle confiscation.",
    "historyAndPolicy": "After a brief, economically disruptive experiment with total prohibition in 1996-1998, Haryana reversed course to pioneer modern retail formats, corporate lounge licenses, and microbreweries in NCR cyber corridors.",
    "retailAndLicensingDetails": "Haryana retail vends (L-2) feature multi-lane walk-in superstores offering vast international wine and single-malt collections. Premium corporate licenses (L-10BF) operate inside IT parks and business parks.",
    "licenseCategories": [
      {
        "code": "L-2",
        "name": "Retail Liquor Vend",
        "description": "Modern packaged liquor store operating from 8:00 AM to 12:00 Midnight (or 24/7 in special zones)."
      },
      {
        "code": "L-4 / L-5",
        "name": "Bar & Restaurant License",
        "description": "Table service of alcohol in certified restaurants and club lounges."
      },
      {
        "code": "L-10BF",
        "name": "Commercial Corporate Retail Vend",
        "description": "High-end boutique wine and spirit store situated inside corporate IT parks."
      },
      {
        "code": "Microbrewery",
        "name": "Craft Brewing License",
        "description": "On-premise craft beer production and service inside dining lounges."
      }
    ],
    "interstateTransitGuidance": "Commuters traveling from Gurugram into Delhi are checked by Delhi Excise squads at Sirhaul toll plaza, MG Road, and Kapashera. Carrying more than one bottle across the border invites confiscation under Delhi laws.",
    "onlineDeliveryPolicy": "Doorstep home delivery is not officially operationalized for general consumer retail in Haryana, despite policy provisions for pilot exploration.",
    "districtAndCityNuances": "Gurugram and Faridabad feature round-the-clock nightlife hospitality licenses and prominent corporate lounges. In contrast, Kurukshetra enforces complete alcohol-free zones around the sacred Brahma Sarovar and Jyotisar pilgrimage sites.",
    "bespokeFaqs": [
      {
        "question": "Are liquor shops open 24/7 in Gurgaon (Gurugram)?",
        "answer": "Under the Haryana Excise Policy, designated premium retail vends and corporate lounges located in authorized commercial cyber corridors (such as Cyber City and Golf Course Road in Gurugram) are permitted to operate extended hours or 24/7 upon payment of special license fees."
      },
      {
        "question": "Why is liquor significantly cheaper in Haryana compared to Delhi?",
        "answer": "Haryana levies lower excise tax slabs and allocates vends through competitive e-auctions with flexible retail pricing, allowing retailers to offer heavy volume discounts on premium single malts and imported beers compared to Delhi's government-run MRP vends."
      },
      {
        "question": "Can I bring liquor from Gurgaon or Faridabad into Delhi?",
        "answer": "Delhi law strictly caps personal import from neighboring states at maximum one sealed 750ml bottle per person. Carrying cartons or multiple bottles across the Sirhaul toll plaza into Delhi results in vehicle seizure and prosecution by Delhi Excise squads."
      },
      {
        "question": "Is alcohol banned in Kurukshetra holy city?",
        "answer": "Yes. Commercial liquor vends and public alcohol sales are strictly prohibited within the sacred pilgrimage perimeter surrounding Brahma Sarovar, Sannehit Sarovar, and Jyotisar in Kurukshetra."
      }
    ]
  },
  "west-bengal": {
    "actName": "Bengal Excise Act, 1909 & West Bengal Excise (Foreign Liquor) Rules",
    "regulatoryAuthority": "Directorate of Excise, Finance Department, Government of West Bengal & BEVCO",
    "officialPortal": "https://excise.wb.gov.in",
    "retailModel": "BEVCO Wholesale Monopoly & Licensed Private Off/On-Shops",
    "statutorySummary": "West Bengal administers alcohol taxation and distribution through the Directorate of Excise and the West Bengal State Beverages Corporation (BEVCO). Retail stores operate as \"Off-Shops\" (packaged sales) typically from 12:00 Noon to 10:00 PM (or 10:30 PM in Kolkata), while commercial bars and hotel lounges operate as \"On-Shops\". The minimum legal drinking age in West Bengal is 21 years.",
    "standingDryDaysSummary": "Statewide statutory dry days include Republic Day (26 Jan), Independence Day (15 Aug), Gandhi Jayanti (2 Oct), and the 10th day of Durga Puja (Bijoya Dashami). Religious dry days include Muharram and Dol Jatra (Holi, up to 2:00 PM). Additional local dry days are notified during assembly and municipal elections.",
    "transitAndPossessionRule": "Personal possession within West Bengal is permitted up to 12 bottles of beer and 4 bottles of spirits per adult. Cross-border transit into dry Bihar is strictly intercepted at Asansol, Barakar, and Malda border posts.",
    "penaltiesNotice": "Unlawful manufacturing, possession, or cross-border trafficking into Bihar invites prosecution under Sections 46 and 48 of the Bengal Excise Act, 1909.",
    "historyAndPolicy": "West Bengal operates a digitally advanced excise ecosystem known as e-Abgari, which tracks every consignment from bonded warehouse to retail shelf. The state also pioneered progressive home delivery frameworks and digitized brand registration.",
    "retailAndLicensingDetails": "Retail vends are divided into Foreign Liquor Off-Shops and Country Spirit (CS) retail outlets. Kolkata features high-density heritage bars and licensed restobars across Park Street and Sector V.",
    "licenseCategories": [
      {
        "code": "FL Off-Shop",
        "name": "Retail Packaged Foreign Liquor Vend",
        "description": "Packaged off-premise sales of IMFL, beer, and imported wines (12:00 Noon – 10:00 PM)."
      },
      {
        "code": "FL On-Shop",
        "name": "Bar & Restaurant License",
        "description": "Table service of spirits and draught beer in certified dining spaces (up to 12:00 Midnight)."
      },
      {
        "code": "Late-Night Permit",
        "name": "Extended Hospitality License",
        "description": "Special license allowing luxury hotel bars in Kolkata to serve until 2:00 AM / 4:00 AM."
      },
      {
        "code": "CS Shop",
        "name": "Country Spirit Retail Shop",
        "description": "Exclusive licensed retail counters for traditional country spirits."
      }
    ],
    "interstateTransitGuidance": "West Bengal shares sensitive borders with dry Bihar and Jharkhand. Checkposts along the Grand Trunk Road and railway stations (Asansol, Siliguri) strictly monitor outbound luggage to prevent bootlegging into dry Bihar.",
    "onlineDeliveryPolicy": "West Bengal is one of the few Indian states with an official framework for e-retail and home delivery via registered retail stores under the e-Abgari portal, subject to local municipal orders and verification.",
    "districtAndCityNuances": "Kolkata and Salt Lake feature historic colonial pub culture and late-night nightlife extensions in star hospitality hubs. Darjeeling and hill subdivisions operate tourism-friendly hotel lounges with winter seasonal timings.",
    "bespokeFaqs": [
      {
        "question": "Is online home delivery of liquor legal in Kolkata?",
        "answer": "Yes. West Bengal is one of the few Indian states with an official regulatory framework for e-retail and doorstep delivery under the Directorate of Excise's e-Abgari portal, enabling licensed local retail off-shops to fulfill digital orders within municipal wards."
      },
      {
        "question": "Are bars and restaurants in Kolkata open late night during Durga Puja and New Year?",
        "answer": "Yes. During Durga Puja carnival celebrations and New Year festivities, the West Bengal government routinely issues special notifications allowing licensed hotel bars and restobars in Kolkata to operate until 2:00 AM or 4:00 AM."
      },
      {
        "question": "Is Bijoya Dashami (Dussehra) a dry day across West Bengal?",
        "answer": "Yes. The 10th day of Durga Puja (Bijoya Dashami) is an official state dry day across West Bengal, and all retail off-shops remain closed during idol immersion ceremonies."
      },
      {
        "question": "Can you take liquor purchased in West Bengal across the border into Bihar?",
        "answer": "No. Bihar enforces complete statutory prohibition. Transporting even a single bottle of alcohol across the border via Asansol, Barakar, or Malda is treated as criminal bootlegging, resulting in immediate arrest and vehicle confiscation."
      }
    ]
  },
  "goa": {
    "actName": "Goa Excise Duty Act, 1964 & Goa Excise Duty Rules, 1964",
    "regulatoryAuthority": "Commissioner of Excise, Government of Goa",
    "officialPortal": "https://goaexcise.gov.in",
    "retailModel": "Private Competitive Retail & Iconic Beach Shack Licenses",
    "statutorySummary": "Goa regulates alcohol production, taxation, and consumption under the Goa Excise Duty Act, 1964. Renowned for its low excise duty structure and vibrant tourism economy, Goa boasts over 10,000 retail, bar, and beach shack licenses. Retail wine stores typically operate from 9:00 AM to 11:00 PM, while tourist beach shacks and nightlife clubs operate until 1:00 AM or later during peak season. The statutory minimum legal drinking age in Goa is 18 years.",
    "standingDryDaysSummary": "Standing mandatory dry days in Goa include Republic Day (26 Jan), Independence Day (15 Aug), and Gandhi Jayanti (2 Oct). Statewide election polling days and counting days observe strict 48-hour dry curfews. Local temple and church feasts rarely require full dry days.",
    "transitAndPossessionRule": "Under Goa state law, tourists may carry up to 2 bottles (750ml each) of IMFL or country liquor out of Goa only if they obtain an official Goa Excise Transit Permit (costing ~₹20-50). However, carrying this liquor into Maharashtra or Karnataka violates their respective state excise laws, where border checkposts routinely confiscate bottles.",
    "penaltiesNotice": "Unlawful manufacture, evasion of export duties, or carrying liquor outside Goa without a permit is penalized under Section 31 of the Goa Excise Duty Act, 1964.",
    "historyAndPolicy": "Inherited from Portuguese colonial administration, Goa retains a liberal commercial culture where Feni (distilled from cashew apples and coconut toddy) is protected as a heritage drink with GI (Geographical Indication) status.",
    "retailAndLicensingDetails": "Liquor retail in Goa is entirely private and competitive, featuring specialty wine supermarkets, neighborhood tavernas, and beachside shacks. Margins are competitive, and shelf prices are among the lowest in India.",
    "licenseCategories": [
      {
        "code": "Retail Sale",
        "name": "Packaged Liquor Store",
        "description": "Off-premise sales of spirits, wine, and beer (9:00 AM – 11:00 PM)."
      },
      {
        "code": "Bar & Restaurant",
        "name": "Dining & Beach Shack License",
        "description": "Table service of food and alcoholic beverages in beachfront and urban restaurants."
      },
      {
        "code": "Feni Distillation",
        "name": "Heritage Country Liquor License",
        "description": "Traditional cottage distillation and sale of Cashew and Coconut Feni."
      },
      {
        "code": "Wholesale Depot",
        "name": "Commercial Distribution License",
        "description": "Depot warehousing and distribution of domestic and imported brands."
      }
    ],
    "interstateTransitGuidance": "Border check-posts on highways leading to Maharashtra (Patradevi, Banda, Dodamarg) and Karnataka (Majali, Chorla Ghat) inspect outbound buses, taxis, and private cars. Carrying liquor into Maharashtra or Karnataka without destination state permits is illegal under their laws, regardless of a Goa transit permit.",
    "onlineDeliveryPolicy": "Home delivery of alcohol by food apps or e-commerce is not permitted in Goa. In-person physical purchase at authorized shops is legally required.",
    "districtAndCityNuances": "North Goa beach coastal belts (Calangute, Candolim, Anjuna, Morjim) feature active beach shack licensing and late-night nightlife. South Goa (Margao, Colva, Palolem) maintains a more tranquil atmosphere with strictly enforced 11:00 PM residential closing times.",
    "bespokeFaqs": [
      {
        "question": "Can I legally carry 2 bottles of alcohol out of Goa?",
        "answer": "Under Goa state law, tourists may purchase an official Goa Excise Transit Permit (costing ~₹20–₹50) to export up to 2 bottles (750ml each). However, this permit is only recognized if your destination state allows import. Neighboring Maharashtra and Karnataka strictly ban importing Goa liquor, and their highway checkposts at Banda and Majali routinely confiscate bottles."
      },
      {
        "question": "Is drinking alcohol allowed on beaches in Goa?",
        "answer": "No. Drinking alcohol in public spaces, open beaches, and public roads is strictly prohibited under the Goa Tourist Places (Protection and Maintenance) Act, punishable with spot fines up to ₹2,000–₹10,000. Alcohol consumption is only legal inside licensed beach shacks, restobars, and private resort premises."
      },
      {
        "question": "What are the operating hours for beach shacks and clubs in Goa?",
        "answer": "Licensed beach shacks and coastal nightlife venues in North Goa (Calangute, Baga, Anjuna, Morjim) are permitted to serve food and alcoholic beverages until 1:00 AM or later during the peak tourist season."
      },
      {
        "question": "What is Feni, and what is its legal status in Goa?",
        "answer": "Feni is Goa's traditional heritage spirit distilled from cashew apples or coconut toddy. It holds official Geographical Indication (GI) status and is classified as a 'Heritage Liquor' under the Goa Excise Duty Act, exempt from standard foreign liquor tax restrictions."
      },
      {
        "question": "What is the legal drinking age in Goa?",
        "answer": "The statutory minimum legal drinking age in Goa is 18 years, which is the lowest in India alongside Rajasthan and Puducherry."
      }
    ]
  },
  "telangana": {
    "actName": "Telangana Excise Act, 1968 & Telangana Liquor Retail Rules",
    "regulatoryAuthority": "Prohibition & Excise Department, Government of Telangana & TSBCL",
    "officialPortal": "https://excise.telangana.gov.in",
    "retailModel": "TSBCL Wholesale Monopoly & Biennial Licensed A4 Wine Shops",
    "statutorySummary": "Telangana administers alcohol production and retail via the Prohibition & Excise Department and Telangana State Beverages Corporation Limited (TSBCL). Retail A4 wine shops are allocated every two years through a transparent online lottery. In the Greater Hyderabad Municipal Corporation (GHMC) area, retail wine shops operate from 10:00 AM to 11:00 PM, while in other districts they close at 10:00 PM. The minimum legal drinking age in Telangana is 21 years.",
    "standingDryDaysSummary": "Mandatory dry days in Telangana include Republic Day (26 Jan), Independence Day (15 Aug), Gandhi Jayanti (2 Oct), and Mahatma Gandhi Martyrdom Day (30 Jan). Religious dry days include Mahavir Jayanti, Good Friday, Eid-ul-Fitr, Muharram, and Milad-un-Nabi.",
    "transitAndPossessionRule": "An individual can legally possess up to 6 bottles of beer (650ml each) and 2 litres of foreign liquor/spirits for domestic consumption. Transit from neighboring states without TSBCL authorization is prohibited.",
    "penaltiesNotice": "Bootlegging, illicit distillation, or non-duty transit invites prosecution under Section 34 of the Telangana Excise Act, 1968, with mandatory prison sentences and vehicle seizure.",
    "historyAndPolicy": "Following the bifurcation of Andhra Pradesh in 2014, Telangana developed an independent excise revenue powerhouse. Hyderabad emerged as a booming tech nightlife hub with progressive microbrewery regulations and extended urban operating windows.",
    "retailAndLicensingDetails": "A4 retail shops are auctioned via high-volume lottery draws. The state also licenses microbreweries, 2B bars, and specialized airport duty-free and corporate lounge outlets.",
    "licenseCategories": [
      {
        "code": "A4",
        "name": "Retail Wine Shop",
        "description": "Packaged off-premise sales of IMFL, imported liquor, and beer (10:00 AM – 11:00 PM in GHMC)."
      },
      {
        "code": "2B",
        "name": "Commercial Bar & Restaurant",
        "description": "Table service of alcohol in certified urban dining establishments (up to 12:00 Midnight / 1:00 AM weekends)."
      },
      {
        "code": "Microbrewery",
        "name": "Craft Brewing License",
        "description": "On-premise brewing and dispensing of fresh craft beer in Hyderabad metro areas."
      },
      {
        "code": "TD-1",
        "name": "Toddy Tappers Cooperative Society",
        "description": "Licensed distribution counters for traditional freshly tapped palm toddy."
      }
    ],
    "interstateTransitGuidance": "Excise check-posts monitor highways connecting Telangana with Karnataka (Zahirabad) and Andhra Pradesh (Garikapadu). Un-manifested commercial carriage across borders is strictly penalized.",
    "onlineDeliveryPolicy": "Online liquor delivery is prohibited across Telangana. All alcohol sales must take place over the counter at authorized A4 shops or inside licensed 2B bars.",
    "districtAndCityNuances": "Hyderabad (GHMC zone) permits retail vends to stay open until 11:00 PM and restobars until 1:00 AM on weekends. Rural districts (Nalgonda, Warangal, Karimnagar) enforce strict 10:00 PM retail closures.",
    "bespokeFaqs": [
      {
        "question": "What are the wine shop timings in Hyderabad compared to rural Telangana?",
        "answer": "In the Greater Hyderabad Municipal Corporation (GHMC) area, licensed A4 wine shops operate from 10:00 AM to 11:00 PM. In rural and non-GHMC district towns, shops are mandated to close earlier at 10:00 PM."
      },
      {
        "question": "Do Hyderabad pubs and microbreweries stay open until 1:00 AM on weekends?",
        "answer": "Yes. Commercial restobars and craft microbreweries in Hyderabad holding 2B licenses are permitted to operate until 12:00 Midnight on weekdays and until 1:00 AM on Friday and Saturday nights."
      },
      {
        "question": "Can you order alcohol online or through apps in Hyderabad?",
        "answer": "No. Online liquor ordering and doorstep delivery apps are completely illegal in Telangana. Counter sales at licensed A4 retail vends are legally required."
      },
      {
        "question": "What is the domestic possession limit for alcohol in Telangana?",
        "answer": "An adult can legally possess up to 6 bottles of beer (650ml each) and 2 litres of Indian Made Foreign Liquor (IMFL) or imported spirits for domestic personal consumption."
      }
    ]
  },
  "tamil-nadu": {
    "actName": "Tamil Nadu Prohibition Act, 1937 & TASMAC Retail Vending Rules, 2003",
    "regulatoryAuthority": "Tamil Nadu State Marketing Corporation (TASMAC), Government of Tamil Nadu",
    "officialPortal": "https://tasmac.co.in",
    "retailModel": "100% State Corporation Retail Monopoly (TASMAC)",
    "statutorySummary": "In Tamil Nadu, the wholesale procurement and retail distribution of alcohol is entirely monopolized by the state-run Tamil Nadu State Marketing Corporation (TASMAC). Private retail wine stores and independent thekas are completely illegal. All ~4,800 TASMAC retail shops operate strictly between 12:00 PM (Noon) and 10:00 PM across all 38 districts. The minimum legal drinking age in Tamil Nadu is 21 years.",
    "standingDryDaysSummary": "Tamil Nadu enforces complete statewide dry-day closures on Gandhi Jayanti (2 Oct), Tiruvalluvar Day (16 Jan), Mahavir Jayanti, Nabigal Nayagam (Milad-un-Nabi), Vaikunda Ekadasi, Republic Day (26 Jan), and Independence Day (15 Aug). Strict 48-hour dry curfews apply during assembly and parliamentary elections.",
    "transitAndPossessionRule": "Importing liquor from outside Tamil Nadu (especially cheap duty-free alcohol from neighboring Puducherry) is strictly prohibited. Carrying non-TASMAC duty liquor into Tamil Nadu results in immediate vehicle impoundment and criminal booking under the Prohibition Act.",
    "penaltiesNotice": "Offences involving bootlegging or smuggling liquor into Tamil Nadu are prosecuted under Section 4(1) of the Tamil Nadu Prohibition Act, 1937, carrying non-bailable arrest and asset forfeiture.",
    "historyAndPolicy": "Tamil Nadu enacted total prohibition under C. Rajagopalachari in 1937. While policy oscillated between dry and wet regimes, the state established a complete government retail monopoly through TASMAC in 2003 under Section 17C, ending private cartels.",
    "retailAndLicensingDetails": "TASMAC operates standardized government counter shops across urban and rural wards. In addition, \"TASMAC Elite\" air-conditioned walk-in shops operate inside shopping malls in Chennai, Coimbatore, and Madurai to cater to premium buyers.",
    "licenseCategories": [
      {
        "code": "TASMAC Vend",
        "name": "Government Retail Shop",
        "description": "Standard packaged state-run counter shop (12:00 Noon – 10:00 PM)."
      },
      {
        "code": "TASMAC Elite",
        "name": "Premium Air-Conditioned Walk-in Shop",
        "description": "Mall-based retail stores stocking premium foreign and imported brands."
      },
      {
        "code": "FL-2 / FL-3",
        "name": "Star Hotel & Club Bar License",
        "description": "Licensed table service restricted to recognized star hotels and private clubs."
      },
      {
        "code": "FL-11",
        "name": "Commercial Tourism Bar",
        "description": "Designated tourism hospitality licenses in certified resort locations."
      }
    ],
    "interstateTransitGuidance": "Intensive round-the-clock check-posts operate along the Puducherry border (Kanagachettikulam, Gorimedu, Villianur) and Karnataka border (Hosur). Police flying squads use sniffer dogs and vehicle checks to confiscate Pondicherry-labeled bottles.",
    "onlineDeliveryPolicy": "Home delivery of liquor is strictly illegal in Tamil Nadu. Online apps are banned from selling or transporting alcoholic beverages.",
    "districtAndCityNuances": "Temple cities (Madurai, Rameswaram, Palani) enforce buffer zones where TASMAC outlets are prohibited within 50-100 meters of religious places and educational institutions. Chennai has the highest density of Elite TASMAC outlets.",
    "bespokeFaqs": [
      {
        "question": "Why is TASMAC the only place to buy alcohol in Tamil Nadu?",
        "answer": "Under Section 17C of the Tamil Nadu Prohibition Act, 1937, the state government holds an absolute monopoly over wholesale procurement and retail distribution of alcohol through the Tamil Nadu State Marketing Corporation (TASMAC). Private retail liquor stores are completely banned."
      },
      {
        "question": "Why do TASMAC wine shops open only at 12:00 PM (Noon)?",
        "answer": "All ~4,800 TASMAC retail shops follow a strict standardized operating window: 12:00 PM (Noon) to 10:00 PM. Morning sales are barred by state policy to prevent early commercial alcohol consumption."
      },
      {
        "question": "What are TASMAC Elite shops?",
        "answer": "TASMAC Elite stores are air-conditioned, walk-in boutique shops located inside shopping malls in Chennai, Coimbatore, and Madurai that stock premium imported wines, single malts, and international beer brands."
      },
      {
        "question": "Can I bring cheaper alcohol from Puducherry into Tamil Nadu?",
        "answer": "No. Tamil Nadu Police and TASMAC enforcement squads operate round-the-clock checkposts at all Puducherry borders (Kanagachettikulam, Gorimedu). Transporting duty-unpaid Puducherry liquor into TN is a non-bailable offence carrying vehicle impoundment and prison terms."
      }
    ]
  },
  "kerala": {
    "actName": "Kerala Abkari Act (1 of 1077) & Foreign Liquor Rules, 1953",
    "regulatoryAuthority": "Excise Department, Government of Kerala & KSBC (BEVCO)",
    "officialPortal": "https://keralaexcise.gov.in",
    "retailModel": "100% State Corporation Retail (BEVCO & Consumerfed) + Toddy Shops",
    "statutorySummary": "Kerala manages alcohol distribution through the state-owned Kerala State Beverages Corporation (KSBC / BEVCO) and Consumerfed. Private retail liquor shops are prohibited. Standard retail outlets operate between 10:00 AM and 9:00 PM. Uniquely, the 1st of every calendar month is a mandatory statutory dry day (\"Pay Day Rule\") across the entire state. The legal drinking age in Kerala is 23 years under the Abkari Act.",
    "standingDryDaysSummary": "Kerala observes mandatory dry days on the 1st of every calendar month (Pay Day), Republic Day (26 Jan), Independence Day (15 Aug), Gandhi Jayanti (2 Oct), Sree Narayana Guru Samadhi Day (21 Sept), and Sree Narayana Guru Jayanti. Bar service is also barred on voting and counting days.",
    "transitAndPossessionRule": "An individual can possess up to 3 litres of foreign liquor, 7.8 litres of beer, and 2.5 litres of toddy with proof of BEVCO purchase. Bringing alcohol from Mahe (Puducherry enclave), Goa, or Tamil Nadu without paying Kerala excise duty is strictly barred.",
    "penaltiesNotice": "Offences under the Kerala Abkari Act carry severe penalties, including non-bailable arrest under Section 55 and rigorous imprisonment for up to 10 years for smuggling spurious or duty-evaded liquor.",
    "historyAndPolicy": "Kerala’s excise policy has oscillated between prohibitionist reforms and revenue pragmatism. The 2014 policy closed hundreds of non-standard bars, restricting bar licenses strictly to 3-star, 4-star, and 5-star hotels, alongside licensed beer and wine parlours.",
    "retailAndLicensingDetails": "BEVCO operates over 300 walk-in supermarkets and queue-counter vends. Traditional palm toddy is tapped and sold through licensed Toddy Shops (TS), preserving a historic indigenous trade.",
    "licenseCategories": [
      {
        "code": "FL-1",
        "name": "BEVCO / Consumerfed Retail Outlet",
        "description": "State-run packaged retail shop (10:00 AM – 9:00 PM)."
      },
      {
        "code": "FL-3",
        "name": "Star Hotel Bar License",
        "description": "Full liquor service restricted to verified 3-star, 4-star, and 5-star hotels (11:00 AM – 11:00 PM)."
      },
      {
        "code": "FL-11",
        "name": "Beer & Wine Parlour",
        "description": "Commercial parlour license permitting the service of mild and strong beer and wine."
      },
      {
        "code": "TS",
        "name": "Licensed Toddy Shop",
        "description": "Traditional rural and coastal outlets selling fresh indigenous fermented palm toddy."
      }
    ],
    "interstateTransitGuidance": "Excise check-posts at Walayar (Tamil Nadu border) and Thalapady / Kasaragod (Karnataka border) conduct systematic vehicle inspections. Mahe enclave borders are especially monitored to stop cheaper UT liquor inflows into Kannur and Kozhikode.",
    "onlineDeliveryPolicy": "Doorstep home delivery is prohibited. BEVCO operates an online queue token system (BevQ during special circumstances), but customer pick-up in person is mandatory.",
    "districtAndCityNuances": "Pilgrimage zones surrounding Sabarimala (Pathanamthitta district) and Guruvayur observe local alcohol-free restrictions during temple festivals. Kochi and Thiruvananthapuram feature high-end star hotel lounges.",
    "bespokeFaqs": [
      {
        "question": "Why is the 1st of every month a dry day in Kerala?",
        "answer": "Known as the \"Pay Day Rule\", Kerala enforces a statutory dry day on the first calendar day of every month across the state to protect household wages and prevent immediate alcohol spending on salary days."
      },
      {
        "question": "Why is the legal drinking age 23 in Kerala?",
        "answer": "Under the Kerala Abkari Act, the minimum legal drinking age is 23 years, making it one of the strictest age thresholds in India, enacted to curb alcohol abuse among college students."
      },
      {
        "question": "Where can you buy alcohol in Kerala?",
        "answer": "Alcohol is available only through government-run retail outlets operated by the Kerala State Beverages Corporation (BEVCO) and Consumerfed, or consumed on-premise at certified star hotels (3-star, 4-star, and 5-star) holding FL-3 bar licenses."
      },
      {
        "question": "Are traditional Toddy Shops open on dry days in Kerala?",
        "answer": "No. Licensed Toddy Shops (TS) that tap and sell fresh coconut and palm toddy must remain completely shut on all official dry days, including the 1st of every month."
      }
    ]
  },
  "bihar": {
    "actName": "Bihar Prohibition and Excise Act, 2016 (as amended 2022)",
    "regulatoryAuthority": "Excise, Prohibition and Registration Department, Government of Bihar",
    "officialPortal": "https://state.bihar.gov.in/prohibition",
    "retailModel": "100% Total Statewide Statutory Prohibition (Sharab-Bandi)",
    "statutorySummary": "Bihar is under complete statewide statutory alcohol prohibition enacted on 5 April 2016. The manufacture, bottling, distribution, transportation, sale, purchase, possession, and consumption of all forms of alcoholic beverages (including beer, wine, IMFL, and country liquor) are strictly prohibited and criminalized. All retail vends, bars, and commercial licenses stand permanently abolished. There is no legal drinking age; alcohol is illegal for all individuals.",
    "standingDryDaysSummary": "Because total statutory prohibition is enforced 365 days a year, every single calendar day is a mandatory dry day across all 38 districts of Bihar.",
    "transitAndPossessionRule": "Zero tolerance. Carrying even a single bottle of alcohol across the border into Bihar from Uttar Pradesh, Jharkhand, West Bengal, or Nepal is a criminal offence. Police and excise flying squads deploy breathalyzers, vehicle scanners, and sniffer dogs at all state entry points.",
    "penaltiesNotice": "Violations are prosecuted under the Bihar Prohibition and Excise Act, 2016. First-time consumption carries a compoundable fine of ₹2,000–₹5,000 (or mandatory simple imprisonment), while repeat offenders, commercial bootleggers, and transporters face non-bailable arrest, minimum 5–10 years imprisonment, and mandatory vehicle confiscation.",
    "historyAndPolicy": "Enacted under Chief Minister Nitish Kumar in 2016 following a grassroots anti-liquor movement by rural women, the prohibition act represents the strictest temperance legislation in contemporary India. Subsequent amendments in 2022 provided compoundable fines for first-time casual drinkers to ease judicial caseloads.",
    "retailAndLicensingDetails": "No commercial retail or hospitality liquor licenses exist in Bihar. Industrial alcohol manufacturing units are heavily audited, and molasses tanks are monitored with 24/7 CCTV surveillance and digital flowmeters.",
    "licenseCategories": [
      {
        "code": "N/A",
        "name": "Total Statutory Prohibition",
        "description": "All commercial retail, bar, and hospitality liquor licenses are abolished and null statewide."
      },
      {
        "code": "Industrial Permit",
        "name": "Denatured Industrial Alcohol Only",
        "description": "Heavily audited non-potable chemical and pharmaceutical manufacturing licenses."
      }
    ],
    "interstateTransitGuidance": "All border entry corridors (Buxar, Gopalganj, Chhapra from UP; Gaya, Rajauli from Jharkhand; Asansol/Durgapur route from West Bengal) feature permanent multi-agency checkpoints. Carrying duty-paid alcohol through Bihar—even in sealed luggage inside private vehicles or long-distance trains—is completely illegal and results in vehicle impoundment and arrest.",
    "onlineDeliveryPolicy": "Online liquor delivery is non-existent and completely illegal. Any advertisement or platform claiming to deliver alcohol in Bihar is fraudulent.",
    "districtAndCityNuances": "Statewide drone surveillance and riverine patrol boats on the Ganga, Gandak, and Son rivers target smuggling routes. Urban centers (Patna, Gaya, Muzaffarpur) operate specialized de-addiction centers.",
    "bespokeFaqs": [
      {
        "question": "Is alcohol completely banned in Bihar?",
        "answer": "Yes. Bihar enforces complete statewide statutory prohibition under the Bihar Prohibition and Excise Act, 2016. The manufacture, transport, storage, sale, purchase, possession, and consumption of all forms of alcohol are criminalized."
      },
      {
        "question": "What happens if you are caught with alcohol at Patna airport or railway station?",
        "answer": "All baggage arriving at Patna airport and major railway stations is screened by police and excise teams using X-ray scanners and breathalyzers. Carrying alcohol results in immediate FIR registration, non-bailable arrest, and seizure of luggage."
      },
      {
        "question": "Can transit train passengers carry alcohol while traveling through Bihar?",
        "answer": "No. Even if you boarded a long-distance train in Delhi or West Bengal with legally purchased duty-paid alcohol, carrying it through Bihar territorial territory constitutes illegal transit and invites arrest during RPF and excise train inspections."
      },
      {
        "question": "What is the penalty for a first-time alcohol consumption offence in Bihar?",
        "answer": "Under the 2022 amendments to the Bihar Prohibition Act, a first-time casual drinker can be released upon paying a compoundable penalty of ₹2,000–₹5,000 before an Executive Magistrate; repeat offenders or failure to pay results in mandatory imprisonment."
      }
    ]
  },
  "gujarat": {
    "actName": "Gujarat Prohibition Act, 1949 (formerly Bombay Prohibition Act, 1949)",
    "regulatoryAuthority": "Directorate of Prohibition and Excise, Government of Gujarat",
    "officialPortal": "https://eps.gujaratexcise.gujarat.gov.in",
    "retailModel": "Statutory Prohibition with Certified Tourist & Health Permits",
    "statutorySummary": "Gujarat has enforced statutory prohibition since its formation as a tribute to Mahatma Gandhi. However, unlike Bihar, Gujarat incorporates a sophisticated legal permit mechanism. Domestic tourists from other states, international travelers, and resident medical permit holders can legally purchase and consume alcohol through ~70 authorized hotel wine counters located inside certified 4-star and 5-star hotels across the state.",
    "standingDryDaysSummary": "Public commercial retail is permanently closed. While permit counters inside star hotels operate during designated hours, they observe mandatory closures on national dry days: Republic Day (26 Jan), Independence Day (15 Aug), and Gandhi Jayanti (2 Oct).",
    "transitAndPossessionRule": "Possessing alcohol without a valid digital Gujarat excise permit is illegal. Domestic tourists can apply online for a 30-day Tourist Liquor Permit (Form E) upon presenting travel tickets and proof of residence outside Gujarat. Each permit allows purchase of up to 4 units of liquor per calendar month.",
    "penaltiesNotice": "Unlawful possession, transport, or consumption without a permit is punishable under Section 65 and 66 of the Gujarat Prohibition Act, with imprisonment of up to 3 years and heavy fines.",
    "historyAndPolicy": "Gujarat has maintained temperance policies since 1960. In December 2023, Gujarat introduced a major regulatory landmark by exempting the Gujarat International Finance Tec-City (GIFT City) in Gandhinagar, allowing authorized employees and visitors to consume alcohol in designated food and beverage areas.",
    "retailAndLicensingDetails": "Permit stores operate exclusively inside high-end certified hotels (e.g. in Ahmedabad, Vadodara, Surat, Rajkot, Gandhinagar). Transactions require biometric/photo-ID verification, physical permit stamps, and digital ledger entries.",
    "licenseCategories": [
      {
        "code": "Tourist Permit",
        "name": "Domestic Visitor E-Permit (Form E)",
        "description": "30-day digital permit issued to non-Gujarat domestic tourists via state portal."
      },
      {
        "code": "Visitor Permit",
        "name": "International Traveler Liquor Permit",
        "description": "Digital permit for foreign passport holders upon arrival in Gujarat."
      },
      {
        "code": "Health Permit",
        "name": "Resident Medical Permit",
        "description": "Permit granted to permanent Gujarat residents above 40 years on medical grounds."
      },
      {
        "code": "GIFT City Liquor Access",
        "name": "GIFT SEZ Hospitality Exemption",
        "description": "Special authorized consumption card for certified employees and guests in GIFT City."
      }
    ],
    "interstateTransitGuidance": "Check-posts along the Rajasthan border (Ratanpur, Abu Road) and Daman/Diu borders (Vapi, Bhilad, Una) conduct thorough vehicle screenings. Carrying duty-unpaid liquor from Daman or Rajasthan into Gujarat without an approved transit permit constitutes bootlegging.",
    "onlineDeliveryPolicy": "Home delivery of alcohol is strictly illegal throughout Gujarat. All permit purchases must be made in person at certified star hotel counters.",
    "districtAndCityNuances": "GIFT City in Gandhinagar operates under special 2023 regulations permitting wine and dine facilities for authorized professionals. Daman and Diu border towns (Vapi, Valsad) experience heavy check-post surveillance.",
    "bespokeFaqs": [
      {
        "question": "How can a domestic tourist get a liquor permit in Gujarat?",
        "answer": "Domestic tourists from other Indian states can apply online via the official Gujarat Excise portal (eps.gujaratexcise.gujarat.gov.in) for a 30-day Tourist Liquor Permit (Form E) by uploading valid travel tickets and proof of out-of-state residence."
      },
      {
        "question": "Can you drink alcohol in GIFT City Gandhinagar?",
        "answer": "Yes. In December 2023, Gujarat introduced a special regulatory exemption allowing certified employees and authorized official visitors to consume alcohol in designated food and beverage areas within the GIFT City financial zone."
      },
      {
        "question": "Where can permit holders buy alcohol in Gujarat?",
        "answer": "Alcohol can only be purchased at approximately 70 authorized hotel wine shops located inside certified 4-star and 5-star hotels in cities like Ahmedabad, Vadodara, Surat, and Rajkot upon in-person biometric and permit verification."
      },
      {
        "question": "Can I bring my own alcohol into Gujarat if I hold an e-permit?",
        "answer": "No. An e-permit only authorizes purchase from licensed hotel counters located within Gujarat. Transporting alcohol across state borders from Rajasthan, Daman, or Maharashtra remains illegal bootlegging."
      }
    ]
  },
  "nagaland": {
    "actName": "Nagaland Liquor Total Prohibition (NLTP) Act, 1989",
    "regulatoryAuthority": "Department of Excise and Prohibition, Government of Nagaland",
    "officialPortal": "https://excise.nagaland.gov.in",
    "retailModel": "100% Total Statutory Prohibition (NLTP)",
    "statutorySummary": "Nagaland enforces statewide statutory prohibition under the Nagaland Liquor Total Prohibition (NLTP) Act, 1989. Enacted following decades of advocacy by the Nagaland Baptist Church Council (NBCC) and women’s organizations, the act outlaws the import, transport, manufacture, sale, purchase, and possession of alcoholic beverages throughout the state.",
    "standingDryDaysSummary": "Every day of the year is a mandatory dry day across all districts of Nagaland under the NLTP Act.",
    "transitAndPossessionRule": "All commercial liquor possession and transit are prohibited. Limited exceptions apply solely to military messes, paramilitary establishments, and civil medical permits issued under certified medical conditions.",
    "penaltiesNotice": "Offences are prosecuted under Sections 44 and 45 of the NLTP Act, 1989, carrying rigorous imprisonment of up to 3 years and heavy fines.",
    "historyAndPolicy": "While the NLTP Act has been in force for over 35 years, ongoing policy discussions between the state government, civic bodies, and church organizations continue to examine health impacts and revenue losses along the Assam border.",
    "retailAndLicensingDetails": "No public retail wine stores, thekas, or commercial bars exist in Nagaland. Traditional non-commercial indigenous rice brews prepared for tribal household festivals are customary.",
    "licenseCategories": [
      {
        "code": "N/A",
        "name": "Total Prohibition (NLTP)",
        "description": "Commercial retail and hospitality alcohol licenses are barred statewide."
      },
      {
        "code": "Defense Permit",
        "name": "Cantonment Mess Permit Only",
        "description": "Authorized mess supplies for armed forces personnel within base areas."
      }
    ],
    "interstateTransitGuidance": "Major check-posts between Assam and Nagaland (New Field check-post and Dillai gate near Dimapur) monitor commercial vehicular traffic. Transporting liquor from Assam into Nagaland is illegal.",
    "onlineDeliveryPolicy": "Online liquor sales and app delivery are completely prohibited.",
    "districtAndCityNuances": "Dimapur, as the commercial gateway of Nagaland, experiences the highest enforcement activity. Kohima and interior districts (Mokokchung, Mon) observe strict community-assisted prohibition enforcement.",
    "bespokeFaqs": [
      {
        "question": "Is alcohol completely illegal in Nagaland under the NLTP Act?",
        "answer": "Yes. Nagaland enforces statewide statutory prohibition under the Nagaland Liquor Total Prohibition (NLTP) Act, 1989. Commercial retail stores, vends, and public bars are prohibited across all districts."
      },
      {
        "question": "Are there any exemptions under the NLTP Act in Nagaland?",
        "answer": "Strict statutory exemptions apply solely to armed forces cantonment messes, paramilitary establishments, and civil medical permits issued under verified health conditions by a civil medical board."
      },
      {
        "question": "Can tourists bring alcohol into Nagaland?",
        "answer": "No. Police and excise checkposts at Dimapur and Assam border gates screen incoming vehicles, and carrying commercial liquor into Nagaland is penalized with fines and imprisonment."
      }
    ]
  },
  "mizoram": {
    "actName": "Mizoram Liquor (Prohibition) Act, 2019",
    "regulatoryAuthority": "Excise & Narcotics Department, Government of Mizoram",
    "officialPortal": "https://excise.mizoram.gov.in",
    "retailModel": "Statutory Prohibition with Strict Medical & Defense Exemptions",
    "statutorySummary": "Mizoram enforces prohibition under the Mizoram Liquor (Prohibition) Act, 2019, which repealed the short-lived 2014 regulatory framework. The sale, purchase, possession, and consumption of alcohol are illegal across the state, supported strongly by church organizations and civil society groups such as the Central Young Mizo Association (CYMA).",
    "standingDryDaysSummary": "Every calendar day is a statutory dry day across all 11 districts of Mizoram.",
    "transitAndPossessionRule": "Carrying alcohol into Mizoram is prohibited. Strict exceptions apply only to defense canteens and certified medical prescriptions approved by the Excise & Narcotics Commissioner.",
    "penaltiesNotice": "Violations are penalized under the 2019 Act with imprisonment of up to 5 years and fines of up to ₹1,00,000.",
    "historyAndPolicy": "Mizoram originally enacted total prohibition under the MLPC Act in 1997. After replacing it with a regulated license system in 2014, public debate on health and road safety led the state legislature to return to prohibition in 2019.",
    "retailAndLicensingDetails": "No commercial wine shops or bar licenses operate in the state.",
    "licenseCategories": [
      {
        "code": "N/A",
        "name": "State Prohibition",
        "description": "Commercial retail and restobar liquor licenses are completely banned."
      },
      {
        "code": "Medical Permit",
        "name": "Civil Surgeon Health Exemption",
        "description": "Strict prescription permits issued on verified medical grounds."
      }
    ],
    "interstateTransitGuidance": "Excise check-posts along the Assam border (Vairengte) and Tripura border (Kanhmun) inspect vehicles to intercept illicit inflows.",
    "onlineDeliveryPolicy": "Online liquor delivery is completely prohibited.",
    "districtAndCityNuances": "Local community volunteers (CYMA) actively support state excise and narcotics squads across Aizawl, Lunglei, and Champhai to prevent bootlegging.",
    "bespokeFaqs": [
      {
        "question": "Is alcohol banned in Mizoram?",
        "answer": "Yes. Mizoram enforces total prohibition under the Mizoram Liquor (Prohibition) Act, 2019, which repealed the previous regulatory regime with strong backing from church organizations and civil society."
      },
      {
        "question": "Are there any commercial wine shops in Aizawl?",
        "answer": "No. Commercial retail thekas and public bars do not operate anywhere in Mizoram; public sales are completely prohibited."
      },
      {
        "question": "What is the penalty for illegal alcohol possession in Mizoram?",
        "answer": "Under the Mizoram Liquor (Prohibition) Act, 2019, unlawful possession, transport, or sale of alcohol carries rigorous imprisonment of up to 5 years and heavy fines of up to ₹1,00,000."
      }
    ]
  },
  "lakshadweep": {
    "actName": "Lakshadweep Prohibition Regulation, 1979",
    "regulatoryAuthority": "Department of Excise, Union Territory of Lakshadweep Administration",
    "officialPortal": "https://lakshadweep.gov.in",
    "retailModel": "Island Prohibition with Exclusive Bangaram Tourist Resort Exemption",
    "statutorySummary": "Lakshadweep enforces total statutory prohibition across all 10 of its inhabited islands (including Kavaratti, Agatti, Amini, Andrott, and Minicoy) under the Lakshadweep Prohibition Regulation, 1979, respecting local cultural traditions. However, the uninhabited island resort of Bangaram operates an exclusive tourist bar license catering to visiting domestic and international travelers.",
    "standingDryDaysSummary": "All inhabited islands observe permanent dry days 365 days a year. The licensed resort bar on Bangaram island observes mandatory closures on national dry days (26 Jan, 15 Aug, 2 Oct).",
    "transitAndPossessionRule": "Carrying alcohol to any inhabited island in Lakshadweep is completely illegal. Passenger baggage arriving via flights at Agatti Airport or passenger ships from Kochi is screened at arrival terminals.",
    "penaltiesNotice": "Illegal possession or transport is punishable under the Lakshadweep Prohibition Regulation, 1979, with imprisonment and immediate seizure.",
    "historyAndPolicy": "Administered under special constitutional protections for tribal and island populations, Lakshadweep balances conservative island norms with targeted eco-tourism revenue on uninhabited coral atolls.",
    "retailAndLicensingDetails": "There are zero retail thekas or public liquor shops anywhere in Lakshadweep. The Bangaram Island Resort is the sole licensed hospitality establishment.",
    "licenseCategories": [
      {
        "code": "Island Prohibition",
        "name": "Inhabited Islands Prohibition",
        "description": "Absolute prohibition on alcohol sale, transport, and consumption across all inhabited islands."
      },
      {
        "code": "Resort Bar",
        "name": "Bangaram Island Tourist Bar",
        "description": "Exclusive licensed lounge catering to international and domestic tourists on uninhabited Bangaram."
      }
    ],
    "interstateTransitGuidance": "All luggage arriving at Agatti Airport and passenger ferry jetties is screened. Travelers are not permitted to carry personal alcohol into the islands.",
    "onlineDeliveryPolicy": "Online liquor delivery is non-existent and completely prohibited.",
    "districtAndCityNuances": "Absolute prohibition across Kavaratti administrative capital and all inhabited atolls; regulated hospitality service exclusively confined to the island of Bangaram.",
    "bespokeFaqs": [
      {
        "question": "Is alcohol banned across the Lakshadweep islands?",
        "answer": "Yes. All 10 inhabited islands (including Kavaratti and Agatti) enforce total statutory prohibition under the Lakshadweep Prohibition Regulation, 1979, to respect local cultural traditions."
      },
      {
        "question": "Where can tourists drink alcohol in Lakshadweep?",
        "answer": "Alcohol service is exclusively permitted on the uninhabited coral resort island of Bangaram, which operates a licensed tourist bar for visiting domestic and international travelers."
      },
      {
        "question": "Can I carry alcohol in flight baggage to Agatti Airport?",
        "answer": "No. Baggage arriving at Agatti Airport is thoroughly scanned by security and excise personnel. Carrying alcohol onto any inhabited island in Lakshadweep is completely illegal and results in confiscation."
      }
    ]
  },
  "andhra-pradesh": {
    "actName": "Andhra Pradesh Excise Act, 1968 & AP Retail Liquor Vending Policy 2024-26",
    "regulatoryAuthority": "Andhra Pradesh Prohibition & Excise Department & APBCL",
    "officialPortal": "https://excise.ap.gov.in",
    "retailModel": "Transparent E-Lottery Private Retail Vends & Premium Stores",
    "statutorySummary": "Andhra Pradesh returned to a private retail licensing framework in October 2024, allocating over 3,300 retail shops across 26 districts through a transparent lottery system. Wholesale procurement remains centralized under the Andhra Pradesh Beverages Corporation Limited (APBCL). Standard retail shops operate from 10:00 AM to 10:00 PM. The minimum legal drinking age is 21 years.",
    "standingDryDaysSummary": "Mandatory dry days in Andhra Pradesh include Republic Day (26 Jan), Independence Day (15 Aug), and Gandhi Jayanti (2 Oct). Major religious observances include Mahavir Jayanti, Good Friday, Eid-ul-Fitr, and Muharram. Election polling windows enforce 48-hour section 135C bans.",
    "transitAndPossessionRule": "Personal possession is capped at 3 bottles of IMFL/spirits and 6 bottles of beer per person without a special permit. Transport across borders from Telangana, Karnataka, or Odisha requires duty documentation.",
    "penaltiesNotice": "Smuggling duty-evaded liquor or illicit brewing is penalized under Sections 34 and 37 of the AP Excise Act, 1968, with mandatory imprisonment and asset attachment.",
    "historyAndPolicy": "After managing retail operations through government-run counters between 2019 and 2024, Andhra Pradesh reformed its excise regime in 2024 to restore private retail, eliminate brand shortages, and re-introduce popular national and international labels at competitive rates.",
    "retailAndLicensingDetails": "Retailers purchase stock solely from APBCL depots. The state licenses private off-shops, premium walk-in stores in commercial malls, and commercial 2B bars.",
    "licenseCategories": [
      {
        "code": "Retail Shop",
        "name": "Private Packaged Liquor Vend",
        "description": "Licensed off-premise retail shops operating under standard 10:00 AM – 10:00 PM hours."
      },
      {
        "code": "2B Bar",
        "name": "Restaurant & Bar License",
        "description": "Table service of spirits, wine, and beer in certified dining spaces (up to 11:00 PM)."
      },
      {
        "code": "Premium Store",
        "name": "Air-Conditioned Mall Vend",
        "description": "High-end walk-in retail store stocking premium single-malts and imported wines."
      },
      {
        "code": "Toddy Shop",
        "name": "Licensed Toddy Counter",
        "description": "Regulated cooperative tapping and retail for fresh natural palm toddy."
      }
    ],
    "interstateTransitGuidance": "Check-posts along the Telangana border (Garikapadu, Ramapuram), Karnataka border (Madakasira), and Tamil Nadu border monitor commercial traffic. Transit of duty-unpaid liquor is strictly prohibited.",
    "onlineDeliveryPolicy": "Home delivery of liquor is not permitted in Andhra Pradesh.",
    "districtAndCityNuances": "Tirupati holy town and the entire Tirumala sacred hill perimeter are strictly alcohol-free zones under Tirumala Tirupati Devasthanams (TTD) statutory regulations. Visakhapatnam and Vijayawada feature active commercial bar cultures.",
    "bespokeFaqs": [
      {
        "question": "Are liquor shops in Andhra Pradesh run by government or private vendors?",
        "answer": "In October 2024, Andhra Pradesh abolished government-run retail counters and returned to a private retail licensing framework, allocating over 3,300 retail shops across 26 districts through a transparent lottery system."
      },
      {
        "question": "Is alcohol completely banned in Tirupati and Tirumala?",
        "answer": "Yes. The sacred Tirumala hill shrine and surrounding pilgrim zones enforce absolute alcohol prohibition under statutory Tirumala Tirupati Devasthanams (TTD) regulations."
      },
      {
        "question": "What are retail wine shop timings in Andhra Pradesh?",
        "answer": "Standard licensed private retail shops operate from 10:00 AM to 10:00 PM across all 26 districts of Andhra Pradesh."
      }
    ]
  },
  "madhya-pradesh": {
    "actName": "Madhya Pradesh Excise Act, 1915 & MP Excise Rules, 1934",
    "regulatoryAuthority": "Excise Commissionerate, Government of Madhya Pradesh",
    "officialPortal": "https://excise.mp.gov.in",
    "retailModel": "Auctioned Composite Retail Vends (IMFL + Country Liquor)",
    "statutorySummary": "Madhya Pradesh governs alcohol retail through the Excise Commissionerate in Gwalior under the MP Excise Act, 1915. In 2022, MP introduced \"Composite Liquor Vends\", allowing both Indian Made Foreign Liquor (IMFL) and country liquor to be sold under a single retail counter. In 2023, the state abolished on-premise drinking enclosures (ahatas) attached to vends. Retail stores operate from 9:30 AM to 11:30 PM. The minimum legal drinking age is 21 years.",
    "standingDryDaysSummary": "Statewide mandatory dry days include Republic Day (26 Jan), Independence Day (15 Aug), Gandhi Jayanti (2 Oct), and the death anniversary of Mahatma Gandhi (30 Jan). Religious dry days include Mahavir Jayanti, Buddha Purnima, Guru Nanak Jayanti, Eid-ul-Fitr, and Muharram.",
    "transitAndPossessionRule": "An individual can possess up to 4 bottles of spirits and 12 bottles of beer for domestic use. Bringing non-MP duty-paid liquor from Rajasthan, Uttar Pradesh, or Maharashtra is strictly illegal.",
    "penaltiesNotice": "Offences involving illicit transit or bootlegging are prosecuted under Section 34 of the MP Excise Act, 1915, carrying non-bailable arrest and vehicle impoundment.",
    "historyAndPolicy": "Madhya Pradesh has systematically streamlined retail licensing through e-tenders while responding to public welfare demands by closing attached ahatas and imposing religious buffer zones around sacred rivers and temple corridors.",
    "retailAndLicensingDetails": "Composite vends operate across all 55 districts. Star hotels and commercial restaurants in major urban centers operate under FL-2 and FL-3 bar licenses.",
    "licenseCategories": [
      {
        "code": "Composite Vend",
        "name": "Combined Retail Liquor Shop",
        "description": "Retail counter licensed for both foreign liquor and country spirits (9:30 AM – 11:30 PM)."
      },
      {
        "code": "FL-2 / FL-3",
        "name": "Bar & Hotel Restaurant License",
        "description": "On-premise table service in commercial restaurants and certified hospitality lounges."
      },
      {
        "code": "FL-4",
        "name": "Commercial Club License",
        "description": "Private social and recreational club bar licenses."
      },
      {
        "code": "Wildlife Resort Bar",
        "name": "National Park Tourism License",
        "description": "Designated hospitality licenses in certified wildlife resort hubs (Kanha, Bandhavgarh, Pench)."
      }
    ],
    "interstateTransitGuidance": "Excise check-posts along borders with Rajasthan, UP, Gujarat, and Maharashtra monitor vehicles. Transporting cheaper Haryana or Delhi alcohol through MP without an in-transit permit is punishable.",
    "onlineDeliveryPolicy": "Home delivery of liquor is strictly prohibited across Madhya Pradesh.",
    "districtAndCityNuances": "Complete alcohol prohibition is enforced around the Mahakaleshwar temple corridor in Ujjain, Chitrakoot holy town, Omkareshwar Jyotirlinga perimeter, and Maihar sacred hill. Bhopal and Indore feature modern nightlife and restobar corridors.",
    "bespokeFaqs": [
      {
        "question": "What are Composite Liquor Shops in Madhya Pradesh?",
        "answer": "Madhya Pradesh operates \"Composite Vends\" where both Indian Made Foreign Liquor (IMFL) and country liquor are sold from a single retail counter, eliminating separate country thekas."
      },
      {
        "question": "Are ahatas (drinking enclosures) still open in MP?",
        "answer": "No. In 2023, the MP government permanently abolished all on-premise drinking ahatas attached to liquor shops to improve public safety and curb public drinking."
      },
      {
        "question": "Which cities in MP enforce complete alcohol prohibition?",
        "answer": "Complete prohibition is enforced around holy temple corridors: Ujjain (Mahakaleshwar perimeter), Chitrakoot, Omkareshwar Jyotirlinga, and Maihar sacred hill."
      }
    ]
  },
  "odisha": {
    "actName": "Odisha Excise Act, 2008 & Odisha Excise Rules, 2017",
    "regulatoryAuthority": "Excise Directorate, Government of Odisha & OSBC",
    "officialPortal": "https://excise.odisha.gov.in",
    "retailModel": "OSBC Wholesale Monopoly & E-Auctioned Off-Shops and On-Shops",
    "statutorySummary": "Odisha regulates wholesale liquor procurement and distribution through the Odisha State Beverages Corporation (OSBC). Retail sales are conducted through private licensed \"Off-Shops\" (packaged sales) and \"On-Shops\" (restaurant bars). In municipal areas, retail off-shops operate from 10:30 AM to 10:30 PM. The minimum legal drinking age in Odisha is 21 years.",
    "standingDryDaysSummary": "Mandatory dry days in Odisha include Republic Day (26 Jan), Independence Day (15 Aug), Gandhi Jayanti (2 Oct), and Utkal Divas (1 April). Major religious observances include Mahavir Jayanti, Buddha Purnima, Good Friday, Eid-ul-Fitr, and Muharram. Localized dry days are enforced during the annual Puri Ratha Yatra.",
    "transitAndPossessionRule": "Personal domestic possession is capped at 3 bottles of spirits (750ml each) and 6 bottles of beer. Bringing untaxed liquor across borders from West Bengal or Andhra Pradesh is strictly prohibited.",
    "penaltiesNotice": "Unlawful manufacturing, possession, or cross-border trafficking is penalized under Section 52 of the Odisha Excise Act, 2008.",
    "historyAndPolicy": "Odisha modernized its excise operations through digital portal integration (e-Abkari Odisha), ensuring end-to-end QR-code tracking of bottles from OSBC central depots to retail shelves.",
    "retailAndLicensingDetails": "Licenses are auctioned transparently. In addition to urban IMFL off-shops, Odisha regulates traditional Outstill (OS) liquor and country spirit vends in tribal districts.",
    "licenseCategories": [
      {
        "code": "Off-Shop",
        "name": "Retail Foreign Liquor Vend",
        "description": "Packaged off-premise sales of IMFL, imported spirits, and beer (10:30 AM – 10:30 PM)."
      },
      {
        "code": "On-Shop",
        "name": "Commercial Bar & Restaurant",
        "description": "Table service of alcoholic beverages in certified dining rooms (up to 12:00 Midnight)."
      },
      {
        "code": "Outstill (OS)",
        "name": "Traditional Country Liquor Vend",
        "description": "Licensed rural brewing and retail units catering to traditional indigenous consumers."
      },
      {
        "code": "Hotel Bar",
        "name": "Star Hospitality Lounge License",
        "description": "Premium hotel bar service for visiting tourists and business travelers."
      }
    ],
    "interstateTransitGuidance": "Excise check-posts at Jaleswar (West Bengal border), Sunabeda (Andhra border), and Bargarh (Chhattisgarh border) monitor highways. Commercial transit without an OSBC permit results in seizure.",
    "onlineDeliveryPolicy": "Odisha allowed home delivery via registered retail stores under special regulatory orders, but third-party general app delivery remains strictly regulated by District Collectors.",
    "districtAndCityNuances": "Puri holy town enforces buffer zones around the Shree Jagannath Temple where liquor vends are prohibited. Bhubaneswar smart city and Cuttack feature the highest density of on-premise bars.",
    "bespokeFaqs": [
      {
        "question": "Is alcohol banned in Puri near the Jagannath Temple?",
        "answer": "Yes. Strict buffer zones around the Shree Jagannath Temple in Puri prohibit retail liquor shops and public alcohol consumption."
      },
      {
        "question": "What are retail off-shop timings in Bhubaneswar and Cuttack?",
        "answer": "Licensed off-shops operate from 10:30 AM to 10:30 PM, with stock supplied solely through the Odisha State Beverages Corporation (OSBC)."
      },
      {
        "question": "What is the domestic liquor possession limit in Odisha?",
        "answer": "Under the Odisha Excise Rules, an adult can legally possess up to 3 bottles of spirits (750ml each) and 6 bottles of beer for domestic consumption with valid OSBC purchase receipts."
      }
    ]
  },
  "chhattisgarh": {
    "actName": "Chhattisgarh Excise Act, 1915 (as adapted) & CSMCL Retail Rules",
    "regulatoryAuthority": "Excise Department, Government of Chhattisgarh & CSMCL",
    "officialPortal": "https://excise.cg.nic.in",
    "retailModel": "100% State Corporation Retail Monopoly (CSMCL)",
    "statutorySummary": "Chhattisgarh manages retail liquor distribution exclusively through the state-owned Chhattisgarh State Marketing Corporation Limited (CSMCL). All private retail wine shops and thekas are prohibited. Government-managed counters operate strictly from 10:00 AM to 10:00 PM across all 33 districts. The legal drinking age in Chhattisgarh is 21 years.",
    "standingDryDaysSummary": "Mandatory dry days in Chhattisgarh include Republic Day (26 Jan), Independence Day (15 Aug), Gandhi Jayanti (2 Oct), and Chhattisgarh Foundation Day (1 Nov). Major religious dry days include Mahavir Jayanti, Guru Ghasidas Jayanti (18 Dec), Eid-ul-Fitr, and Muharram.",
    "transitAndPossessionRule": "An individual can possess up to 3 bottles of IMFL and 6 bottles of beer purchased from authorized CSMCL vends with a valid cash receipt. Cross-border transit from MP, Odisha, or Maharashtra is prohibited.",
    "penaltiesNotice": "Violations are prosecuted under Section 34 of the Chhattisgarh Excise Act, carrying non-bailable arrest and vehicle forfeiture for non-duty liquor transport.",
    "historyAndPolicy": "Formed in 2000, Chhattisgarh created CSMCL in 2017 to eliminate private retail cartels and enforce uniform pricing. Special statutory provisions under PESA empower tribal Gram Sabhas in Bastar and Surguja to regulate traditional local brewing.",
    "retailAndLicensingDetails": "CSMCL operates standardized government counters for foreign liquor and country liquor. Private bars operate under commercial FL-3 licenses in recognized hotels.",
    "licenseCategories": [
      {
        "code": "CSMCL Vend",
        "name": "Government Retail Counter",
        "description": "State-run packaged retail store operating from 10:00 AM to 10:00 PM."
      },
      {
        "code": "FL-3",
        "name": "Hotel Bar & Restaurant License",
        "description": "Table service of liquor inside certified commercial hotels and restobars."
      },
      {
        "code": "FL-4",
        "name": "Commercial Club License",
        "description": "Private social and recreational club bar licenses."
      },
      {
        "code": "Traditional Brew Exemption",
        "name": "Tribal Domestic PESA Right",
        "description": "Customary non-commercial domestic Mahua brewing rights for scheduled tribes."
      }
    ],
    "interstateTransitGuidance": "Check-posts along borders with Odisha, MP, and Maharashtra inspect passenger and commercial vehicles. Illicit transport into tribal areas is strictly targeted.",
    "onlineDeliveryPolicy": "CSMCL operated a state-run home delivery portal during specific pandemic periods, but standard commercial food app delivery is prohibited.",
    "districtAndCityNuances": "Tribal areas in Bastar, Dantewada, and Surguja enjoy customary protections under PESA for domestic Mahua production. Raipur capital region and Bilaspur feature commercial hotel restobars.",
    "bespokeFaqs": [
      {
        "question": "Who operates liquor stores in Chhattisgarh?",
        "answer": "All retail liquor shops in Chhattisgarh are owned and operated directly by the state government through the Chhattisgarh State Marketing Corporation Limited (CSMCL); private thekas are prohibited."
      },
      {
        "question": "Are traditional tribal drinks (Mahua) legal in Bastar?",
        "answer": "Yes. Under customary PESA protections, scheduled tribal households in Bastar and Surguja are legally permitted to brew traditional Mahua for personal domestic consumption."
      },
      {
        "question": "What is the legal drinking age in Chhattisgarh?",
        "answer": "The statutory minimum legal drinking age in Chhattisgarh is 21 years under the Chhattisgarh Excise Act."
      }
    ]
  },
  "jharkhand": {
    "actName": "Jharkhand Excise Act, 1915 & Jharkhand Liquor Retail Rules",
    "regulatoryAuthority": "Excise & Prohibition Department, Government of Jharkhand & JSBCL",
    "officialPortal": "https://excise.jharkhand.gov.in",
    "retailModel": "Government-Controlled Retail Managed via JSBCL",
    "statutorySummary": "Jharkhand manages wholesale and retail liquor distribution through the Jharkhand State Beverages Corporation Limited (JSBCL). Retail shops operate through contracted placement agencies under government oversight from 10:00 AM to 10:00 PM. Commercial bars in urban centers operate under valid on-premise licenses. The minimum legal drinking age in Jharkhand is 21 years.",
    "standingDryDaysSummary": "Statewide mandatory dry days include Republic Day (26 Jan), Independence Day (15 Aug), Gandhi Jayanti (2 Oct), and Jharkhand Foundation Day (15 Nov). Religious dry days include Mahavir Jayanti, Karma Puja, Good Friday, Eid-ul-Fitr, and Muharram.",
    "transitAndPossessionRule": "Personal possession is capped at 3 bottles of IMFL and 6 bottles of beer with valid JSBCL purchase receipts. Carrying liquor across the northern border into dry Bihar is strictly prohibited and heavily monitored.",
    "penaltiesNotice": "Offences involving bootlegging or cross-border smuggling into Bihar are penalized under Section 47 of the Jharkhand Excise Act, 1915.",
    "historyAndPolicy": "Jharkhand transitioned between private auctions and state-managed JSBCL vends to ensure consistent revenue receipts and curb illegal smuggling networks along the extensive border shared with dry Bihar.",
    "retailAndLicensingDetails": "JSBCL retail outlets operate across all 24 districts. Urban hubs feature commercial restaurant bars and private social clubs.",
    "licenseCategories": [
      {
        "code": "JSBCL Retail",
        "name": "Government Retail Liquor Vend",
        "description": "Packaged off-premise retail shop operating under 10:00 AM – 10:00 PM hours."
      },
      {
        "code": "Bar License",
        "name": "Commercial Restaurant Bar",
        "description": "Table service of alcoholic beverages in certified dining establishments."
      },
      {
        "code": "Club License",
        "name": "Private Social Club Bar",
        "description": "Exclusive bar licenses for registered corporate and recreational clubs (Ranchi, Jamshedpur)."
      },
      {
        "code": "Tribal Customary Exemption",
        "name": "Handia Brewing Customary Right",
        "description": "Customary household preparation of traditional rice beer (Handia) for personal use."
      }
    ],
    "interstateTransitGuidance": "Check-posts along the Bihar border (Rajauli, Barhi, Koderma) are heavily staffed by joint police squads. Vehicles heading into Bihar are thoroughly searched; carrying liquor into Bihar constitutes a non-bailable crime.",
    "onlineDeliveryPolicy": "Home delivery of liquor is prohibited across Jharkhand.",
    "districtAndCityNuances": "Deoghar district enforces strict dry days during the holy Shravani Mela in the sacred Baba Baidyanath Dham temple perimeter. Ranchi and Jamshedpur feature modern restobars operating until 11:00 PM.",
    "bespokeFaqs": [
      {
        "question": "Is alcohol banned in Deoghar during Shravani Mela?",
        "answer": "Yes. Deoghar district enforces strict dry day notifications during the holy month of Shravani Mela in the sacred Baba Baidyanath Dham temple perimeter."
      },
      {
        "question": "Can you carry alcohol from Jharkhand into Bihar?",
        "answer": "No. Intensive multi-agency checkposts at Rajauli, Koderma, and Barhi intercept vehicles heading into Bihar; bootlegging into dry Bihar carries non-bailable prison terms."
      },
      {
        "question": "What are retail theka operating hours in Ranchi and Jamshedpur?",
        "answer": "Government-managed JSBCL retail vends operate from 10:00 AM to 10:00 PM, while certified commercial bars operate until 11:00 PM in major urban centers."
      }
    ]
  },
  "assam": {
    "actName": "Assam Excise Act, 2000 & Assam Excise Rules, 2016",
    "regulatoryAuthority": "Excise Department, Government of Assam",
    "officialPortal": "https://excise.assam.gov.in",
    "retailModel": "Licensed Private Off-Shops and On-Shops",
    "statutorySummary": "Assam regulates alcohol production and retail under the Assam Excise Act, 2000. As the commercial engine of Northeast India, Assam features licensed private \"Off-Shops\" (packaged retail) operating from 10:00 AM to 10:00 PM (extended to 11:00 PM in municipal corporation areas). Commercial bars and hotel lounges operate as \"On-Shops\". The minimum legal drinking age in Assam is 21 years.",
    "standingDryDaysSummary": "Mandatory dry days in Assam include Republic Day (26 Jan), Independence Day (15 Aug), Gandhi Jayanti (2 Oct), and the martyrdom anniversary of Mahatma Gandhi (30 Jan). Major cultural and religious dry days include Magh Bihu, Rongali Bihu, Mahavir Jayanti, and Eid-ul-Fitr.",
    "transitAndPossessionRule": "An individual can possess up to 12 bottles of beer and 3 bottles of IMFL with valid proof of purchase. Transporting duty-unpaid liquor across borders from Meghalaya or Arunachal Pradesh is strictly prohibited.",
    "penaltiesNotice": "Unlawful manufacturing, possession, or cross-border smuggling is penalized under Sections 53 and 54 of the Assam Excise Act, 2000.",
    "historyAndPolicy": "Assam modernized its excise infrastructure with end-to-end digital tracking (e-Excise Assam), automating permit issuance, brand registration, and warehouse dispatches across the Brahmaputra valley.",
    "retailAndLicensingDetails": "The state licenses IMFL off-shops, country spirit counters, hotel bars, and microbreweries. Autonomous district councils in Bodoland (BTR) and Karbi Anglong exercise regional licensing coordination.",
    "licenseCategories": [
      {
        "code": "IMFL Off-Shop",
        "name": "Retail Foreign Liquor Vend",
        "description": "Packaged off-premise sales of IMFL, imported liquor, and beer (10:00 AM – 10:00 PM / 11:00 PM)."
      },
      {
        "code": "IMFL On-Shop",
        "name": "Commercial Bar & Restaurant",
        "description": "Table service of alcoholic beverages in certified dining rooms and urban lounges."
      },
      {
        "code": "Microbrewery",
        "name": "Craft Brewing License",
        "description": "On-premise craft beer production and service inside licensed Guwahati restobars."
      },
      {
        "code": "Country Spirit",
        "name": "Licensed Country Spirit Vend",
        "description": "Authorized retail counters for regulated country spirit distribution."
      }
    ],
    "interstateTransitGuidance": "Check-posts at Khanapara and Jorabat (Meghalaya border) and Dimapur border monitor vehicular movement. Smuggling cheaper military or neighboring state liquor into Assam is prosecuted with vehicle seizure.",
    "onlineDeliveryPolicy": "Guwahati municipal corporation experimented with online delivery trials via authorized retail stores during specific periods, but general app delivery remains strictly regulated.",
    "districtAndCityNuances": "Guwahati features a vibrant urban nightlife with microbreweries and restobars operating up to 11:30 PM. Majuli island and historical pilgrimage areas observe strict community-assisted closing norms.",
    "bespokeFaqs": [
      {
        "question": "Are bars in Guwahati open late night?",
        "answer": "Yes. In Guwahati municipal corporation areas, licensed restobars, pubs, and microbreweries are permitted to operate until 11:30 PM."
      },
      {
        "question": "What are the dry days during Bihu in Assam?",
        "answer": "Magh Bihu (Uruka) and designated Rongali Bihu festival days observe official dry day closures notified by district commissioners."
      },
      {
        "question": "Can I bring liquor from Meghalaya into Assam without paying duty?",
        "answer": "No. Transporting duty-unpaid liquor across the Khanapara or Jorabat border checkpoints without an Assam Excise transit pass is strictly illegal and subject to seizure."
      }
    ]
  },
  "himachal-pradesh": {
    "actName": "Himachal Pradesh Excise Act, 2011 & HP Liquor License Rules, 1986",
    "regulatoryAuthority": "State Taxes and Excise Department, Government of Himachal Pradesh",
    "officialPortal": "https://hptax.gov.in",
    "retailModel": "Auctioned Private Retail Vends (L-2) & Tourist Hospitality Bars",
    "statutorySummary": "Himachal Pradesh regulates the liquor trade under the Himachal Pradesh Excise Act, 2011. Known for its mountain tourism economy, retail L-2 shops operate from 9:00 AM to 10:00 PM (or 11:00 PM in peak tourist zones). Hotel bars and resort lounges operate under specialized hospitality licenses. The minimum legal drinking age in Himachal Pradesh is 21 years.",
    "standingDryDaysSummary": "Mandatory dry days include Republic Day (26 Jan), Independence Day (15 Aug), Gandhi Jayanti (2 Oct), and Himachal Day (15 April). Religious dry days include Mahavir Jayanti, Buddha Purnima, Guru Nanak Jayanti, Eid-ul-Fitr, and Ram Navami.",
    "transitAndPossessionRule": "Tourists may possess up to 2 bottles of spirits (750ml) and 6 bottles of beer for personal use. Transporting commercial duty-unpaid liquor from Chandigarh or Punjab across border checkposts is strictly illegal.",
    "penaltiesNotice": "Offences involving bootlegging or unauthorized transport are prosecuted under Section 39 of the HP Excise Act, 2011.",
    "historyAndPolicy": "Himachal Pradesh has fostered high-end mountain tourism, fruit wine production, and craft microbreweries in scenic hill stations like Shimla, Manali, and Dharamshala, while safeguarding revenue receipts.",
    "retailAndLicensingDetails": "Retail vends (L-2) are allocated via annual auction-cum-tender across 12 hill districts. Resort bars cater extensively to domestic and international visitors.",
    "licenseCategories": [
      {
        "code": "L-2",
        "name": "Retail Foreign Liquor Vend",
        "description": "Packaged off-premise sales of IMFL, imported spirits, and beer (9:00 AM – 10:00 PM / 11:00 PM)."
      },
      {
        "code": "L-3 / L-4 / L-5",
        "name": "Hotel, Resort & Restaurant Bar",
        "description": "Licensed table service in certified dining rooms and hill resort lounges."
      },
      {
        "code": "L-10BB",
        "name": "Microbrewery License",
        "description": "Craft brewing on-premise inside tourist destination lounges."
      },
      {
        "code": "Horticulture Wine License",
        "name": "Indigenous Fruit Winery License",
        "description": "Commercial production and retail of local apple, plum, and rhododendron wines."
      }
    ],
    "interstateTransitGuidance": "Excise check-posts at Parwanoo, Baddi, Mehatpur, and Kala Amb inspect vehicles entering from Punjab, Haryana, and Chandigarh. Carrying duty-unpaid alcohol into Himachal invites heavy fines.",
    "onlineDeliveryPolicy": "Home delivery of alcohol is prohibited in Himachal Pradesh.",
    "districtAndCityNuances": "Shimla (The Mall pedestrian zone) prohibits commercial liquor vends directly on the heritage promenade. Manali and McLeodganj feature tourism-extended bar licenses during peak summer and winter seasons.",
    "bespokeFaqs": [
      {
        "question": "Can tourists drink along The Mall Road in Shimla?",
        "answer": "No. Public consumption and retail vends are strictly prohibited on the heritage pedestrian promenade of The Mall in Shimla; alcohol may only be consumed inside licensed hotel bars and restobars."
      },
      {
        "question": "Are fruit wines legal and available in Himachal Pradesh?",
        "answer": "Yes. Himachal Pradesh actively licenses indigenous cottage wineries that produce and retail local apple, plum, and rhododendron wines across tourist hill stations."
      },
      {
        "question": "Can tourists carry alcohol in their cars while driving to Manali or Shimla?",
        "answer": "Tourists may carry up to 2 bottles of spirits (750ml) and 6 bottles of beer for personal use with valid retail cash receipts. Transporting unmanifested cartons from Chandigarh or Haryana is strictly prohibited."
      }
    ]
  },
  "uttarakhand": {
    "actName": "Uttarakhand Excise Act, 2001 (adapted from UP 1910 Act)",
    "regulatoryAuthority": "Excise Department, Government of Uttarakhand",
    "officialPortal": "https://excise.uk.gov.in",
    "retailModel": "Auctioned Private Retail Vends & Strict Pilgrimage Dry Zones",
    "statutorySummary": "Uttarakhand regulates alcohol distribution under the Uttarakhand Excise Act, 2001. The state operates a dual regulatory philosophy: thriving hospitality licensing in tourist corridors (Dehradun, Mussoorie, Nainital) balanced with complete statutory prohibition across sacred pilgrimage sanctuaries (Haridwar, Rishikesh, Char Dham). Retail shops operate from 10:00 AM to 10:00 PM. The minimum legal drinking age is 21 years.",
    "standingDryDaysSummary": "Mandatory dry days include Republic Day (26 Jan), Independence Day (15 Aug), Gandhi Jayanti (2 Oct), and Uttarakhand State Foundation Day (9 Nov). Religious dry days include Mahavir Jayanti, Buddha Purnima, Guru Nanak Jayanti, Eid-ul-Fitr, and Rama Navami.",
    "transitAndPossessionRule": "Domestic possession is limited to 2 bottles of IMFL and 6 bottles of beer per person. Carrying alcohol into designated sacred pilgrimage zones is strictly prohibited under penal statutes.",
    "penaltiesNotice": "Violations are prosecuted under Sections 60 and 63 of the Excise Act, carrying non-bailable arrest, heavy fines, and vehicle impoundment.",
    "historyAndPolicy": "Since carving out of Uttar Pradesh in 2000, Uttarakhand has fiercely protected the environmental and spiritual sanctity of the Ganga and the Himalayas, enforcing complete alcohol-free zones across sacred riverbanks.",
    "retailAndLicensingDetails": "Retail vends (FL-5) are allocated via transparent e-tenders. Tourist hospitality establishments operate under FL-7 bar licenses.",
    "licenseCategories": [
      {
        "code": "FL-5",
        "name": "Retail Foreign Liquor Vend",
        "description": "Packaged off-premise sales of IMFL, imported liquor, and beer (10:00 AM – 10:00 PM)."
      },
      {
        "code": "FL-7",
        "name": "Hotel & Commercial Restaurant Bar",
        "description": "Table service of alcoholic beverages in certified dining rooms and tourist resorts."
      },
      {
        "code": "Pilgrimage Prohibition",
        "name": "Char Dham Statutory Ban",
        "description": "Statutory ban on alcohol retail and possession in sacred municipal perimeters."
      },
      {
        "code": "Occasional Permit",
        "name": "Destination Wedding Liquor Permit",
        "description": "Mandatory single-day permit for hosting alcohol service at banquets and resorts."
      }
    ],
    "interstateTransitGuidance": "Check-posts along Uttar Pradesh borders (Mohand, Haridwar border, Kashiwala) inspect vehicles. Carrying liquor into the municipal limits of Haridwar or Rishikesh results in immediate seizure and prosecution.",
    "onlineDeliveryPolicy": "Home delivery of liquor is prohibited across Uttarakhand.",
    "districtAndCityNuances": "Total statutory prohibition is enforced in Haridwar municipal corporation, Rishikesh (Muni Ki Reti and Swargashram areas), and Char Dham temple perimeters (Badrinath, Kedarnath, Gangotri, Yamunotri). Dehradun and Mussoorie operate modern restobars.",
    "bespokeFaqs": [
      {
        "question": "Why is alcohol strictly prohibited in Haridwar and Rishikesh?",
        "answer": "Under statutory government notifications, Haridwar municipal corporation and the sacred pilgrimage perimeters of Rishikesh (Muni Ki Reti and Swargashram) are 100% dry zones."
      },
      {
        "question": "Can tourists drink in Dehradun and Mussoorie?",
        "answer": "Yes. Dehradun, Mussoorie, and Nainital operate licensed retail vends (10:00 AM – 10:00 PM) and commercial restobars."
      },
      {
        "question": "Is alcohol banned on the Char Dham Yatra in Uttarakhand?",
        "answer": "Yes. Absolute statutory prohibition is enforced across the sacred shrine perimeters of Badrinath, Kedarnath, Gangotri, and Yamunotri."
      }
    ]
  },
  "chandigarh": {
    "actName": "Punjab Excise Act, 1914 (as applicable to UT Chandigarh) & Chandigarh Excise Policy",
    "regulatoryAuthority": "Excise and Taxation Department, Chandigarh Administration",
    "officialPortal": "https://chandigarhexcise.gov.in",
    "retailModel": "Auctioned Private Retail Vends (L-2) with Uniform UT Quotas",
    "statutorySummary": "Chandigarh Union Territory administers liquor distribution under the adapted Punjab Excise Act, 1914, through annual progressive excise policies. Known for competitive excise duty rates and high-density sector planning, Chandigarh’s ~95 retail vends operate from 9:00 AM to 12:00 Midnight. Bar and restaurant licenses operate until 1:00 AM (extended to 3:00 AM for premium lounges). The legal drinking age in Chandigarh is 21 years.",
    "standingDryDaysSummary": "Mandatory dry days in Chandigarh include Republic Day (26 Jan), Independence Day (15 Aug), and Gandhi Jayanti (2 Oct). Religious dry days include Mahavir Jayanti, Guru Nanak Jayanti, and Eid-ul-Fitr. Polling days enforce 48-hour dry curfews.",
    "transitAndPossessionRule": "An individual can possess up to 12 bottles of beer and 4 bottles of IMFL/wine purchased within Chandigarh. Transporting Chandigarh-labeled liquor into neighboring Punjab (Mohali) or Haryana (Panchkula) without payment of destination state duty is strictly illegal.",
    "penaltiesNotice": "Smuggling cheaper UT-quota liquor across municipal borders into Punjab or Haryana is prosecuted under Section 61 with immediate vehicle confiscation.",
    "historyAndPolicy": "As a planned Union Territory serving as the joint capital of Punjab and Haryana, Chandigarh maintains an independent fiscal regime with lower local levies, driving a sophisticated urban hospitality and microbrewery culture.",
    "retailAndLicensingDetails": "Vends are auctioned individually per commercial sector. Sector 26, Sector 35, and Elante Mall house premier microbreweries and nightlife lounges.",
    "licenseCategories": [
      {
        "code": "L-2",
        "name": "Retail Foreign Liquor Vend",
        "description": "Packaged off-premise sales of IMFL, imported liquor, and beer (9:00 AM – 12:00 Midnight)."
      },
      {
        "code": "L-4 / L-5",
        "name": "Bar & Restaurant License",
        "description": "Table service of alcohol in certified restaurants and commercial lounges (up to 1:00 AM / 3:00 AM)."
      },
      {
        "code": "Microbrewery",
        "name": "Craft Brewing License",
        "description": "On-premise craft beer production and service inside sector dining lounges."
      },
      {
        "code": "Club License",
        "name": "Private Recreation Club Bar",
        "description": "Exclusive bar licenses for registered golf and sports clubs."
      }
    ],
    "interstateTransitGuidance": "Intensive joint border checks operate along borders with Mohali (Punjab) and Panchkula (Haryana). Punjab Police regularly intercept vehicles on border sector roads to stop bootlegging of cheaper Chandigarh bottles.",
    "onlineDeliveryPolicy": "Home delivery of liquor is prohibited in Chandigarh.",
    "districtAndCityNuances": "Uniform sector-wide administration. Sector 26, Sector 35, Sector 7, and Industrial Area Phase 1 (Elante) feature the highest concentration of late-night microbreweries and lounges.",
    "bespokeFaqs": [
      {
        "question": "Why are wine shops in Chandigarh open until 12:00 Midnight?",
        "answer": "Under the Chandigarh UT Excise Policy, retail vends hold authorized operating hours from 9:00 AM to 12:00 Midnight, the latest retail curfew in northern India."
      },
      {
        "question": "Can I take liquor from Chandigarh into Mohali or Panchkula?",
        "answer": "No. Chandigarh alcohol carries lower UT duties. Crossing municipal borders into Punjab or Haryana without paying destination state excise duty is illegal and heavily policed."
      },
      {
        "question": "Are craft microbreweries legal in Chandigarh?",
        "answer": "Yes. Chandigarh actively licenses on-premise craft microbreweries in commercial entertainment corridors, including Sector 26, Sector 35, and Elante Mall."
      }
    ]
  },
  "jammu-and-kashmir": {
    "actName": "Jammu and Kashmir Excise Act, Samvat 1958 (1901 AD)",
    "regulatoryAuthority": "Excise Department, Government of Jammu and Kashmir",
    "officialPortal": "https://jkexcise.nic.in",
    "retailModel": "E-Auctioned Private Retail Vends (JKEL-2) & Tourist Hospitality Bars",
    "statutorySummary": "Jammu and Kashmir administers liquor licensing through the Excise Commissionerate under the historic J&K Excise Act, Samvat 1958. Retail wine shops (JKEL-2) operate primarily in Jammu division and designated tourist/commercial nodes, operating from 9:00 AM to 9:30 PM (or 10:00 PM in summer). The minimum legal drinking age in Jammu and Kashmir is 21 years.",
    "standingDryDaysSummary": "Mandatory dry days in J&K include Republic Day (26 Jan), Independence Day (15 Aug), Gandhi Jayanti (2 Oct), and the death anniversary of Mahatma Gandhi (30 Jan). Religious dry days include Mahavir Jayanti, Buddha Purnima, Guru Nanak Jayanti, Eid-ul-Fitr, and Muharram.",
    "transitAndPossessionRule": "Domestic possession is limited to 2 bottles of IMFL and 6 bottles of beer per person. Bringing duty-unpaid liquor across the Lakhanpur border checkpost from Punjab or Himachal is prohibited.",
    "penaltiesNotice": "Violations are penalized under Section 48 of the J&K Excise Act, carrying imprisonment of up to 3 years and vehicle impoundment.",
    "historyAndPolicy": "Following constitutional re-organization in 2019, J&K transitioned retail vend allocation to transparent online e-auctions, significantly increasing state revenue while enforcing strict zoning around religious and educational institutions.",
    "retailAndLicensingDetails": "Retail vends operate across Jammu, Kathua, Udhampur, and Samba districts. In Kashmir division, licensing is tightly controlled and confined primarily to certified star hotels and defense messes.",
    "licenseCategories": [
      {
        "code": "JKEL-2",
        "name": "Retail Foreign Liquor Vend",
        "description": "Packaged off-premise sales of IMFL, imported liquor, and beer (9:00 AM – 9:30 PM)."
      },
      {
        "code": "JKEL-3 / 3A",
        "name": "Hotel & Restaurant Bar License",
        "description": "Table service in certified commercial dining facilities and star hotel lounges."
      },
      {
        "code": "JKEL-4",
        "name": "Club Bar License",
        "description": "Exclusive bar licenses for registered civilian and military clubs."
      },
      {
        "code": "Religious Exclusion",
        "name": "Katra Holy Town Prohibition",
        "description": "Statutory prohibition on alcohol sale and consumption within the Katra shrine base."
      }
    ],
    "interstateTransitGuidance": "The Lakhanpur check-post (Punjab-J&K border) inspects all incoming passenger buses, commercial trucks, and private vehicles. Carrying excess duty-unpaid liquor is penalized.",
    "onlineDeliveryPolicy": "Home delivery of alcohol is strictly prohibited across Jammu and Kashmir.",
    "districtAndCityNuances": "Complete statutory prohibition is enforced in Katra holy town (base camp for Shri Mata Vaishno Devi shrine). Kashmir division features licensed restobars inside certified tourist hotels in Srinagar, Gulmarg, and Pahalgam.",
    "bespokeFaqs": [
      {
        "question": "Is alcohol banned in Katra (Mata Vaishno Devi)?",
        "answer": "Yes. Complete statutory prohibition is enforced in Katra holy town and throughout the Trikuta Hills pilgrim route to the Vaishno Devi shrine."
      },
      {
        "question": "Where can you buy alcohol in Srinagar and Kashmir?",
        "answer": "In Kashmir division, retail vends are strictly restricted; alcohol is primarily served inside certified tourist star hotels and private clubs in Srinagar, Gulmarg, and Pahalgam."
      },
      {
        "question": "What is the legal drinking age in Jammu and Kashmir?",
        "answer": "Under the Jammu and Kashmir Excise Act, the statutory minimum legal drinking age is 21 years."
      }
    ]
  },
  "ladakh": {
    "actName": "Jammu and Kashmir Excise Act (as adapted for UT Ladakh)",
    "regulatoryAuthority": "Department of Excise, Administration of Union Territory of Ladakh",
    "officialPortal": "https://ladakh.nic.in",
    "retailModel": "Regulated Retail Vends in Leh & Tourist Hotel Licenses",
    "statutorySummary": "Ladakh administers liquor regulation through the UT Administration. Retail vends operate primarily in Leh town to cater to the local population and seasonal high-altitude tourism. Retail shops operate from 10:00 AM to 8:00 PM (subject to winter seasonal adjustments). Hotel and guest house lounges operate under tourist hospitality permits. The legal drinking age is 21 years.",
    "standingDryDaysSummary": "Mandatory dry days in Ladakh include Republic Day (26 Jan), Independence Day (15 Aug), Gandhi Jayanti (2 Oct), Buddha Purnima, and Ladakh UT Foundation Day (31 Oct). Election dates observe 48-hour bans.",
    "transitAndPossessionRule": "Personal possession is limited to 2 bottles of spirits and 6 bottles of beer. Screenings are conducted at Leh airport and highway checkposts.",
    "penaltiesNotice": "Illegal transport or bootlegging is penalized under the adapted Excise Act with fines and confiscation.",
    "historyAndPolicy": "Post-2019 Union Territory governance balances the cultural sensitivities of high-altitude Himalayan communities with the hospitality requirements of mountain expeditions and international tourism.",
    "retailAndLicensingDetails": "Licensed retail vends in Leh town supply packaged products. Commercial hotel lounges in Leh cater to trekking and leisure tourists during the operational season.",
    "licenseCategories": [
      {
        "code": "Retail Vend",
        "name": "Packaged Liquor Store (Leh)",
        "description": "Authorized retail counter operating in Leh town (10:00 AM – 8:00 PM)."
      },
      {
        "code": "Hotel Bar",
        "name": "Tourist Guest House & Hotel Lounge",
        "description": "Table service inside certified tourist accommodations."
      },
      {
        "code": "Chhang Exemption",
        "name": "Traditional Barley Brew Exemption",
        "description": "Customary domestic non-commercial preparation of traditional barley brew (Chhang)."
      }
    ],
    "interstateTransitGuidance": "Luggage is screened at Kushok Bakula Rimpochee Airport in Leh and at highway check-posts along the Manali-Leh and Srinagar-Leh routes.",
    "onlineDeliveryPolicy": "Online liquor delivery is non-existent and prohibited in Ladakh.",
    "districtAndCityNuances": "Leh district features regulated retail and tourist hospitality licenses; Kargil district maintains a conservative social environment with virtually no public commercial retail outlets.",
    "bespokeFaqs": [
      {
        "question": "Where is alcohol available in Ladakh?",
        "answer": "Licensed retail vends and tourist hotel lounges operate in Leh town; Kargil district maintains culturally conservative norms with virtually no commercial retail vends."
      },
      {
        "question": "Is traditional Chhang legal in Ladakh?",
        "answer": "Yes. Indigenous non-commercial preparation of barley brew (Chhang) is customary and exempt from commercial excise licensing for local household use."
      },
      {
        "question": "Why are there no commercial wine shops in Kargil?",
        "answer": "Kargil district observes culturally conservative local community norms where public commercial liquor vends do not operate; retail sales are centered in Leh town."
      }
    ]
  },
  "puducherry": {
    "actName": "Puducherry Excise Act, 1970 & Puducherry Excise Rules",
    "regulatoryAuthority": "Excise Department, Government of Puducherry",
    "officialPortal": "https://excise.py.gov.in",
    "retailModel": "Competitive Private Retail, French Quarter Cafes & Beach Bars",
    "statutorySummary": "Puducherry Union Territory regulates liquor distribution under the Puducherry Excise Act, 1970. Famous for its French colonial heritage and tourism-friendly low excise duty rates, alcohol is substantially cheaper in Puducherry than in neighboring Tamil Nadu. Retail wine stores operate from 9:00 AM to 11:00 PM, while tourist restobars and beachfront cafes operate until 11:30 PM. The minimum legal drinking age in Puducherry is 18 years.",
    "standingDryDaysSummary": "Mandatory dry days in Puducherry include Republic Day (26 Jan), Independence Day (15 Aug), Gandhi Jayanti (2 Oct), Mahavir Jayanti, and Tiruvalluvar Day. Election polling windows enforce strict 48-hour dry curfews.",
    "transitAndPossessionRule": "Possession within Puducherry is liberal for personal use. However, carrying even a single bottle of Puducherry-labeled alcohol into Tamil Nadu without paying Tamil Nadu duty is strictly illegal under Tamil Nadu law and leads to immediate confiscation.",
    "penaltiesNotice": "Smuggling liquor out of Puducherry into Tamil Nadu is heavily penalized at border check-posts with vehicle seizure and non-bailable arrest under Tamil Nadu Prohibition statutes.",
    "historyAndPolicy": "Reflecting its French colonial past, Puducherry has long maintained a competitive commercial tax regime that stimulates tourism, boutique hospitality, and gastronomy across its coastal enclaves.",
    "retailAndLicensingDetails": "Private retail vends (FL-2) operate throughout the urban boulevard and beachfront. Boutique restobars and heritage French cafes serve wine, beer, and spirits.",
    "licenseCategories": [
      {
        "code": "FL-2",
        "name": "Retail Foreign Liquor Vend",
        "description": "Packaged off-premise sales of IMFL, imported spirits, and beer (9:00 AM – 11:00 PM)."
      },
      {
        "code": "Tourism Bar",
        "name": "Heritage Cafe & Beach Restobar",
        "description": "Table service of alcoholic beverages in certified dining rooms and beachfront cafes."
      },
      {
        "code": "FL-1",
        "name": "Wholesale Depot License",
        "description": "Commercial distribution warehouse supplying retail vends."
      },
      {
        "code": "Arrack / Toddy",
        "name": "Licensed Local Spirit Counter",
        "description": "Authorized retail shops for traditional arrack and freshly tapped palm toddy."
      }
    ],
    "interstateTransitGuidance": "Tamil Nadu Police and TASMAC enforcement squads operate permanent check-posts at every exit road (Gorimedu, Kanagachettikulam, Villianur, Mullodai). Tourist cars and buses are systematically searched; transporting bottles into TN invites severe penalties.",
    "onlineDeliveryPolicy": "Home delivery of liquor is prohibited in Puducherry.",
    "districtAndCityNuances": "Puducherry comprises four non-contiguous coastal enclaves: Puducherry town, Karaikal (enclosed in TN), Mahe (enclosed in Kerala), and Yanam (enclosed in AP). Each enclave follows UT excise rules within its geographic borders.",
    "bespokeFaqs": [
      {
        "question": "Why is alcohol so cheap in Pondicherry?",
        "answer": "Puducherry levies low Union Territory excise duties to support coastal hospitality and tourism, making beer, wine, and spirits up to 30–50% cheaper than in neighboring Tamil Nadu."
      },
      {
        "question": "Can I bring alcohol from Pondicherry into Chennai or Tamil Nadu?",
        "answer": "No. Tamil Nadu Police maintain permanent border checkposts at Gorimedu and Kanagachettikulam. Carrying Pondicherry liquor into Tamil Nadu is a non-bailable offence resulting in vehicle confiscation."
      },
      {
        "question": "Are beach cafes and French Quarter bars open late in Pondicherry?",
        "answer": "Yes. Licensed tourist restobars and heritage cafes in the French Quarter and beach promenade serve alcohol until 11:30 PM."
      }
    ]
  },
  "dadra-and-nagar-haveli-and-daman-and-diu": {
    "actName": "Goa, Daman and Diu Excise Duty Act, 1964 (as adapted)",
    "regulatoryAuthority": "Excise Department, Administration of Dadra and Nagar Haveli and Daman and Diu",
    "officialPortal": "https://daman.nic.in",
    "retailModel": "Competitive Private Retail, Coastal Shacks & Beach Resorts",
    "statutorySummary": "This unified Union Territory administers liquor distribution under the adapted 1964 Excise Duty Act. Known for low local excise duties and coastal tourism, retail stores in Daman and Diu operate from 9:00 AM to 11:00 PM, while resort bars operate until 11:30 PM. The minimum legal drinking age is 21 years.",
    "standingDryDaysSummary": "Mandatory dry days include Republic Day (26 Jan), Independence Day (15 Aug), Gandhi Jayanti (2 Oct), and UT Liberation Day. Polling dates enforce strict 48-hour dry curfews.",
    "transitAndPossessionRule": "Liberal possession within the UT for personal consumption. However, transporting alcohol across the border into dry Gujarat is strictly illegal and constitutes a major criminal offence under the Gujarat Prohibition Act.",
    "penaltiesNotice": "Gujarat Police check-posts outside Daman and Diu arrest commuters caught smuggling liquor, leading to non-bailable prosecution, vehicle confiscation, and up to 3 years imprisonment.",
    "historyAndPolicy": "Former Portuguese coastal territories (Daman and Diu) merged with Dadra and Nagar Haveli in 2020. The territory retains low taxation to support domestic beach tourism and hospitality.",
    "retailAndLicensingDetails": "High density of private retail shops and coastal resort bars in Daman and Diu island. Dadra and Nagar Haveli (Silvassa) features industrial and resort hospitality licensing.",
    "licenseCategories": [
      {
        "code": "Retail Vend",
        "name": "Packaged Liquor Store",
        "description": "Off-premise sales of IMFL, imported liquor, and beer (9:00 AM – 11:00 PM)."
      },
      {
        "code": "Resort Bar",
        "name": "Coastal Beach Resort License",
        "description": "Table service in coastal hotel restaurants and sea-facing restobars."
      },
      {
        "code": "Wholesale License",
        "name": "Territory Distribution Depot",
        "description": "Wholesale procurement and supply to licensed retail outlets."
      }
    ],
    "interstateTransitGuidance": "Gujarat Police operate intensive 24/7 check-posts at all exit points from Daman (Vapi, Bhilad, Dabhel) and Diu (Tad checkpost, Una). Travelers are breathalyzed, and vehicles are searched for illicit contraband.",
    "onlineDeliveryPolicy": "Online liquor delivery is prohibited across the territory.",
    "districtAndCityNuances": "Daman (Nani Daman and Moti Daman) and Diu feature active beachfront hospitality; Silvassa (DNH) caters to corporate and eco-resort tourism.",
    "bespokeFaqs": [
      {
        "question": "Can I bring alcohol from Daman or Diu into Gujarat?",
        "answer": "No. Gujarat Police operate 24/7 checkposts at Bhilad, Vapi, and Una. Commuters caught bringing liquor into dry Gujarat face non-bailable arrest under the Gujarat Prohibition Act."
      },
      {
        "question": "What are the wine shop timings in Daman and Diu?",
        "answer": "Retail stores operate from 9:00 AM to 11:00 PM, while coastal resort restobars serve alcohol until 11:30 PM."
      },
      {
        "question": "What happens if you are caught with Daman liquor at the Vapi or Bhilad border?",
        "answer": "Gujarat Police operate 24/7 checkposts at Bhilad and Vapi. Carrying even one bottle into dry Gujarat leads to immediate non-bailable arrest under the Gujarat Prohibition Act and vehicle seizure."
      }
    ]
  },
  "sikkim": {
    "actName": "Sikkim Excise Act, 1992 & Sikkim Excise Rules",
    "regulatoryAuthority": "Excise Department, Government of Sikkim",
    "officialPortal": "https://sikkim.gov.in",
    "retailModel": "Licensed Private Retail & Flourishing Indigenous Distilleries",
    "statutorySummary": "Sikkim regulates alcohol production and retail under the Sikkim Excise Act, 1992. Renowned for its indigenous brewing traditions and prominent distilleries, retail shops operate from 9:00 AM to 10:00 PM. Vibrant pub and restobar culture flourishes in Gangtok along pedestrian boulevards. The minimum legal drinking age in Sikkim is 21 years.",
    "standingDryDaysSummary": "Mandatory dry days in Sikkim include Republic Day (26 Jan), Independence Day (15 Aug), Gandhi Jayanti (2 Oct), and Sikkim State Day (16 May). Major religious dry days include Buddha Purnima, Guru Nanak Jayanti, and Eid-ul-Fitr.",
    "transitAndPossessionRule": "Personal possession is permitted up to 2 bottles of spirits and 6 bottles of beer. Bringing un-manifested commercial liquor from West Bengal across border checkposts is prohibited.",
    "penaltiesNotice": "Unlawful manufacturing or tax evasion is penalized under Section 38 of the Sikkim Excise Act, 1992.",
    "historyAndPolicy": "Sikkim has developed a thriving local spirits and brewing industry, producing celebrated Himalayan beers and liquors while maintaining eco-tourism and clean pedestrian zones in Gangtok.",
    "retailAndLicensingDetails": "Retail vends operate across all 6 districts. Gangtok features stylish modern restobars, live music pubs, and hotel lounges.",
    "licenseCategories": [
      {
        "code": "Retail Vend",
        "name": "Packaged Liquor Store",
        "description": "Off-premise sales of IMFL, local spirits, and beer (9:00 AM – 10:00 PM)."
      },
      {
        "code": "Bar License",
        "name": "Commercial Restobar & Pub License",
        "description": "Table service of alcoholic beverages in dining spaces and music lounges (up to 11:00 PM)."
      },
      {
        "code": "Brewery / Distillery",
        "name": "Himalayan Brewery License",
        "description": "Manufacturing license for commercial brewing and distillation in industrial sectors."
      }
    ],
    "interstateTransitGuidance": "Excise check-posts at Rangpo and Melli on the West Bengal border inspect commercial trucks and private vehicles. Tourists are permitted to carry up to 2 bottles with proof of purchase.",
    "onlineDeliveryPolicy": "Home delivery of liquor is prohibited in Sikkim.",
    "districtAndCityNuances": "Gangtok (MG Marg pedestrian corridor) observes strict commercial discipline where vends close at 10:00 PM. South and West Sikkim (Namchi, Pelling) feature eco-resort dining licenses.",
    "bespokeFaqs": [
      {
        "question": "What are pub and theka timings on MG Marg in Gangtok?",
        "answer": "Retail shops close at 10:00 PM, while certified pubs, restobars, and live-music lounges along MG Marg operate until 11:00 PM."
      },
      {
        "question": "Can tourists carry Sikkim-manufactured beer or spirits home?",
        "answer": "Tourists may carry up to 2 bottles with proof of purchase across the Rangpo checkpost into West Bengal."
      },
      {
        "question": "What local beers and spirits are manufactured in Sikkim?",
        "answer": "Sikkim houses celebrated Himalayan breweries and distilleries that produce well-known regional beers like Hit and Dansberg, as well as local fruit brandies and malt spirits."
      }
    ]
  },
  "tripura": {
    "actName": "Tripura Excise Act, 1987 & Tripura Excise Rules",
    "regulatoryAuthority": "Department of Taxes & Excise, Government of Tripura",
    "officialPortal": "https://tax.tripura.gov.in",
    "retailModel": "Auctioned Private Retail Foreign Liquor Off-Shops and On-Shops",
    "statutorySummary": "Tripura governs alcohol taxation and distribution under the Tripura Excise Act, 1987. Retail stores operate as private licensed \"Foreign Liquor Off-Shops\" (packaged retail) operating from 10:00 AM to 10:00 PM. Certified hotel bars and commercial restobars operate as \"On-Shops\". The minimum legal drinking age in Tripura is 21 years.",
    "standingDryDaysSummary": "Mandatory dry days in Tripura include Republic Day (26 Jan), Independence Day (15 Aug), Gandhi Jayanti (2 Oct), and Tripura Statehood Day (21 Jan). Religious dry days include Mahavir Jayanti, Buddha Purnima, Durga Puja (Bijoya Dashami), Eid-ul-Fitr, and Muharram.",
    "transitAndPossessionRule": "Personal possession is capped at 2 bottles of IMFL and 6 bottles of beer per person. Transporting commercial duty-unpaid liquor across the Assam border is prohibited.",
    "penaltiesNotice": "Violations are prosecuted under Section 46 of the Tripura Excise Act, 1987, carrying fines and confiscation.",
    "historyAndPolicy": "Tripura has modernized revenue collection through e-tendering of retail vends, standardizing retail markups, and monitoring consignments arriving through the Siliguri-Assam corridor.",
    "retailAndLicensingDetails": "Retail off-shops operate across all 8 districts. Commercial bars operate inside verified hotels in Agartala.",
    "licenseCategories": [
      {
        "code": "FL Off-Shop",
        "name": "Retail Foreign Liquor Vend",
        "description": "Packaged off-premise sales of IMFL, imported liquor, and beer (10:00 AM – 10:00 PM)."
      },
      {
        "code": "FL On-Shop",
        "name": "Commercial Bar & Restaurant",
        "description": "Table service of alcoholic beverages in certified dining rooms."
      },
      {
        "code": "Country Liquor Vend",
        "name": "Licensed Country Spirit Shop",
        "description": "Authorized retail counters for regulated country spirit distribution."
      }
    ],
    "interstateTransitGuidance": "The Churaibari check-post on the Assam-Tripura border inspects incoming commercial consignments. International border crossings with Bangladesh are guarded by BSF against cross-border smuggling.",
    "onlineDeliveryPolicy": "Home delivery of liquor is prohibited across Tripura.",
    "districtAndCityNuances": "Agartala urban municipal area features the primary concentration of licensed off-shops and restobars; rural tribal autonomous district council (TTAADC) areas follow local community norms.",
    "bespokeFaqs": [
      {
        "question": "What are retail wine shop hours in Agartala?",
        "answer": "Licensed Foreign Liquor Off-Shops operate from 10:00 AM to 10:00 PM across Agartala and district subdivisions."
      },
      {
        "question": "Can you bring alcohol into Tripura from Assam or West Bengal?",
        "answer": "Personal transit is limited to 2 bottles of IMFL with valid cash receipts. Commercial transit without an official Tripura Excise permit across the Churaibari border checkpost is illegal."
      },
      {
        "question": "Is alcohol allowed in tribal autonomous areas (TTAADC) in Tripura?",
        "answer": "Commercial sales are tightly regulated, and local tribal village councils in autonomous areas may enforce customary restrictions on public drinking."
      }
    ]
  },
  "meghalaya": {
    "actName": "Meghalaya Excise Act (adapted) & Meghalaya Liquor Licensing Rules",
    "regulatoryAuthority": "Excise, Registration, Taxation & Stamps Department, Government of Meghalaya",
    "officialPortal": "https://megexcise.gov.in",
    "retailModel": "Licensed Private Retail Vends & Vibrant Shillong Pub Culture",
    "statutorySummary": "Meghalaya regulates alcohol distribution under the adapted Meghalaya Excise Act. Renowned for its live music, cosmopolitan cafe culture, and cool climate, retail wine shops in Shillong and tourist towns operate from 9:00 AM to 10:00 PM. Commercial bars and hotel lounges operate until 11:00 PM. The minimum legal drinking age in Meghalaya is 21 years.",
    "standingDryDaysSummary": "Mandatory dry days in Meghalaya include Republic Day (26 Jan), Independence Day (15 Aug), Gandhi Jayanti (2 Oct), and Meghalaya Statehood Day (21 Jan). Religious and cultural dry days include Good Friday, U Tirot Sing Day (17 July), Seng Kut Snem (23 Nov), Eid-ul-Fitr, and Christmas Day (25 Dec).",
    "transitAndPossessionRule": "Personal domestic possession is limited to 2 bottles of IMFL and 6 bottles of beer. Bringing untaxed commercial consignments from Assam across border checkposts is prohibited.",
    "penaltiesNotice": "Unlawful transport or unlicensed commercial distribution is penalized under Section 53 of the Excise Act with fines and property seizure.",
    "historyAndPolicy": "Meghalaya’s excise governance intersects with constitutional protections for indigenous tribal communities under the Sixth Schedule. Autonomous District Councils (KHADC, JHADC, GHADC) maintain local commercial coordination.",
    "retailAndLicensingDetails": "Retail bonded warehouses supply licensed private off-shops. Shillong features iconic music cafes, colonial heritage clubs, and tourist restobars.",
    "licenseCategories": [
      {
        "code": "Retail Vend",
        "name": "Packaged Wine Store",
        "description": "Off-premise sales of IMFL, imported wine, and beer (9:00 AM – 10:00 PM)."
      },
      {
        "code": "Bar License",
        "name": "Music Cafe & Restobar License",
        "description": "Table service of alcoholic beverages in dining rooms and live music lounges (up to 11:00 PM)."
      },
      {
        "code": "Club License",
        "name": "Private Heritage Club Bar",
        "description": "Exclusive bar licenses for registered social and sports clubs."
      },
      {
        "code": "Traditional Brew Exemption",
        "name": "Customary Rice Brew Exemption",
        "description": "Customary domestic preparation of traditional Khasi/Garo rice beer (Kyad/Chubitchi)."
      }
    ],
    "interstateTransitGuidance": "Check-posts at Byrnihat and Khanapara on the Guwahati-Shillong National Highway inspect vehicles. Duty-unpaid alcohol from outside the state is confiscated.",
    "onlineDeliveryPolicy": "Online liquor delivery is prohibited across Meghalaya.",
    "districtAndCityNuances": "Shillong features active live-music restobar corridors (Police Bazar, Laitumkhrah); traditional village councils (dorbar shnong) can regulate the opening of new vends within local residential boundaries.",
    "bespokeFaqs": [
      {
        "question": "Can traditional village dorbars ban wine shops in Shillong?",
        "answer": "Yes. Traditional Khasi Dorbar Shnongs (locality councils) possess customary authority to oppose and prevent commercial liquor vends from opening in residential neighborhoods."
      },
      {
        "question": "What are pub timings in Shillong?",
        "answer": "Licensed music cafes, restobars, and heritage club bars in Police Bazar and Laitumkhrah operate until 11:00 PM."
      },
      {
        "question": "Can tourists drink alcohol in Cherrapunji (Sohra) and Dawki?",
        "answer": "Alcohol consumption in tourist destinations like Cherrapunji and Dawki is only legal inside certified resorts, guest houses, and licensed restobars; drinking in open waterfalls or public viewpoints is strictly banned."
      }
    ]
  },
  "manipur": {
    "actName": "Manipur Liquor Prohibition (Amendment) Act, 2023 & Manipur Excise Rules",
    "regulatoryAuthority": "Department of Excise, Government of Manipur",
    "officialPortal": "https://manipur.gov.in",
    "retailModel": "Regulated Legalization in District HQs & Star Hotels (Post-2023 Reform)",
    "statutorySummary": "Manipur enacted a landmark policy reform in December 2023 through the Manipur Liquor Prohibition (Amendment) Act, 2023, partially relaxing the total prohibition law that had been in force since 1991. The state cabinet authorized the regulated manufacture, distribution, and sale of liquor in district headquarters, greater Imphal, and certified star hotels to boost state revenue, support tourism, and eradicate illicit spurious alcohol. The legal drinking age is 21 years.",
    "standingDryDaysSummary": "Mandatory dry days include Republic Day (26 Jan), Independence Day (15 Aug), Gandhi Jayanti (2 Oct), and Manipur Statehood Day (21 Jan). Major cultural and religious dry days include Yaoshang (Holi), Eid-ul-Fitr, and Cheiraoba.",
    "transitAndPossessionRule": "Personal possession of legally purchased alcohol under the amended framework is subject to excise permits. Unlicensed cross-border smuggling from Myanmar or Assam remains strictly illegal.",
    "penaltiesNotice": "Smuggling contraband or illicit brewing is prosecuted under the Manipur Excise Act with rigorous imprisonment and fines.",
    "historyAndPolicy": "For over three decades, Manipur enforced total prohibition driven by women’s activist groups (Meira Paibis). The 2023 regulatory amendment established a controlled commercial model aimed at regulating quality and generating over ₹400 crore in annual state revenue.",
    "retailAndLicensingDetails": "Under the new framework, the state licenses authorized retail vends in municipal district headquarters and permits bar service inside certified star hotels.",
    "licenseCategories": [
      {
        "code": "District Retail Vend",
        "name": "Municipal Packaged Liquor Store",
        "description": "Authorized retail store operating under regulated hours in district headquarters."
      },
      {
        "code": "Hotel Bar",
        "name": "Star Hotel & Tourist Lounge License",
        "description": "Table service of alcoholic beverages inside certified commercial hotels."
      },
      {
        "code": "Export Distillery",
        "name": "Commercial Local Distillation",
        "description": "Licensed commercial brewing and distillation of local grain spirits for export."
      },
      {
        "code": "Tribal Brew Customary",
        "name": "Customary Indigenous Brew Exemption",
        "description": "Traditional domestic brewing rights protected in tribal hill districts."
      }
    ],
    "interstateTransitGuidance": "Check-posts along the Assam border (Jiribam) and Nagaland border (Mao) inspect vehicles. Border trade with Myanmar at Moreh is heavily guarded against contraband smuggling.",
    "onlineDeliveryPolicy": "Home delivery of alcohol is strictly prohibited in Manipur.",
    "districtAndCityNuances": "Regulated commercial sales are authorized in Imphal municipal areas and district headquarters; tribal hill districts (Churachandpur, Ukhrul, Senapati) retain traditional customary community practices.",
    "bespokeFaqs": [
      {
        "question": "What is the 2023 Manipur liquor policy reform?",
        "answer": "In December 2023, Manipur amended its 1991 prohibition act to permit regulated manufacture, distribution, and sale of alcohol in district headquarters and certified star hotels to boost revenue and curb spurious alcohol."
      },
      {
        "question": "Where can you buy alcohol in Manipur following the 2023 policy relaxation?",
        "answer": "Under the amended 2023 policy, regulated commercial alcohol sales are permitted in district headquarters, greater Imphal municipal zones, and certified star hotels; unlicensed bootlegging remains prohibited."
      },
      {
        "question": "Can tourists carry alcohol into Manipur across state borders?",
        "answer": "Interstate checkposts at Jiribam (Assam border) and Mao (Nagaland border) inspect incoming vehicles. Travelers may carry limited personal duty-paid alcohol with valid purchase receipts."
      }
    ]
  },
  "arunachal-pradesh": {
    "actName": "Arunachal Pradesh Excise Act, 1993 & AP Excise Rules, 1994",
    "regulatoryAuthority": "Department of Tax, Excise & Narcotics, Government of Arunachal Pradesh",
    "officialPortal": "https://arunachalexcise.gov.in",
    "retailModel": "Licensed APST Retail Vends & Customary Tribal Protections",
    "statutorySummary": "Arunachal Pradesh regulates alcohol production and retail under the Arunachal Pradesh Excise Act, 1993. In accordance with state policy, commercial retail licenses are granted exclusively to indigenous Arunachal Pradesh Scheduled Tribes (APST). Retail stores operate from 9:00 AM to 9:00 PM. Commercial bars operate inside certified hotels in Itanagar and tourist towns. The minimum legal drinking age in Arunachal Pradesh is 21 years.",
    "standingDryDaysSummary": "Mandatory dry days include Republic Day (26 Jan), Independence Day (15 Aug), Gandhi Jayanti (2 Oct), and Statehood Day (20 Feb). Major tribal festival days (Nyokum, Losar, Solung, Mopin) observe local dry notifications.",
    "transitAndPossessionRule": "Personal possession is limited to 2 bottles of IMFL and 6 bottles of beer. Visitors entering with an Inner Line Permit (ILP) are screened at entry checkgates.",
    "penaltiesNotice": "Illegal transport or bootlegging is penalized under Section 42 of the AP Excise Act, 1993, with fines and property seizure.",
    "historyAndPolicy": "Arunachal Pradesh balances state excise revenue with constitutional protections for indigenous tribes under the Bengal Eastern Frontier Regulation, 1873, exempting traditional fermented rice beers (Apong) from commercial excise duty.",
    "retailAndLicensingDetails": "Retail vends operate across all 26 districts under APST ownership. Tawang, Bomdila, and Ziro feature tourism-oriented hotel dining lounges.",
    "licenseCategories": [
      {
        "code": "IMFL Retail Vend",
        "name": "APST Packaged Liquor Store",
        "description": "Licensed retail vend owned by indigenous APST entrepreneurs (9:00 AM – 9:00 PM)."
      },
      {
        "code": "Bar & Restaurant",
        "name": "Hotel & Commercial Restaurant Bar",
        "description": "Table service of alcoholic beverages in certified dining rooms."
      },
      {
        "code": "Microbrewery",
        "name": "Hill Resort Craft Brewery",
        "description": "Craft brewing on-premise inside tourist destination lounges."
      },
      {
        "code": "Apong Customary Exemption",
        "name": "Traditional Tribal Brew Exemption",
        "description": "Statutory exemption for customary domestic brewing of traditional rice and millet beer (Apong)."
      }
    ],
    "interstateTransitGuidance": "Inner Line Permit (ILP) checkgates at Banderdewa, Hollongi, and Gumto inspect all arriving passenger vehicles. Carrying un-manifested commercial alcohol into the state is barred.",
    "onlineDeliveryPolicy": "Home delivery of liquor is prohibited across Arunachal Pradesh.",
    "districtAndCityNuances": "Itanagar and Naharlagun feature the primary concentration of commercial vends. High-altitude tourist circuits (Tawang, Dirang) operate tourism hotel bars during travel seasons.",
    "bespokeFaqs": [
      {
        "question": "Who can own retail wine shops in Arunachal Pradesh?",
        "answer": "Commercial retail licenses are statutorily reserved exclusively for indigenous Arunachal Pradesh Scheduled Tribes (APST)."
      },
      {
        "question": "Is traditional rice beer (Apong) legal in Arunachal?",
        "answer": "Yes. Customary household brewing of Apong and Marua is legally exempt from excise duties for traditional tribal festivals like Nyokum, Losar, and Solung."
      },
      {
        "question": "Can tourists bring alcohol through Inner Line Permit (ILP) checkgates into Arunachal Pradesh?",
        "answer": "Visitors entering Arunachal Pradesh with a valid ILP may carry up to 2 bottles of spirits for personal domestic use with verified retail receipts."
      }
    ]
  },
  "andaman-and-nicobar-islands": {
    "actName": "Andaman and Nicobar Islands Excise Regulation, 2012",
    "regulatoryAuthority": "Excise Department, Andaman and Nicobar Administration & ANIIDCO",
    "officialPortal": "https://andaman.gov.in",
    "retailModel": "100% State Corporation Retail (ANIIDCO) & Strict Tribal Reserves Ban",
    "statutorySummary": "The Andaman and Nicobar Islands Union Territory administers alcohol distribution through the state-owned Andaman and Nicobar Islands Integrated Development Corporation (ANIIDCO). Private retail wine stores are prohibited. Government retail shops operate from 10:00 AM to 8:30 PM. Commercial bars operate inside certified star hotels and beach resorts on tourist islands. The minimum legal drinking age is 21 years.",
    "standingDryDaysSummary": "Mandatory dry days include Republic Day (26 Jan), Independence Day (15 Aug), Gandhi Jayanti (2 Oct), and the 1st of every calendar month. Major religious observances include Mahavir Jayanti, Buddha Purnima, Guru Nanak Jayanti, Eid-ul-Fitr, and Good Friday.",
    "transitAndPossessionRule": "Personal possession is limited to 2 bottles of spirits and 6 bottles of beer with valid ANIIDCO receipts. Absolute statutory prohibition applies within all designated Tribal Reserve Areas under the ANPATR 1956 regulation.",
    "penaltiesNotice": "Carrying alcohol into or trading with indigenous tribal reserves (Jarawa, Sentinelese, Shompen) is a grave non-bailable offence under the Protection of Aboriginal Tribes Regulation, carrying up to 7 years rigorous imprisonment.",
    "historyAndPolicy": "The island administration balances tourist hospitality in Swaraj Dweep (Havelock) and Shaheed Dweep (Neil) with rigorous ecological and anthropological protections for vulnerable indigenous island tribes.",
    "retailAndLicensingDetails": "ANIIDCO operates standardized government counter shops in Port Blair, Havelock, and Neil. Beach resorts operate licensed hospitality lounges.",
    "licenseCategories": [
      {
        "code": "ANIIDCO Retail",
        "name": "Government Packaged Retail Shop",
        "description": "State-run retail store operating under 10:00 AM – 8:30 PM hours."
      },
      {
        "code": "Resort Bar",
        "name": "Island Beach Resort Bar License",
        "description": "Table service of alcoholic beverages in certified tourist beach resorts and dive lounges."
      },
      {
        "code": "Club Bar",
        "name": "Civilian & Armed Forces Club License",
        "description": "Bar service inside authorized civilian clubs and defense cantonments."
      },
      {
        "code": "Tribal Reserve Ban",
        "name": "Aboriginal Tribal Reserve Total Ban",
        "description": "Complete statutory ban on alcohol possession or transport in tribal reserve zones."
      }
    ],
    "interstateTransitGuidance": "Passenger baggage arriving at Veer Savarkar International Airport in Port Blair and sea passenger terminals (Haddo Wharf) is screened. Inter-island ferries heading toward tribal zones are heavily policed.",
    "onlineDeliveryPolicy": "Home delivery of liquor is completely prohibited in the Andaman and Nicobar Islands.",
    "districtAndCityNuances": "Havelock and Neil island beach cafes feature tourism hospitality bar licenses; South Andaman (Port Blair) features ANIIDCO vends. The Nicobar district and all tribal reserve zones enforce absolute statutory prohibition.",
    "bespokeFaqs": [
      {
        "question": "Who sells alcohol in Port Blair and Havelock?",
        "answer": "Alcohol retail is exclusively managed by the government-owned Andaman and Nicobar Islands Integrated Development Corporation (ANIIDCO); private retail stores are prohibited."
      },
      {
        "question": "Why is alcohol strictly prohibited in tribal reserves in Andaman?",
        "answer": "Under the Aboriginal Tribes Regulation, 1956, carrying alcohol into Jarawa, Sentinelese, or Nicobarese tribal reserves is a grave criminal offence carrying up to 7 years rigorous imprisonment."
      },
      {
        "question": "Are there wine shops on Havelock (Swaraj Dweep) and Neil (Shaheed Dweep)?",
        "answer": "Yes. ANIIDCO operates authorized packaged retail vends on Havelock and Neil islands, and licensed beach resorts provide on-premise bar service."
      }
    ]
  }
};

export function getStateExciseProfile(stateSlug: string): StateExciseProfile | undefined {
  return STATE_EXCISE_PROFILES[stateSlug];
}
