/**
 * State & UT Regulatory Guides Registry for DryCheck India.
 *
 * ARCHITECTURAL DESIGN & CONTENT GOVERNANCE:
 *
 * This module is the single source of truth for in-depth, long-form editorial
 * and regulatory guides on DryCheck India.
 *
 * How to add a new State/UT Guide:
 * 1. Define the guide entry in the `GUIDES` registry below.
 * 2. Ensure `stateSlug` exactly matches a valid slug in `data/dry-days.json`
 *    (as defined in `lib/dryday.ts`).
 * 3. Provide authoritative, verified sources from the respective State Excise
 *    Department, Chief Electoral Officer, Gazette notifications, or Government Orders.
 * 4. Set `status: 'draft'` while researching; change to `status: 'published'`
 *    when verified and reviewed.
 * 5. Dynamic routes (/guides/[slug]), sitemap generation (/sitemap.xml),
 *    and reciprocal interlinks on the state page (/india/[state-slug])
 *    will automatically recognize the guide without any route-level changes.
 */

export interface GuideSource {
  title: string;
  organization: string;
  url: string;
  documentNumber?: string;
  datePublished?: string;
  claimSupported: string;
}

export interface GuideFAQ {
  question: string;
  answer: string;
}

export interface GuideOrderMetadata {
  orderNumber: string;
  fileNumber?: string;
  issuingAuthority: string;
  department: string;
  signatory: string;
  dateOfOrder: string;
  statutoryBasis: string;
  electionAddressed?: string;
  pollingDate?: string;
  countingDate?: string;
  pollingDryWindow?: string;
  countingDryWindow?: string;
  rePollProvision?: string;
  geographicScope: string;
  sourcePdfUrl: string;
}

export interface Guide {
  slug: string;
  title: string;
  h1Title: string;
  seoTitle: string;
  metaDescription: string;
  stateSlug: string;
  stateName: string;
  region: string;
  excerpt: string;
  primaryKeywords: string[];
  secondaryKeywords: string[];
  publishedDate: string; // ISO format: YYYY-MM-DD
  lastUpdatedDate: string; // ISO format: YYYY-MM-DD
  lastReviewedDate: string; // ISO format: YYYY-MM-DD
  readingTimeMinutes: number;
  status: 'published' | 'draft';
  isHistorical: boolean;
  historicalPeriodNote?: string;
  sources: GuideSource[];
  faqs: GuideFAQ[];
  relatedStateSlug: string;
  relatedGuideSlugs?: string[];
  orderMetadata?: GuideOrderMetadata;
}

export const GUIDES: Guide[] = [
  {
    slug: 'kerala-dry-days-2026',
    title: 'Kerala Dry Days 2026: Official Dates, Election Restrictions and Rules',
    h1Title: 'Kerala Dry Days 2026: Official Dates, Election Restrictions and Rules',
    seoTitle: 'Kerala Dry Days 2026: Official Dates, BEVCO Monthly Closures & Rules | DryCheck India',
    metaDescription:
      'Official Kerala dry day dates for 2026, 1st of every month BEVCO closures under Foreign Liquor Rule 7A, Assembly election gazette restrictions, and store operating hours.',
    stateSlug: 'kerala',
    stateName: 'Kerala',
    region: 'South',
    excerpt:
      'An exhaustive analysis of Kerala Government Order G.O.(Rt)No.332/2026/TAXES governing alcohol sales restrictions during the 2026 Legislative Assembly election, covering polling closures, counting day rules, hotel/club bans, and official verification steps.',
    primaryKeywords: [
      'Kerala dry days 2026',
      'Kerala dry day list 2026',
    ],
    secondaryKeywords: [
      'Kerala election dry day 2026',
      'Kerala dry day dates 2026',
      'Kerala liquor ban dates 2026',
      'Kerala polling day dry day 2026',
      'Kerala counting day dry day 2026',
      'Kerala government dry day order 2026',
      'Kerala dry day notification',
      'dry day in Kerala',
      'Kerala alcohol sale restrictions',
    ],
    publishedDate: '2026-03-20',
    lastUpdatedDate: '2026-10-26',
    lastReviewedDate: '2026-10-26',
    readingTimeMinutes: 8,
    status: 'published',
    isHistorical: true,
    historicalPeriodNote:
      'Historical election notification documentation. Polling (09.04.2026) and counting (04.05.2026) dates have passed. This historical order does NOT determine whether today is a dry day in Kerala.',
    orderMetadata: {
      orderNumber: 'G.O.(Rt)No.332/2026/TAXES',
      fileNumber: 'TAXES-A2/104/2026-TAXES (File No A2/104/2026-Taxes)',
      issuingAuthority: 'Government of Kerala (By order of the Governor)',
      department: 'Taxes (A) Department',
      signatory: 'K R Jyothilal, Additional Chief Secretary',
      dateOfOrder: '19 March 2026 (19-03-2026)',
      statutoryBasis: 'Section 135C of the Representation of the People Act, 1951',
      electionAddressed: 'General Election to the Kerala Legislative Assembly, 2026 (ECI Press Note No.ECI/PN/029/2026)',
      pollingDate: '09 April 2026 (Thursday)',
      countingDate: '04 May 2026 (Monday)',
      pollingDryWindow: '48 hours ending with the hours fixed for the conclusion of poll on 09.04.2026',
      countingDryWindow: 'Full calendar day on 04.05.2026 (Monday)',
      rePollProvision: 'Full dry day on any designated date of re-poll, if scheduled',
      geographicScope: 'Statewide across the State of Kerala (all assembly polling areas and counting centres)',
      sourcePdfUrl:
        'https://www.ceo.kerala.gov.in/ceokerala/pdf/govt_orders/legislative-assembly-2026/government-orders/go-dry-day.pdf',
    },
    sources: [
      {
        title: 'G.O.(Rt)No.332/2026/TAXES - General Election to Kerala Legislative Assembly, 2026 - Declaration of Dry Day',
        organization: 'Taxes (A) Department, Government of Kerala',
        url: 'https://www.ceo.kerala.gov.in/ceokerala/pdf/govt_orders/legislative-assembly-2026/government-orders/go-dry-day.pdf',
        documentNumber: 'G.O.(Rt)No.332/2026/TAXES',
        datePublished: '2026-03-19',
        claimSupported:
          'Authoritative state government order mandating dry days for the 48 hours ending with poll conclusion on 09.04.2026, counting day on 04.05.2026, and re-polls; specifies bans across retail outlets, star hotels, clubs, and private storage.',
      },
      {
        title: 'Section 135C, Representation of the People Act, 1951 (Dry day on polling day in polling area)',
        organization: 'Legislative Department, Ministry of Law and Justice, Government of India',
        url: 'https://legislative.gov.in/sites/default/files/A1951-43.pdf',
        documentNumber: 'Act No. 43 of 1951',
        claimSupported:
          'Statutory mandate providing that no spirituous, fermented or intoxicating liquor or other substances shall be sold, given or distributed in hotels, taverns, shops or public/private places within a polling area during the 48 hours ending with the hour fixed for poll conclusion.',
      },
      {
        title: 'Election Commission of India Directive on Dry Days During General Elections',
        organization: 'Election Commission of India (ECI)',
        url: 'https://eci.gov.in',
        documentNumber: 'Letter No. 576/14/2026/EPS dated 16.03.2026 & Press Note ECI/PN/029/2026',
        datePublished: '2026-03-16',
        claimSupported:
          'ECI communication directing the State Government of Kerala to declare statutory dry days for 48 hours prior to poll closure and on the date of counting of votes.',
      },
      {
        title: 'Chief Electoral Officer, Kerala Election Communication',
        organization: 'Chief Electoral Officer, Kerala',
        url: 'https://www.ceo.kerala.gov.in',
        documentNumber: 'Letter No. EL3/65/2026-ELEC dated 16.03.2026',
        datePublished: '2026-03-16',
        claimSupported:
          'Official transmission of ECI directives to the Government of Kerala Taxes Department for statutory gazetting.',
      },
      {
        title: 'Kerala Abkari Act (1 of 1077 M.E.) & Foreign Liquor Rules',
        organization: 'Excise Department, Government of Kerala',
        url: 'https://excise.kerala.gov.in',
        claimSupported:
          'Statutory framework governing state liquor monopolies (BEVCO/Consumerfed), FL-3/FL-4A licensing, and standard recurring dry days (such as the 1st of every calendar month under Rule 7A).',
      },
    ],
    faqs: [
      {
        question: 'Was Kerala under an election-related dry-day order in 2026?',
        answer:
          'Yes. Under Government Order G.O.(Rt)No.332/2026/TAXES dated 19 March 2026, issued by the Taxes (A) Department by order of the Governor, Kerala declared statutory dry days for the 2026 Legislative Assembly election covering the 48 hours ending with poll conclusion on 9 April 2026 and the full counting day on 4 May 2026.',
      },
      {
        question: 'What were the exact polling and counting dates covered by the order?',
        answer:
          'The polling day was Thursday, 9 April 2026 (with alcohol sales prohibited for 48 hours ending at the conclusion of voting). The counting day was Monday, 4 May 2026 (a full-day dry day). Any re-poll dates were also designated as dry days.',
      },
      {
        question: 'Did the 2026 election dry-day order apply throughout Kerala?',
        answer:
          'Yes. Because the General Election to the Kerala Legislative Assembly encompassed all 140 constituencies across all 14 revenue districts, the dry-day order applied statewide to every polling area, municipality, panchayat, and counting centre in Kerala.',
      },
      {
        question: 'Did the order prohibit alcohol in star hotels, private clubs, and restaurants?',
        answer:
          'Yes. Paragraph 4 of the order explicitly directed that non-proprietary clubs, star hotels, and restaurants—even if holding valid excise licenses for possession and supply of liquor (such as FL-3 or FL-4A licenses)—were strictly prohibited from serving or selling liquor to anyone during the mandated periods.',
      },
      {
        question: 'Does this historical election order confirm whether today is a dry day in Kerala?',
        answer:
          'No. This guide documents a historical election order from April–May 2026. It does not establish today\'s dry-day status. For current real-time dry-day status in Kerala, please consult DryCheck India\'s live Kerala state page or the latest notifications from the Kerala Excise Department.',
      },
      {
        question: 'Where can I find and verify the original Kerala Government dry-day order?',
        answer:
          'The original order (G.O.(Rt)No.332/2026/TAXES) is officially hosted in PDF format by the Chief Electoral Officer, Kerala at https://www.ceo.kerala.gov.in/ceokerala/pdf/govt_orders/legislative-assembly-2026/government-orders/go-dry-day.pdf.',
      },
      {
        question: 'Why does Kerala observe regular dry days on the 1st of every calendar month?',
        answer:
          'Beyond election-specific orders, Kerala observes standing dry days on the 1st day of every English calendar month under Rule 7A of the Foreign Liquor Rules and state Abkari policy, alongside national holidays (Republic Day, Independence Day, Gandhi Jayanti) and state commemorations like Sree Narayana Guru Jayanti and Samadhi.',
      },
    ],
    relatedStateSlug: 'kerala',
  },
  {
    slug: 'uttar-pradesh-dry-days-2026',
    title: 'Uttar Pradesh Dry Days 2026: Upcoming Dates, Rules & Liquor Timings',
    h1Title: 'Uttar Pradesh Dry Days 2026: Upcoming Dates, Rules & Liquor Timings',
    seoTitle: 'UP Dry Day 2026: Upcoming Dates, Rules & Liquor Timings | DryCheck India',
    metaDescription:
      'Official UP dry day 2026 calendar & excise rules. Check if today or tomorrow is a dry day in UP, upcoming Diwali (8 Nov) & Guru Nanak Jayanti (24 Nov) closures.',
    stateSlug: 'uttar-pradesh',
    stateName: 'Uttar Pradesh',
    region: 'North',
    excerpt:
      'Complete guide to Uttar Pradesh dry days in 2026, featuring upcoming closures on 8 November (Diwali) and 24 November (Guru Nanak Jayanti / Shaheedi Diwas), normal retail (10 AM–10 PM) and bar timings, DM dry-day powers, legal drinking age 21, and strict interstate transport rules.',
    primaryKeywords: [
      'up dry day 2026',
      'dry day today in UP',
      'today dry day in uttar pradesh',
      'dry day in up tomorrow',
      'kya aaj up me dry day hai',
    ],
    secondaryKeywords: [
      'Dry day today',
      'tomorrow is dry day in up',
      'is tomorrow is dry day in up',
      'dry day in up today',
      'UP liquor shop timings',
      'Uttar Pradesh excise rules 2026',
      'UP alcohol possession limits',
    ],
    publishedDate: '2026-10-27',
    lastUpdatedDate: '2026-10-27',
    lastReviewedDate: '2026-10-27',
    readingTimeMinutes: 9,
    status: 'published',
    isHistorical: false,
    sources: [
      {
        title: 'Uttar Pradesh Excise Department Portal & Operating Hours Framework',
        organization: 'Excise Department, Government of Uttar Pradesh',
        url: 'https://upexcise.gov.in',
        claimSupported:
          'Official operating hours (retail 10:00 AM to 10:00 PM, bars 10:00 AM to 2:00 AM, star hotels up to 4:00 AM), statutory drinking age (21 years), and gazetted festival dry days including Diwali and Guru Nanak Jayanti.',
      },
      {
        title: 'Uttar Pradesh Excise Act, 1910 & Possession/Interstate Transit Rules',
        organization: 'Kaanoon Legal Database / UP State Legislature',
        url: 'https://www.kaanoon.com/157781/uttar-pradesh-excise-law-and-rules',
        documentNumber: 'U.P. Act No. IV of 1910',
        claimSupported:
          'Statutory personal possession limits (1.5 litres IMFL, 1.5 litres country-made liquor, 4 bottles beer) and strict prohibition against carrying or stocking alcohol brought from neighboring states.',
      },
      {
        title: 'Section 135C, Representation of the People Act, 1951 (Election Dry Day Mandates)',
        organization: 'Ministry of Law and Justice, Government of India',
        url: 'https://legislative.gov.in/sites/default/files/A1951-43.pdf',
        documentNumber: 'Act No. 43 of 1951',
        claimSupported:
          'Mandatory 48-hour closure prior to poll conclusion and full-day closure on vote counting day for parliamentary, assembly, and MLC elections in polling areas.',
      },
      {
        title: 'District Magistrate Statutory Licensing Orders & Law-and-Order Directives',
        organization: 'Office of the District Magistrate & Collectorate, Government of Uttar Pradesh',
        url: 'https://up.gov.in',
        claimSupported:
          'Statutory authority of District Magistrates under UP Excise Rules to declare localized dry days for religious processions, sensitive festivals, and law-and-order contingencies.',
      },
    ],
    faqs: [
      {
        question: 'Kya aaj UP me dry day hai? (Is today a dry day in Uttar Pradesh?)',
        answer:
          'To check whether today is a dry day in UP, consult DryCheck India\'s live Uttar Pradesh tracker. Unless today falls on a gazetted national holiday, major festival, or local administrative order, licensed liquor vends across UP operate normally from 10:00 AM to 10:00 PM.',
      },
      {
        question: 'Is tomorrow is dry day in UP? (Dry day in UP tomorrow)',
        answer:
          'Whether tomorrow is dry day in UP depends on the state excise calendar. You can check instant confirmation on our UP tracker. Upcoming confirmed dry days in November 2026 include Diwali on Sunday, 8 November 2026, and Guru Nanak Jayanti / Guru Tegh Bahadur Shaheedi Diwas on Tuesday, 24 November 2026.',
      },
      {
        question: 'What are the confirmed upcoming dry days in Uttar Pradesh in November 2026?',
        answer:
          'In November 2026, Uttar Pradesh observes two major statewide dry days: 8 November 2026 (Diwali / Deepawali) and 24 November 2026 (Guru Nanak Jayanti / Sri Guru Tegh Bahadur Shaheedi Diwas). All retail vends, model shops, and bar counters will remain closed on these dates.',
      },
      {
        question: 'What are the normal liquor shop and bar operating timings in UP?',
        answer:
          'On normal (non-dry) days, retail liquor shops and model shops operate from 10:00 AM to 10:00 PM. Licensed restaurant bars and clubs generally operate from 10:00 AM to 2:00 AM, while star-category hotel bars can serve until 4:00 AM under specialized luxury licenses.',
      },
      {
        question: 'What is the legal drinking age and individual possession limit in Uttar Pradesh?',
        answer:
          'The legal drinking age in Uttar Pradesh is 21 years. An individual is legally permitted to possess up to 1.5 litres of Indian-Made Foreign Liquor (IMFL), up to 1.5 litres of country liquor, or up to 4 bottles (650 ml each) of beer at home or in transit without a special personal bar license.',
      },
      {
        question: 'Can I bring alcohol from Delhi or Haryana into Uttar Pradesh?',
        answer:
          'No. Under the Uttar Pradesh Excise Act, importing, carrying, or stocking alcohol brought from any neighboring state (including Delhi and Haryana) into UP is strictly illegal, regardless of quantity. Border checkposts actively seize out-of-state bottles and penalize violators.',
      },
      {
        question: 'Can District Magistrates declare additional local dry days in UP?',
        answer:
          'Yes. District Magistrates (DMs) and licensing authorities have statutory powers to declare temporary local dry days within their districts during election polling, vote counting, sensitive religious yatras (such as Kanwar Yatra or Muharram processions), or sudden law-and-order situations.',
      },
    ],
    relatedStateSlug: 'uttar-pradesh',
  },
  {
    slug: 'delhi-dry-days-2026',
    title: 'Delhi Dry Days 2026: Official Calendar, Theka Timings & NCR (Gurugram/Noida) Rules',
    h1Title: 'Delhi Dry Days 2026: Official Calendar, Theka Timings & NCR (Gurugram/Noida) Rules',
    seoTitle: 'Delhi Dry Days 2026: Full Calendar, Liquor Timings & NCR Rules | DryCheck India',
    metaDescription:
      'Complete Delhi dry days 2026 calendar & excise department rules. Check festival closures, 10 AM–10 PM retail theka timings, and Gurugram/Noida border transit limits.',
    stateSlug: 'delhi',
    stateName: 'Delhi',
    region: 'North',
    excerpt:
      'Official guide to Delhi dry days in 2026, covering standing excise gazette closures (Republic Day, Independence Day, Gandhi Jayanti, Diwali, Guru Nanak Jayanti), government vend hours (10 AM–10 PM), Gurugram/Noida cross-border transit rules, and legal drinking age 21.',
    primaryKeywords: [
      'delhi dry days 2026',
      'dry day in delhi tomorrow',
      'is today a dry day in delhi',
      'is tomorrow dry day in delhi',
      'delhi theka timing today',
      'is wine shop open in gurugram today',
    ],
    secondaryKeywords: [
      'dry day delhi 2026 list',
      'delhi excise rules 2026',
      'gurgaon wine shop dry day',
      'noida dry day rules',
      'delhi liquor possession limit',
      'can i bring liquor from gurgaon to delhi',
      'dry day in new delhi',
      'dry day in south delhi',
    ],
    publishedDate: '2026-10-30',
    lastUpdatedDate: '2026-10-30',
    lastReviewedDate: '2026-10-30',
    readingTimeMinutes: 9,
    status: 'published',
    isHistorical: false,
    sources: [
      {
        title: 'Department of Excise, Entertainment and Luxury Tax, Government of NCT of Delhi',
        organization: 'Excise Department, Government of NCT of Delhi',
        url: 'https://excise.delhi.gov.in/notifications',
        claimSupported:
          'Authoritative statutory dry day notifications, annual holiday gazette lists, L-1/L-2 retail vend licensing guidelines, and operating timings across the National Capital Territory of Delhi.',
      },
      {
        title: 'Delhi Excise Act, 2009 (Delhi Act 07 of 2010)',
        organization: 'Government of NCT of Delhi / Legislative Department',
        url: 'https://delhi.gov.in',
        documentNumber: 'Act No. 07 of 2010',
        claimSupported:
          'Statutory framework establishing statutory legal drinking age (21 years), personal possession allowances (up to 9 litres of IMFL and 18 litres of beer/wine), and Section 33 penalties for unlawful interstate transport from Haryana/UP without permit.',
      },
    ],
    faqs: [
      {
        question: 'Is tomorrow a dry day in Delhi?',
        answer:
          'To verify if tomorrow is a dry day in Delhi, check our real-time IST tracker at https://drycheck.in/india/delhi. Standard mandatory gazetted dry days in Delhi include 26 January (Republic Day), 15 August (Independence Day), 2 October (Gandhi Jayanti), Diwali, and Guru Nanak Jayanti, alongside election notification closures.',
      },
      {
        question: 'What are the normal theka and wine shop timings in Delhi?',
        answer:
          'Licensed retail liquor vends operated by Delhi government corporations (DTTDC, DSIIDC, DCCWS, and DSCSC) operate strictly from 10:00 AM to 10:00 PM throughout the week, except on declared statutory dry days.',
      },
      {
        question: 'Are bars and restaurants open in Delhi on dry days?',
        answer:
          'On gazetted dry days, sale and service of alcohol is strictly prohibited in standalone bars, clubs, and dining restaurants (L-17/L-18 licenses). However, licensed bars located within luxury star-rated hotels (such as 4-star and 5-star properties holding valid excise permits) are occasionally permitted to serve in-house resident guests depending on specific excise orders.',
      },
      {
        question: 'Can I legally bring alcohol from Gurugram (Haryana) into Delhi on a dry day?',
        answer:
          'No. Under Section 33 of the Delhi Excise Act, 2009, transporting liquor purchased in another state (including Gurugram or Faridabad in Haryana) into Delhi without an excise transit permit is strictly illegal, regardless of whether it is a dry day. Violators face confiscation of liquor, vehicle seizure, and hefty fines or imprisonment.',
      },
      {
        question: 'What is the legal drinking age in Delhi?',
        answer:
          'The statutory legal drinking age in the National Capital Territory of Delhi is 21 years. Retail vends and licensed bars are legally prohibited from selling or serving alcohol to any individual below 21 years of age.',
      },
      {
        question: 'Which areas and localities of Delhi NCR are covered under these rules?',
        answer:
          'Delhi excise rules apply uniformly across all districts of the National Capital Territory, including New Delhi, South Delhi, North Delhi, West Delhi, East Delhi, Connaught Place, Saket, Hauz Khas, Dwarka, Rohini, and Karol Bagh. Neighboring NCR cities such as Gurugram and Faridabad follow Haryana excise rules, while Noida and Ghaziabad follow Uttar Pradesh excise regulations.',
      },
    ],
    relatedStateSlug: 'delhi',
  },
  {
    slug: 'maharashtra-dry-days-2026',
    title: 'Maharashtra Dry Days 2026: Mumbai & Pune Calendar, Local Bans & Festival Rules',
    h1Title: 'Maharashtra Dry Days 2026: Mumbai & Pune Calendar, Local Bans & Festival Rules',
    seoTitle: 'Maharashtra Dry Days 2026: Mumbai Calendar, Timings & Rules | DryCheck India',
    metaDescription:
      'Official Maharashtra dry days 2026 calendar. Check Mumbai & Pune festival closures (Kartiki Ekadashi, Ganpati Visarjan), dry districts (Wardha, Gadchiroli), and bar timings.',
    stateSlug: 'maharashtra',
    stateName: 'Maharashtra',
    region: 'West',
    excerpt:
      'Comprehensive guide to Maharashtra dry days in 2026, detailing Mumbai & Pune retail timings (10 AM–10:30 PM), major religious closures (Kartiki Ekadashi on 5 Nov, Ashadi Ekadashi, Ganpati Visarjan), total prohibition in Wardha & Gadchiroli districts, and Bombay Prohibition Act rules.',
    primaryKeywords: [
      'maharashtra dry days 2026',
      'tomorrow is dry day in maharashtra',
      'dry day in maharashtra tomorrow',
      'is tomorrow dry day in maharashtra',
      'dry day in mumbai',
      'dry day in pune',
    ],
    secondaryKeywords: [
      'maharashtra dry day list 2026',
      'next dry day in maharashtra',
      'kartiki ekadashi dry day 2026',
      'ganpati visarjan dry day mumbai',
      'is today dry day in amravati maharashtra',
      'today is dry day in chandrapur',
      'is tomorrow a dry day in nashik',
      'mumbai wine shop timings',
      'wardha dry district',
      'gadchiroli liquor ban',
    ],
    publishedDate: '2026-10-30',
    lastUpdatedDate: '2026-10-30',
    lastReviewedDate: '2026-10-30',
    readingTimeMinutes: 10,
    status: 'published',
    isHistorical: false,
    sources: [
      {
        title: 'State Excise Department, Government of Maharashtra - Standing Dry Day Orders',
        organization: 'State Excise Department, Government of Maharashtra',
        url: 'https://stateexcise.maharashtra.gov.in',
        claimSupported:
          'Official calendar of gazetted dry days in Maharashtra, including Ashadi Ekadashi, Kartiki Ekadashi, Ganpati Visarjan, and FL-I/FL-II liquor license operating frameworks.',
      },
      {
        title: 'Maharashtra Prohibition Act, 1949 (Bombay Act XXV of 1949)',
        organization: 'Law and Judiciary Department, Government of Maharashtra',
        url: 'https://bombayhighcourt.nic.in',
        documentNumber: 'Bombay Act XXV of 1949',
        claimSupported:
          'Statutory foundation governing alcohol possession permits, legal drinking age (21 for mild beer/wine, 25 for hard spirits), and district-level total statutory prohibition in Wardha and Gadchiroli.',
      },
    ],
    faqs: [
      {
        question: 'Is tomorrow a dry day in Maharashtra (Mumbai/Pune)?',
        answer:
          'To check if tomorrow is a dry day across Mumbai, Pune, Nagpur, or anywhere in Maharashtra, visit DryCheck India\'s live tracker at https://drycheck.in/india/maharashtra. Key recurring dry days include 26 January, 1 May (Maharashtra Day), 15 August, 2 October, Ashadi Ekadashi, Kartiki Ekadashi, and Anant Chaturdashi (Ganpati Visarjan).',
      },
      {
        question: 'Why is Kartiki Ekadashi (5 November 2026) a dry day in Maharashtra?',
        answer:
          'Kartiki Ekadashi marks the conclusion of the holy Pandharpur Wari pilgrimage dedicated to Lord Vitthal. The Government of Maharashtra and State Excise Department mandate a statewide dry day on this auspicious date, closing all retail wine shops, beer bars, and permit rooms across all revenue districts.',
      },
      {
        question: 'Are wine shops and bars open on Ganpati Visarjan in Mumbai and Pune?',
        answer:
          'No. Anant Chaturdashi (the final day of Ganesh Visarjan) is an official mandatory 24-hour dry day throughout Maharashtra. In cities like Mumbai, Pune, Thane, and Nashik, all licensed retail stores and permit rooms remain closed during immersion processions to maintain public order.',
      },
      {
        question: 'What are the standard liquor store and bar operating hours in Maharashtra?',
        answer:
          'In major urban areas like Mumbai, Pune, Thane, and Navi Mumbai, licensed retail wine shops (FL-BR-II) generally operate from 10:00 AM to 10:30 PM (country liquor vends close by 10:00 PM). Licensed permit rooms and bars operate from 11:00 AM to 1:30 AM, subject to municipal corporation permissions.',
      },
      {
        question: 'Which districts in Maharashtra enforce total statutory prohibition?',
        answer:
          'Wardha and Gadchiroli districts in Maharashtra are under complete statutory prohibition. Alcohol cannot be sold, purchased, transported, or possessed anywhere in Wardha (the historic home of Mahatma Gandhi\'s Sevagram and Acharya Vinoba Bhave\'s ashram) or Gadchiroli. In Chandrapur, prohibition was previously enacted in 2015 but lifted in 2021 by the state cabinet.',
      },
      {
        question: 'What is the legal drinking age in Maharashtra and is a permit required?',
        answer:
          'Under the Maharashtra Prohibition Act, the minimum legal drinking age is 21 years for mild beer and wine, and 25 years for hard spirits (IMFL/country liquor). Technically, consumers are required to hold a personal liquor permit issued by the State Excise Department for purchasing and possessing alcohol.',
      },
      {
        question: 'Which major cities in Maharashtra are covered under these excise rules?',
        answer:
          'Statewide excise rules and gazetted dry days apply uniformly across Mumbai, Pune, Nagpur, Nashik, Thane, Kalyan-Dombivli, Navi Mumbai, Chhatrapati Sambhajinagar, Amravati, Kolhapur, and Solapur.',
      },
    ],
    relatedStateSlug: 'maharashtra',
  },
  {
    slug: 'karnataka-dry-days-2026',
    title: 'Karnataka Dry Days 2026: Kannada Rajyotsava (1 Nov), Bengaluru Timings & Rules',
    h1Title: 'Karnataka Dry Days 2026: Kannada Rajyotsava (1 Nov), Bengaluru Timings & Rules',
    seoTitle: 'Karnataka Dry Days 2026: 1 Nov Rajyotsava, Timings & Rules | DryCheck India',
    metaDescription:
      'Official Karnataka dry days 2026 calendar. Check Kannada Rajyotsava (1 Nov) closure rules, Bengaluru pub timings, CL-2 retail hours, and Hubballi/Mysuru excise orders.',
    stateSlug: 'karnataka',
    stateName: 'Karnataka',
    region: 'South',
    excerpt:
      'Complete legal guide to Karnataka dry days in 2026, featuring Kannada Rajyotsava (1 November) holiday closure rules, Bengaluru pub & microbrewery timings, CL-2 retail theka hours (10 AM–10:30 PM), Hubballi-Dharwad city coverage, and legal drinking age 21.',
    primaryKeywords: [
      'karnataka dry days 2026',
      'is nov 1 dry day in karnataka',
      'is 1st november dry day in karnataka',
      'dry day in karnataka 2026',
      'bengaluru dry days 2026',
      'is today dry day in hubli',
    ],
    secondaryKeywords: [
      'dry day in dharwad',
      'bangalore pub timings today',
      'karnataka excise rules 2026',
      'mysore wine shop timings',
      'cl-2 retail timings karnataka',
      'kannada rajyotsava dry day',
    ],
    publishedDate: '2026-10-30',
    lastUpdatedDate: '2026-10-30',
    lastReviewedDate: '2026-10-30',
    readingTimeMinutes: 9,
    status: 'published',
    isHistorical: false,
    sources: [
      {
        title: 'Karnataka State Excise Department - Rules and Licensing Framework',
        organization: 'Excise Department, Government of Karnataka',
        url: 'https://stateexcise.karnataka.gov.in',
        claimSupported:
          'Authoritative statutory dry-day notifications, standing gazetted holiday schedules, CL-2 retail vend licensing rules, and operational timings across Karnataka.',
      },
      {
        title: 'Karnataka Excise Act, 1965 (Karnataka Act 21 of 1966)',
        organization: 'Department of Parliamentary Affairs & Legislation, Government of Karnataka',
        url: 'https://dpal.karnataka.gov.in',
        documentNumber: 'Act No. 21 of 1966',
        claimSupported:
          'Statutory framework establishing retail license categories (CL-2, CL-4, CL-9), minimum legal drinking age (21 years), and District Commissioner powers to order dry days for public order.',
      },
    ],
    faqs: [
      {
        question: 'Is 1 November (Kannada Rajyotsava) a dry day in Karnataka?',
        answer:
          'Kannada Rajyotsava (Karnataka Formation Day) is observed as a major state holiday on 1 November. While not a permanent statutory dry day under statewide rules, local District Commissioners and Police Commissioners frequently mandate alcohol closures in Bengaluru, Mysuru, and sensitive urban areas during state formation celebrations, rallies, and processions. Check DryCheck India\'s real-time tracker for the latest district orders.',
      },
      {
        question: 'What are the normal retail wine shop and theka timings in Karnataka?',
        answer:
          'Licensed CL-2 retail liquor stores across Karnataka (including Bengaluru, Mysuru, and Hubballi-Dharwad) operate from 10:00 AM to 10:30 PM. Outside of these hours, retail sale of alcohol is strictly prohibited under Karnataka Excise Rules.',
      },
      {
        question: 'What are the pub, club, and microbrewery timings in Bengaluru?',
        answer:
          'In Bengaluru, licensed pubs, clubs, and microbreweries (CL-9, CL-4 licenses) operate from 10:00 AM to 11:30 PM on weekdays, with weekend extensions permitting operation up to 1:00 AM in designated commercial zones with local police commissionerate clearances.',
      },
      {
        question: 'What are the mandatory annual dry days in Karnataka?',
        answer:
          'Standard statewide mandatory dry days in Karnataka include Republic Day (26 January), Independence Day (15 August), and Mahatma Gandhi Jayanti (2 October), alongside Mahavir Jayanti, Valmiki Jayanti, and election polling/counting windows notified by the Election Commission.',
      },
      {
        question: 'What is the minimum legal drinking age in Karnataka?',
        answer:
          'The minimum legal drinking age in Karnataka is 21 years under the Karnataka Excise (General Conditions of Licences) Rules. Establishments are legally prohibited from selling or serving alcohol to individuals under 21.',
      },
      {
        question: 'Which major cities in Karnataka are covered under these excise rules?',
        answer:
          'Karnataka excise rules and holiday closures apply uniformly across Bengaluru (Bangalore), Mysuru (Mysore), Mangaluru (Mangalore), Hubballi, Dharwad, Belagavi, Ballari, Kalaburagi, and Udupi.',
      },
    ],
    relatedStateSlug: 'karnataka',
  },
  {
    slug: 'rajasthan-dry-days-2026',
    title: 'Rajasthan Dry Days 2026: Official Dates, 8 PM Theka Rules & City List',
    h1Title: 'Rajasthan Dry Days 2026: Official Dates, 8 PM Theka Rules & City List',
    seoTitle: 'Rajasthan Dry Days 2026: Full Calendar, 8 PM Theka Rules | DryCheck India',
    metaDescription:
      'Official Rajasthan dry days 2026 calendar & excise rules. Check Jaipur, Jodhpur, Udaipur closures, strict 8 PM wine shop closing timings, and Mount Abu tourist limits.',
    stateSlug: 'rajasthan',
    stateName: 'Rajasthan',
    region: 'North',
    excerpt:
      'Authoritative guide to Rajasthan dry days in 2026, detailing the strict statewide 8:00 PM wine shop closing rule, annual gazetted festival closures (Mahavir Jayanti, Dussehra, Diwali), city-specific rules for Jaipur, Jodhpur, Udaipur, and Mount Abu tourist zones.',
    primaryKeywords: [
      'dry day in rajasthan',
      'rajasthan dry day list 2026',
      'is today dry day in rajasthan',
      'dry day in rajasthan today',
      'today is dry day in rajasthan',
      'is today dry day in jodhpur',
    ],
    secondaryKeywords: [
      'is today dry day in udaipur',
      'dry day in jaipur',
      'rajasthan wine shop timing',
      'mount abu dry day rules',
      'rajasthan theka 8 pm rule',
      'jodhpur liquor shops today',
    ],
    publishedDate: '2026-10-30',
    lastUpdatedDate: '2026-10-30',
    lastReviewedDate: '2026-10-30',
    readingTimeMinutes: 9,
    status: 'published',
    isHistorical: false,
    sources: [
      {
        title: 'Rajasthan Excise Department - Notifications and Standing Orders',
        organization: 'Excise Department, Government of Rajasthan',
        url: 'https://rajexcise.gov.in',
        claimSupported:
          'Official calendar of annual gazetted dry days in Rajasthan, 8:00 PM mandatory retail shop closing rules, and licensing guidelines for retail shops and hotel bars.',
      },
      {
        title: 'Rajasthan Excise Act, 1950 (Act No. II of 1950)',
        organization: 'Law Department, Government of Rajasthan',
        url: 'https://kaanoon.com',
        documentNumber: 'Act No. 02 of 1950',
        claimSupported:
          'Statutory foundation establishing legal drinking age (21 years), personal possession limits (12 bottles of IMFL/beer), and district-level dry day declaration powers of District Collectors.',
      },
    ],
    faqs: [
      {
        question: 'Why do wine shops and thekas close strictly at 8:00 PM in Rajasthan?',
        answer:
          'Since 2008, the Government of Rajasthan enforces a strict statewide 8:00 PM curfew for all retail liquor thekas (Indian Made Foreign Liquor and country liquor shops) across all cities including Jaipur, Jodhpur, and Udaipur. Dukaans must pull down shutters at 8:00 PM sharp to reduce late-night alcohol-related public nuisance.',
      },
      {
        question: 'Is today or tomorrow a dry day in Rajasthan (Jaipur, Jodhpur, Udaipur)?',
        answer:
          'To verify today\'s or tomorrow\'s live status in Rajasthan, check DryCheck India\'s real-time tracker at https://drycheck.in/india/rajasthan. Major recurring dry days include 26 January, 30 January (Shaheed Diwas), Mahavir Jayanti, Independence Day (15 August), Gandhi Jayanti (2 October), Dussehra, and Diwali.',
      },
      {
        question: 'Is Mount Abu a dry state or dry town in Rajasthan?',
        answer:
          'No, Mount Abu is not a dry town. Licensed liquor shops and hotel bars operate under standard Rajasthan Excise Department rules (wine shops close at 8:00 PM). However, open consumption of alcohol near sacred spots like Nakki Lake or within the wildlife sanctuary perimeter is strictly prohibited by local administration.',
      },
      {
        question: 'Are bars open in heritage hotels and resorts in Rajasthan?',
        answer:
          'Yes, licensed heritage hotels, luxury resorts, and standalone restaurants holding valid bar permits in Jaipur, Jodhpur, Udaipur, and Kota are permitted to serve liquor to dining guests until 11:00 PM (or 12:00 Midnight for special heritage permits). On statutory dry days, however, bar service is strictly closed.',
      },
      {
        question: 'What is the legal drinking age in Rajasthan?',
        answer:
          'The minimum legal drinking age in Rajasthan is 21 years. Retail vendors and hotel bars are prohibited from selling alcohol to any person below the age of 21.',
      },
      {
        question: 'Which cities in Rajasthan are covered under state excise dry-day orders?',
        answer:
          'Excise orders apply uniformly across Jaipur, Jodhpur, Udaipur, Kota, Bikaner, Ajmer, Mount Abu, Alwar, Bhilwara, Pushkar, and Bharatpur.',
      },
    ],
    relatedStateSlug: 'rajasthan',
  },
  {
    slug: 'dry-states-in-india-2026',
    title: 'Dry States in India 2026: Complete List of Prohibition States vs Open States',
    h1Title: 'Dry States in India 2026: Complete List of Prohibition States vs Open States',
    seoTitle: 'Dry States in India 2026: Complete Legal List & Rules | DryCheck India',
    metaDescription:
      'Complete legal list of dry states in India 2026. Learn about 5 total prohibition states (Bihar, Gujarat, Nagaland, Mizoram, Lakshadweep), holy town bans, and open states.',
    stateSlug: 'gujarat',
    stateName: 'Gujarat',
    region: 'West',
    excerpt:
      'An exhaustive legal breakdown of alcohol prohibition in India under Article 47. Discover the 5 total dry states and union territories (Gujarat, Bihar, Nagaland, Mizoram, Lakshadweep), partial town bans in Uttarakhand (Haridwar, Rishikesh), tourist permit exemptions, and states debunked (Sikkim, Meghalaya, Jharkhand).',
    primaryKeywords: [
      'dry states in india',
      'indian dry state list',
      'is sikkim a dry state',
      'is uttarakhand a dry state',
      'is meghalaya a dry state',
      'is jharkhand dry state',
    ],
    secondaryKeywords: [
      'dry state in india list 2026',
      'is andaman a dry state',
      'is pondicherry a dry state',
      'gujarat alcohol permit rules',
      'bihar liquor ban penalty',
      'is haridwar a dry city',
      'nagaland total prohibition act',
      'article 47 indian constitution alcohol',
    ],
    publishedDate: '2026-10-30',
    lastUpdatedDate: '2026-10-30',
    lastReviewedDate: '2026-10-30',
    readingTimeMinutes: 10,
    status: 'published',
    isHistorical: false,
    sources: [
      {
        title: 'Article 47, Directive Principles of State Policy - Constitution of India',
        organization: 'Ministry of Law and Justice, Government of India',
        url: 'https://legislative.gov.in',
        claimSupported:
          'Constitutional directive establishing that the State shall endeavor to bring about prohibition of the consumption except for medicinal purposes of intoxicating drinks and of drugs which are injurious to health.',
      },
      {
        title: 'Gujarat Prohibition Act, 1949 (Bombay Act XXV of 1949 as adapted to Gujarat)',
        organization: 'Prohibition & Excise Department, Government of Gujarat',
        url: 'https://kaanoon.com',
        claimSupported:
          'Statutory mandate governing statewide alcohol prohibition in Gujarat, legal visitor and tourist permit issuance frameworks, and GIFT City financial tech hub exceptions.',
      },
      {
        title: 'Bihar Prohibition and Excise Act, 2016',
        organization: 'Prohibition, Excise and Registration Department, Government of Bihar',
        url: 'https://state.bihar.gov.in',
        claimSupported:
          'Statewide total prohibition statute enacted in April 2016 banning manufacture, bottling, distribution, transportation, accumulation, possession, purchase, sale or consumption of intoxicants across Bihar with strict criminal penalties.',
      },
    ],
    faqs: [
      {
        question: 'Which states in India are currently complete dry states?',
        answer:
          'In India, 4 states and 1 union territory enforce complete statutory alcohol prohibition: Gujarat (since 1960), Bihar (enacted in 2016), Nagaland (enacted under NLTP Act 1989), Mizoram (Mizoram Liquor Prohibition Act 2019), and Lakshadweep (enforced throughout the archipelago except on uninhabited resort island Bangaram). In these territories, retail liquor sale is permanently banned 365 days a year.',
      },
      {
        question: 'Is Uttarakhand a dry state?',
        answer:
          'No, Uttarakhand is not a dry state. Alcohol is legally sold across the majority of Uttarakhand under state excise licensing. However, complete local prohibition is strictly enforced in notified sacred municipal zones and pilgrim corridors, specifically within the municipal limits of Haridwar, Rishikesh, Devprayag, and within a 5 km perimeter of Char Dham temples (Badrinath, Kedarnath, Gangotri, Yamunotri).',
      },
      {
        question: 'Is Sikkim a dry state?',
        answer:
          'No, Sikkim is definitely not a dry state. Alcohol is completely legal and widely available throughout Sikkim. In fact, Sikkim has a celebrated brewing and distilling tradition, producing famous organic liqueurs, local millet beers (Tongba), and branded spirits across Gangtok and other districts.',
      },
      {
        question: 'Is Meghalaya a dry state?',
        answer:
          'No, Meghalaya is not a dry state. Alcohol is openly sold through licensed retail stores, bars, and resorts across Shillong and all districts. Meghalaya has vibrant nightlife, craft breweries, and tourist hospitality hubs.',
      },
      {
        question: 'Is Jharkhand a dry state?',
        answer:
          'No, Jharkhand is not a dry state. While neighboring Bihar enforces strict prohibition, Jharkhand operates government-supervised retail liquor stores across Ranchi, Jamshedpur, Dhanbad, and all districts under the Jharkhand Excise Policy.',
      },
      {
        question: 'Is Andaman and Nicobar a dry state?',
        answer:
          'No, Andaman and Nicobar Islands are not under prohibition. Licensed retail liquor shops and hotel bars operate normally in Port Blair, Havelock Island (Swaraj Dweep), and Neil Island (Shaheed Dweep). Retail stores observe standard union territory excise dry days and restricted timings.',
      },
      {
        question: 'Is Pondicherry (Puducherry) a dry state?',
        answer:
          'No, Puducherry is not a dry state. On the contrary, Puducherry is famous as a popular tourist weekend destination from Tamil Nadu and Karnataka due to its significantly lower excise duties and thriving cafe and bar culture.',
      },
      {
        question: 'Can domestic or international tourists drink alcohol in Gujarat?',
        answer:
          'Yes. While Gujarat residents cannot purchase liquor without special health permits, non-resident Indian visitors and foreign tourists can legally obtain a Tourist Liquor Permit online via the official Gujarat Excise portal or at authorized permit hotels upon presenting valid travel documents (such as airline/train boarding passes and residence proof outside Gujarat). Additionally, GIFT City in Gandhinagar features licensed dining areas allowing service to authorized employees and official guests.',
      },
    ],
    relatedStateSlug: 'gujarat',
  },
  {
    slug: 'november-dry-days-2026',
    title: 'November Dry Days 2026: Official All-India Calendar, Festival Dates & City Rules',
    h1Title: 'November Dry Days 2026: Official All-India Calendar, Festival Dates & City Rules',
    seoTitle: 'November Dry Days 2026: Complete All-India Calendar & Festival Dates | DryCheck India',
    metaDescription:
      'Complete official calendar for November dry days 2026 in India. Check confirmed wine shop closures for Diwali (8 Nov), Guru Nanak Jayanti (24 Nov), Kartiki Ekadashi (20 Nov), and city rules.',
    stateSlug: 'delhi',
    stateName: 'National & All-India',
    region: 'North',
    excerpt:
      'An exhaustive month-ahead calendar and excise breakdown for November 2026 dry days across India. Details nationwide closures for Diwali (8 Nov) and Guru Nanak Jayanti (24 Nov), state-specific dry days in Karnataka (1 Nov Rajyotsava), Kerala (1 Nov BEVCO), Maharashtra (20 Nov Kartiki Ekadashi), and Chhath Puja riverfront regulations.',
    primaryKeywords: [
      'dry days in november 2026',
      'dry day in november 2026',
      'november dry day list 2026',
      'diwali dry day 2026',
      'guru nanak jayanti dry day 2026',
      'upcoming dry days 2026',
    ],
    secondaryKeywords: [
      'is nov 1 dry day in india',
      'is diwali a dry day in delhi',
      'is diwali dry day in mumbai',
      'wine shop open on diwali',
      'kartiki ekadashi 2026 dry day',
      'theka timing november 2026',
      'dry days in november',
      'liquor shop closed in november 2026',
    ],
    publishedDate: '2026-10-30',
    lastUpdatedDate: '2026-10-30',
    lastReviewedDate: '2026-10-30',
    readingTimeMinutes: 10,
    status: 'published',
    isHistorical: false,
    sources: [
      {
        title: 'Delhi Excise Department - Gazetted Dry Days and Festival Schedule 2026',
        organization: 'Department of Excise, Government of NCT of Delhi',
        url: 'https://excise.delhi.gov.in/notifications',
        claimSupported:
          'Authoritative statutory dry-day notifications declaring complete retail liquor store, theka, and vend closures on Diwali (8 Nov 2026) and Guru Nanak Jayanti (24 Nov 2026).',
      },
      {
        title: 'Maharashtra State Excise - Bombay Foreign Liquor & Dry Day Mandate',
        organization: 'State Excise Department, Government of Maharashtra',
        url: 'https://stateexcise.maharashtra.gov.in',
        claimSupported:
          'Official dry day orders enforcing 24-hour liquor bans on Diwali (8 Nov), Kartiki Ekadashi (20 Nov), and Guru Nanak Jayanti (24 Nov) across Mumbai, Pune, Nagpur, and Pandharpur.',
      },
      {
        title: 'Uttar Pradesh Excise Department - Standing Annual Excise Calendar 2026',
        organization: 'Department of Excise, Government of Uttar Pradesh',
        url: 'https://upexcise.gov.in',
        claimSupported:
          'Statewide gazetted holiday schedule mandating closure of licensed country liquor, foreign liquor, and beer vends on Diwali (Deepavali) and Guru Nanak Dev Jayanti.',
      },
    ],
    faqs: [
      {
        question: 'Which are the confirmed nationwide dry days in November 2026?',
        answer:
          'In November 2026, the primary nationwide gazetted dry days observed across almost all non-prohibition states (including Delhi, Maharashtra, Uttar Pradesh, Rajasthan, Punjab, and Karnataka) are Diwali / Lakshmi Puja on Sunday, 8 November 2026, and Guru Nanak Jayanti (Gurpurab / Kartik Purnima) on Tuesday, 24 November 2026. On these dates, all retail wine shops, thekas, and commercial liquor stores remain strictly closed.',
      },
      {
        question: 'Are wine shops and thekas open on Diwali (8 November 2026)?',
        answer:
          'No, retail wine shops and thekas are completely closed on Diwali (Sunday, 8 November 2026) across Delhi, Uttar Pradesh, Maharashtra, Rajasthan, Karnataka, Haryana, and most other states under gazetted festival orders. In hotel bars and premium restaurants, alcohol service depends on specific state L-4/FL-3 license exemptions, but off-premise retail purchase is strictly prohibited.',
      },
      {
        question: 'Is 1 November 2026 a dry day across India?',
        answer:
          'No, 1 November 2026 is not a nationwide dry day. However, it is observed as a dry day in specific states: in Kerala, government BEVCO and Consumerfed retail outlets are closed statewide under Rule 7A (1st of every month monthly dry day rule); in Karnataka, Kannada Rajyotsava is celebrated, during which local District Commissioners in Bengaluru, Mysuru, and sensitive zones frequently order dry days for public order.',
      },
      {
        question: 'Is Guru Nanak Jayanti (24 November 2026) a dry day?',
        answer:
          'Yes, Guru Nanak Jayanti (also coinciding with Kartik Purnima and Dev Deepawali on Tuesday, 24 November 2026) is a gazetted statutory dry day across Delhi, Punjab, Chandigarh, Haryana, Uttar Pradesh, Maharashtra, Rajasthan, and several other states. Retail liquor shops remain closed for the full 24-hour cycle.',
      },
      {
        question: 'Is Kartiki Ekadashi (20 November 2026) a dry day in Maharashtra?',
        answer:
          'Yes, Kartiki Ekadashi (Prabodhini Ekadashi, falling on Friday, 20 November 2026) is an official dry day in Maharashtra. It is observed with strict total closure in holy pilgrimage centres such as Pandharpur (Solapur district), and enforced across Mumbai, Pune, Nashik, and other districts per annual excise orders.',
      },
      {
        question: 'Are liquor shops closed on Chhath Puja (15-16 November 2026)?',
        answer:
          'In Bihar, alcohol is permanently prohibited year-round under the 2016 Act. In Uttar Pradesh, Jharkhand, and Delhi, municipal authorities and district magistrates frequently order local dry zones or ban alcohol sales within 1 to 2 kilometres of notified Chhath ghats along the Ganga and Yamuna rivers on Sunday evening (Sandhya Arghya, 15 Nov) and Monday morning (Usha Arghya, 16 Nov).',
      },
      {
        question: 'Can you buy alcohol from bars or clubs on dry days in November?',
        answer:
          'On major religious dry days like Diwali (8 Nov) and Guru Nanak Jayanti (24 Nov), standard commercial hotel bars, pubs, and clubs are required to halt alcohol service in most states. Only four-star and five-star classified hotels holding specialized international tourist licenses in select states may serve resident foreign guests in closed rooms.',
      },
    ],
    relatedStateSlug: 'delhi',
  },
];

/**
 * Returns all guides in the registry.
 */
export function getAllGuides(): Guide[] {
  return GUIDES;
}

/**
 * Returns only guides with `status: 'published'`.
 */
export function getPublishedGuides(): Guide[] {
  return GUIDES.filter((g) => g.status === 'published');
}

/**
 * Retrieves a single published guide by its URL slug.
 */
export function getPublishedGuideBySlug(slug: string): Guide | undefined {
  return GUIDES.find((g) => g.slug === slug && g.status === 'published');
}

/**
 * Retrieves any guide (draft or published) by its URL slug (for admin / previews).
 */
export function getGuideBySlug(slug: string): Guide | undefined {
  return GUIDES.find((g) => g.slug === slug);
}

/**
 * Retrieves all published guides associated with a specific state/UT slug.
 */
export function getPublishedGuidesByState(stateSlug: string): Guide[] {
  return GUIDES.filter(
    (g) => g.stateSlug === stateSlug && g.status === 'published'
  );
}

/**
 * Retrieves summary statistics of available guides by state.
 */
export function getGuideStateSummary(): Array<{
  stateSlug: string;
  stateName: string;
  region: string;
  guideCount: number;
}> {
  const published = getPublishedGuides();
  const map = new Map<string, { stateName: string; region: string; count: number }>();

  for (const guide of published) {
    const existing = map.get(guide.stateSlug);
    if (existing) {
      existing.count += 1;
    } else {
      map.set(guide.stateSlug, {
        stateName: guide.stateName,
        region: guide.region,
        count: 1,
      });
    }
  }

  return Array.from(map.entries()).map(([stateSlug, val]) => ({
    stateSlug,
    stateName: val.stateName,
    region: val.region,
    guideCount: val.count,
  }));
}
