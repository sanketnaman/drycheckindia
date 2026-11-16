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
    seoTitle: 'Kerala Dry Days 2026: Dates, 1st-of-Month Rule',
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
    seoTitle: 'UP Dry Days 2026: Dates, Rules & Theka Timings',
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
    seoTitle: 'Delhi Dry Days 2026: Calendar & Theka Timings',
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
    seoTitle: 'Maharashtra Dry Days 2026: Dates, Rules & Timings',
    metaDescription:
      'Official Maharashtra dry days 2026 calendar. Check Mumbai & Pune festival closures (Kartiki Ekadashi, Ganpati Visarjan), dry districts (Wardha, Gadchiroli), and bar timings.',
    stateSlug: 'maharashtra',
    stateName: 'Maharashtra',
    region: 'West',
    excerpt:
      'Comprehensive guide to Maharashtra dry days in 2026, detailing Mumbai & Pune retail timings (10 AM–10:30 PM), major religious closures (Kartiki Ekadashi on 20 Nov, Ashadi Ekadashi, Ganpati Visarjan), total prohibition in Wardha & Gadchiroli districts, and Bombay Prohibition Act rules.',
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
        question: 'Why is Kartiki Ekadashi (20 November 2026) a dry day in Maharashtra?',
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
    seoTitle: 'Karnataka Dry Days 2026: Dates, Rules & Theka Timings',
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
    seoTitle: 'Rajasthan Dry Days 2026: Dates & 8 PM Theka Rules',
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
    seoTitle: 'Dry States in India 2026: Prohibition List & Rules',
    metaDescription:
      'Complete legal list of dry states in India 2026. Total prohibition in Bihar, Gujarat & Nagaland, restricted regimes in Mizoram & Lakshadweep, and open states.',
    stateSlug: 'gujarat',
    stateName: 'Gujarat',
    region: 'West',
    excerpt:
      'An exhaustive legal breakdown of alcohol prohibition in India under Article 47. Discover total prohibition states (Gujarat, Bihar, Nagaland), special restricted regimes (Mizoram, Lakshadweep), partial town bans in Uttarakhand (Haridwar, Rishikesh), tourist permit exemptions, and states debunked (Sikkim, Meghalaya, Jharkhand).',
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
          'In India, 3 states enforce complete statutory alcohol prohibition: Gujarat (since 1960), Bihar (enacted in 2016), and Nagaland (enacted under NLTP Act 1989). Special restricted regimes apply in Mizoram and Lakshadweep (check local rules). In total-prohibition states, retail liquor sale is permanently banned 365 days a year.',
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
    seoTitle: 'Dry Days in November 2026: All-India Calendar',
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
  {
    slug: 'diwali-2026-dry-day',
    title: 'Is Diwali 2026 a Dry Day? State-wise Rules (8 Nov)',
    h1Title: 'Is Diwali 2026 a Dry Day?',
    seoTitle: 'Is Diwali 2026 a Dry Day? State-wise Rules (8 Nov)',
    metaDescription:
      'Diwali 2026 (8 Nov) pe liquor shops ka state-wise rule. Delhi NCR, UP, Maharashtra aur baaki states ka status ek jagah.',
    stateSlug: 'haryana',
    stateName: 'Delhi NCR & All India',
    region: 'North / All-India',
    excerpt:
      'Complete legal guide to Diwali 2026 (8 November) dry day rules across India. Check 24-hour retail closures in Delhi NCR and UP, verify Maharashtra and Karnataka status, and explore the full state-by-state table.',
    primaryKeywords: [
      'is diwali 2026 a dry day',
      'diwali dry day 2026',
      'kya diwali pe sharab milegi',
      'delhi ncr diwali dry day',
      'diwali wine shop open or closed',
    ],
    secondaryKeywords: [
      'diwali theka timing today',
      'up dry day diwali 2026',
      'maharashtra diwali liquor rules',
      'is 8 november 2026 dry day',
      'dry days in november 2026',
    ],
    publishedDate: '2026-11-03',
    lastUpdatedDate: '2026-11-03',
    lastReviewedDate: '2026-11-03',
    readingTimeMinutes: 7,
    status: 'published',
    isHistorical: false,
    sources: [
      {
        title: 'Department of Excise, Entertainment & Luxury Tax, Government of NCT of Delhi - Gazette Dry Day Orders',
        organization: 'Department of Excise, Entertainment & Luxury Tax, Delhi',
        url: 'https://excise.delhigovt.nic.in',
        claimSupported:
          'Authoritative statutory dry-day notifications declaring 24-hour mandatory liquor sale closures across all retail stores and commercial bars in NCT Delhi on Diwali (Deepawali).',
      },
      {
        title: 'Uttar Pradesh Excise Department - Standing Gazetted Holiday & Dry Day Circulars',
        organization: 'Uttar Pradesh Excise Department',
        url: 'https://upexcise.gov.in',
        claimSupported:
          'Official calendar of mandatory dry days mandating complete closure of country liquor, foreign liquor (IMFL), beer thekas, and hotel/restaurant bars across all 75 UP districts on Diwali.',
      },
      {
        title: 'Rajasthan State Excise Department - Annual Gazetted Dry Days Schedule',
        organization: 'Excise Department, Government of Rajasthan',
        url: 'https://rajexcise.gov.in',
        claimSupported:
          'Statewide gazetted festival closure notification mandating complete 24-hour shutdown of licensed liquor vends across all districts on Diwali.',
      },
    ],
    faqs: [
      {
        question: 'Is Diwali pan-India dry day hai? (Is Diwali a nationwide dry day across India?)',
        answer:
          'No. There is no central pan-India alcohol prohibition on Diwali. In India, liquor licensing and dry-day declarations are strictly State Subjects under Entry 8 of the Seventh Schedule to the Constitution. States such as Delhi NCR, Uttar Pradesh, and Rajasthan declare a mandatory 24-hour dry day, whereas other states like Maharashtra, Tamil Nadu, and West Bengal permit normal retail operations unless localized directives are issued.',
      },
      {
        question: 'Delhi mein Diwali pe sharab milegi? (Can you buy alcohol in Delhi on Diwali?)',
        answer:
          'No. In the National Capital Territory of Delhi, all 600+ government-run retail thekas (managed by DTTDC, DSIIDC, DCCWS, and DSCSC) and commercial bars are completely closed on Diwali (8 November 2026) under official gazetted orders. Transporting liquor from Haryana or UP into Delhi is strictly illegal under Section 33 of the Delhi Excise Act, 2009.',
      },
      {
        question: 'Diwali pe bar aur wine shops band rehte hain? (Are bars and wine shops closed on Diwali?)',
        answer:
          'In states where Diwali is a gazetted dry day (such as Delhi NCR and Uttar Pradesh), all retail wine stores, model shops, beer vends, and commercial dining bars remain strictly closed for 24 hours. In states where Diwali is not a notified gazetted dry day, licensed outlets and hospitality venues operate during their normal permitted trading hours.',
      },
      {
        question: 'Rule kaise verify karein? (How to verify the real-time dry day rule for your state?)',
        answer:
          'You can verify today\'s and tomorrow\'s active legal status in real-time on DryCheck India\'s state-specific trackers (e.g., https://drycheck.in/india/delhi, https://drycheck.in/india/uttar-pradesh, or https://drycheck.in/india/maharashtra), or consult official circulars published by your State Excise Department.',
      },
      {
        question: 'Dry day ki list kahan milegi? (Where can you find the complete dry day list?)',
        answer:
          'The complete verified calendar of state-by-state dry days, festival closures, and election restrictions is available on DryCheck India\'s Guides Hub (https://drycheck.in/guides) and the interactive 36 States & UTs Directory on our homepage.',
      },
      {
        question: 'Diwali ke baad aur kab dry day hai? (When is the next dry day after Diwali 2026?)',
        answer:
          'Following Diwali (8 November), upcoming dry days in November 2026 include Kartiki Ekadashi on Friday, 20 November 2026 (a statewide mandatory dry day across Maharashtra) and Guru Nanak Jayanti / Kartik Purnima on Tuesday, 24 November 2026 (a mandatory dry day across Delhi, UP, Maharashtra, Rajasthan, and other states).',
      },
    ],
    relatedStateSlug: 'delhi',
    relatedGuideSlugs: [
      'delhi-dry-days-2026',
      'uttar-pradesh-dry-days-2026',
      'november-dry-days-2026',
      'maharashtra-dry-days-2026',
      'karnataka-dry-days-2026',
      'kerala-dry-days-2026',
    ],
  },
  {
    slug: 'west-bengal-dry-days-2026',
    title: 'West Bengal Dry Days 2026: Official Dates, Kolkata Rules & December Guidelines',
    h1Title: 'West Bengal Dry Days 2026: Official Dates, Kolkata Rules & December Guidelines',
    seoTitle: 'West Bengal Dry Days 2026: Dates, Rules & Kolkata Timings',
    metaDescription:
      'Official West Bengal dry days calendar 2026. Kolkata wine shop & bar timings, December/Christmas party rules, BEVCO regulations, and Bijoya Dashami dry dates.',
    stateSlug: 'west-bengal',
    stateName: 'West Bengal',
    region: 'East',
    excerpt:
      'Complete legal guide to West Bengal alcohol laws and dry days in 2026. Discover mandatory state gazette dry dates, Kolkata retail shop and late-night bar timings, December and Christmas operating rules, BEVCO regulations, and Bihar border transit warnings.',
    primaryKeywords: [
      'west bengal dry days 2026',
      'dry day in west bengal 2026',
      'kolkata dry days 2026',
      'dry day in kolkata',
      'dry day in west bengal december',
      'is christmas dry day in kolkata',
      'is 31 december dry day in west bengal',
      'kya aaj west bengal me dry day hai',
    ],
    secondaryKeywords: [
      'west bengal wine shop timings',
      'kolkata bar timings december',
      'bevco west bengal rules',
      'durga puja dry day west bengal',
      'bijoya dashami dry day kolkata',
      'west bengal legal drinking age',
      'alcohol transport west bengal to bihar',
      'west bengal excise act 1909',
    ],
    publishedDate: '2026-11-09',
    lastUpdatedDate: '2026-11-09',
    lastReviewedDate: '2026-11-09',
    readingTimeMinutes: 10,
    status: 'published',
    isHistorical: false,
    sources: [
      {
        title: 'Directorate of Excise - Official Gazette & Dry Day Orders',
        organization: 'Department of Finance, Government of West Bengal',
        url: 'https://excise.wb.gov.in',
        claimSupported:
          'Authoritative statutory dry-day notifications declaring mandatory closures for retail Foreign Liquor (FL) off-shops, Country Spirit (CS) outlets, and commercial on-shops across West Bengal.',
      },
      {
        title: 'West Bengal State Beverages Corporation Limited (WBSBCL / BEVCO)',
        organization: 'Government of West Bengal Public Enterprise',
        url: 'https://bevco.wb.gov.in',
        claimSupported:
          'Regulatory framework governing centralized alcoholic beverage warehousing, retail vend distribution, and pricing guidelines across all revenue districts of West Bengal.',
      },
      {
        title: 'The Bengal Excise Act, 1909 (Bengal Act V of 1909)',
        organization: 'West Bengal Legislative Assembly / Ministry of Law',
        url: 'https://wbexcise.gov.in',
        claimSupported:
          'Statutory legal framework prescribing legal drinking age (21 years per Section 51), individual possession quotas (9L Foreign Liquor), licensing categories (Off-Shop vs On-Shop), and penalty provisions.',
      },
    ],
    faqs: [
      {
        question: 'Is today a dry day in West Bengal / Kolkata?',
        answer:
          'To check today\'s real-time legal status in Kolkata, Howrah, Siliguri, or anywhere in West Bengal, consult our live IST tracker at https://drycheck.in/india/west-bengal. Standard mandatory statutory dry days in West Bengal are among the lowest in India, limited to Republic Day (26 January), Independence Day (15 August), Mahatma Gandhi Jayanti (2 October), Muharram, and Bijoya Dashami (idol immersion hours).',
      },
      {
        question: 'Is Christmas (25 December) a dry day in West Bengal?',
        answer:
          'No, Christmas (25 December) is NOT a dry day in West Bengal or Kolkata. Retail wine shops (FL off-shops) operate regular excise hours from 12:00 PM to 10:00 PM. In Kolkata, dining establishments, clubs, and pubs around Park Street, Salt Lake, and New Town often enjoy special extended night operating hours sanctioned by the Excise Department.',
      },
      {
        question: 'Is New Year\'s Eve (31 December) a dry day in Kolkata?',
        answer:
          'No, New Year\'s Eve (31 December) and New Year\'s Day (1 January) are strictly regular trading days in West Bengal. Bars, lounges, clubs, and star hotels in Kolkata operate throughout the evening with late-closing permits (often permitted until 1:00 AM, 2:00 AM, or 4:00 AM under special festive license extensions).',
      },
      {
        question: 'Are wine shops and thekas open during Durga Puja in West Bengal?',
        answer:
          'Yes, retail wine shops and bars remain completely open throughout the peak days of Durga Puja (Maha Saptami, Maha Ashtami, and Maha Navami) across Kolkata and West Bengal. The only dry restriction is notified on Bijoya Dashami (Dussehra), where liquor sales are prohibited either from 4:00 PM onwards or for the designated idol immersion window under local police commissionerate circulars.',
      },
      {
        question: 'What are the normal liquor shop and bar timings in West Bengal?',
        answer:
          'Under West Bengal Excise rules, retail "FL Off" stores and country spirit vends generally operate from 12:00 PM (Noon) to 10:00 PM (extended to 10:30 PM in select Kolkata Municipal Corporation areas). Licensed "On-shops" (bars, pubs, restaurants) serve liquor from 12:00 PM (Noon) to 12:00 Midnight, with late-closing luxury hotel bars permitted until 2:00 AM or later.',
      },
      {
        question: 'What is the legal drinking age in West Bengal?',
        answer:
          'The minimum legal drinking age in West Bengal is 21 years under Section 51 of the West Bengal Excise Act, 1909. Retailers and bars are legally forbidden from selling or serving alcohol to individuals under 21 years of age.',
      },
      {
        question: 'What is the maximum legal alcohol possession limit in West Bengal?',
        answer:
          'Under West Bengal Excise rules, an adult individual without a special commercial transport permit may legally possess up to 12 quart bottles (9 Litres) of Foreign Liquor (IMFL or imported spirits), up to 12 bottles (7.8 Litres) of Beer, and up to 4 bottles of Country Spirit for private consumption.',
      },
      {
        question: 'Can I carry alcohol from West Bengal into neighboring Bihar?',
        answer:
          'No. Transporting alcohol across the state border from West Bengal into Bihar (e.g., via Asansol, Barakar, Malda, or Siliguri border corridors) is a severe non-bailable criminal offence under the Bihar Prohibition and Excise Act, 2016. Highway checkposts and railway stations deploy canine squads and breathalyzers; unauthorized transport results in immediate arrest, heavy fines, and vehicle confiscation.',
      },
    ],
    relatedStateSlug: 'west-bengal',
    relatedGuideSlugs: [
      'dry-states-in-india-2026',
      'november-dry-days-2026',
      'diwali-2026-dry-day',
      'uttar-pradesh-dry-days-2026',
    ],
  },
  {
    slug: 'guru-nanak-jayanti-2026-dry-day',
    title: 'Is Guru Nanak Jayanti 2026 a Dry Day? State-wise Rules (24 Nov)',
    h1Title: 'Is Guru Nanak Jayanti 2026 a Dry Day in India? (24 November)',
    seoTitle: 'Guru Nanak Jayanti 2026 Dry Day: State Rules',
    metaDescription:
      'Official rules for Guru Nanak Jayanti dry day on 24 November 2026. Check mandatory liquor shop closures across Delhi NCR, UP, Punjab, Haryana & Rajasthan.',
    stateSlug: 'punjab',
    stateName: 'Punjab',
    region: 'North',
    excerpt:
      'Comprehensive legal guide to alcohol sale restrictions on Guru Nanak Jayanti (24 November 2026). Discover confirmed mandatory closures in Punjab, Delhi, Uttar Pradesh, Haryana, and Chandigarh, alongside open-state rules and liquor possession limits.',
    primaryKeywords: [
      'guru nanak jayanti dry day 2026',
      'is 24 nov dry day',
      'is guru nanak jayanti a dry day',
      'guru nanak jayanti liquor shop open or closed',
      'dry day in punjab on guru nanak jayanti',
      'delhi dry day 24 november 2026',
      'kya 24 november ko theka band hai',
    ],
    secondaryKeywords: [
      'prakash parv dry day',
      'guru tegh bahadur shaheedi diwas dry day',
      'haryana wine shop timings 24 nov',
      'up excise dry days november 2026',
      'chandigarh dry day 24 november',
      'punjab excise act 1914',
    ],
    publishedDate: '2026-11-16',
    lastUpdatedDate: '2026-11-16',
    lastReviewedDate: '2026-11-16',
    readingTimeMinutes: 9,
    status: 'published',
    isHistorical: false,
    sources: [
      {
        title: 'Department of Excise and Taxation - Annual Policy & Dry Day Circulars',
        organization: 'Government of Punjab',
        url: 'https://excise.punjab.gov.in',
        claimSupported:
          'Mandatory statewide closure of all licensed retail liquor vends (L-2, L-14A), microbreweries, and commercial hotel bars on Guru Nanak Jayanti under the Punjab Excise Act, 1914.',
      },
      {
        title: 'Department of Excise, Entertainment & Luxury Tax - Standing Order 2026',
        organization: 'Government of NCT of Delhi',
        url: 'https://excise.delhi.gov.in/notifications',
        claimSupported:
          'Standing annual gazetted dry-day order mandating 24-hour closure of all retail corporations (DTTDC, DSIIDC, DCCWS, DSCSC) and commercial hospitality licences on 24 November 2026.',
      },
      {
        title: 'Uttar Pradesh Excise Department - Gazetted Calendar 2026',
        organization: 'Government of Uttar Pradesh',
        url: 'https://upexcise.gov.in',
        claimSupported:
          'Official statewide mandate closing all retail thekas, model shops, and bars across all 75 revenue districts on Guru Nanak Jayanti / Guru Tegh Bahadur Shaheedi Diwas.',
      },
      {
        title: 'Excise & Taxation Department - UT Chandigarh Administration',
        organization: 'Chandigarh Administration',
        url: 'https://etdut.gov.in',
        claimSupported:
          'Statutory dry-day order enforcing total retail and on-premise alcohol closure across all sectors of Union Territory Chandigarh on 24 November.',
      },
    ],
    faqs: [
      {
        question: 'Is 24 November 2026 (Guru Nanak Jayanti) a dry day in Delhi?',
        answer:
          'Yes, 24 November 2026 is an official gazetted dry day in Delhi. Under the Delhi Excise Act, 2009, all government retail liquor vends (operated by DTTDC, DSIIDC, DCCWS, and DSCSC) and hotel/restaurant bars remain completely closed for the full 24-hour calendar day.',
      },
      {
        question: 'Are liquor shops and bars closed in Punjab on Guru Nanak Jayanti?',
        answer:
          'Yes, 24 November 2026 is a strictly enforced statewide dry day across all 23 districts of Punjab (including Amritsar, Ludhiana, Jalandhar, Patiala, and Mohali). All retail liquor vends, microbreweries, and commercial bars remain shut.',
      },
      {
        question: 'Is 24 November a dry day in Uttar Pradesh (UP)?',
        answer:
          'Yes, the Government of Uttar Pradesh observes 24 November 2026 as a mandatory statewide dry day across all 75 districts (including Noida, Ghaziabad, Lucknow, Kanpur, and Varanasi). All retail thekas and bar lounges remain shut.',
      },
      {
        question: 'Are wine shops and bars closed in Gurugram and Faridabad (Haryana)?',
        answer:
          'Yes, under Haryana Excise Department policy, Guru Nanak Jayanti is a gazetted dry day across Haryana. Retail liquor shops and commercial bars in Gurugram (including Cyber Hub and Sector 29) and Faridabad remain closed.',
      },
      {
        question: 'Is 24 November a dry day in Mumbai and Maharashtra?',
        answer:
          'No, Guru Nanak Jayanti is generally not a standing statewide gazetted dry day in Maharashtra. Retail wine shops and permit rooms in Mumbai and Pune operate regular licensed hours, though local District Collectors may issue localized circulars in pilgrimage centers such as Nanded.',
      },
      {
        question: 'Are alcohol shops open in Bangalore and Karnataka on 24 November?',
        answer:
          'Yes, retail liquor stores (CL-2) and pubs/microbreweries (CL-9) in Bengaluru and throughout Karnataka operate during standard licensed hours on 24 November, as Guru Nanak Jayanti is not classified as a statewide excise dry day under Karnataka rules.',
      },
      {
        question: 'Can hotel guests order alcohol on 24 November in dry states?',
        answer:
          'In states enforcing a mandatory dry day (such as Punjab, Delhi, and UP), commercial bar counters in star hotels cannot serve alcohol. Room service for resident guests is strictly governed by local district magistrate circulars; public consumption remains prohibited.',
      },
      {
        question: 'Can I consume alcohol at home on Guru Nanak Jayanti?',
        answer:
          'Yes, consuming legally purchased, duty-paid alcohol inside a private residence is not prohibited on dry days, provided it was acquired before the dry curfew and complies with state possession limits.',
      },
    ],
    relatedStateSlug: 'punjab',
    relatedGuideSlugs: [
      'delhi-dry-days-2026',
      'uttar-pradesh-dry-days-2026',
      'november-dry-days-2026',
      'rajasthan-dry-days-2026',
    ],
  },
  {
    slug: 'christmas-2026-dry-day',
    title: 'Is Christmas 2026 a Dry Day in India? (25 December Rules)',
    h1Title: 'Is Christmas 2026 a Dry Day in India? (25 December Rules)',
    seoTitle: 'Christmas 2026 Dry Day: State Rules (25 Dec)',
    metaDescription:
      'Is 25 December 2026 a dry day in India? Official excise rules for Christmas liquor sales across Goa, Delhi NCR, Mumbai, Bengaluru, Kolkata & Rajasthan.',
    stateSlug: 'goa',
    stateName: 'Goa',
    region: 'West',
    excerpt:
      'Comprehensive legal guide to alcohol sale regulations on Christmas Day (25 December 2026). Discover why Christmas is NOT a national gazetted dry day in India, check open theka timings in Goa, Delhi, Mumbai, Bengaluru, and Kolkata, and review temporary party license requirements.',
    primaryKeywords: [
      'christmas dry day 2026',
      'is 25 december dry day',
      'is christmas a dry day in india',
      'christmas liquor shop open or closed',
      'is christmas dry day in goa',
      'mumbai dry day 25 december',
      'delhi liquor shops open on christmas',
    ],
    secondaryKeywords: [
      'christmas eve bar timings',
      'kolkata park street christmas liquor rules',
      'bangalore pub timings 25 dec',
      'temporary party license fl-4',
      'christmas holiday theka timings',
    ],
    publishedDate: '2026-11-16',
    lastUpdatedDate: '2026-11-16',
    lastReviewedDate: '2026-11-16',
    readingTimeMinutes: 8,
    status: 'published',
    isHistorical: false,
    sources: [
      {
        title: 'Ministry of Home Affairs - National Public Holidays Calendar 2026',
        organization: 'Government of India',
        url: 'https://mha.gov.in',
        claimSupported:
          'Christmas is a central gazetted public holiday but is not designated as a mandatory statutory alcohol dry day under Central Government rules.',
      },
      {
        title: 'Office of the Commissioner of Excise - Annual Gazetted Dry Days 2026',
        organization: 'Government of Goa',
        url: 'https://goaexcise.gov.in',
        claimSupported:
          'Confirmation that Christmas Day (25 December) is fully operational for retail wine shops, shacks, and commercial hospitality bars in Goa.',
      },
      {
        title: 'Department of Excise, Entertainment & Luxury Tax - Standing Order 2026',
        organization: 'Government of NCT of Delhi',
        url: 'https://excise.delhi.gov.in',
        claimSupported:
          'Retail corporation vends and hospitality establishments operate under standard licensed operating schedules on 25 December.',
      },
    ],
    faqs: [
      {
        question: 'Is Christmas Day (25 December) a dry day in India?',
        answer:
          'No, Christmas is not a national gazetted dry day in India. Retail liquor shops (thekas), pubs, microbreweries, and hotel bars remain open across all major states including Goa, Maharashtra, Delhi NCR, Karnataka, and West Bengal.',
      },
      {
        question: 'Are liquor shops and beach shacks open in Goa on Christmas?',
        answer:
          'Yes, 25 December is one of Goa’s busiest commercial days. Retail wine shops, licensed beach shacks, and nightclubs remain completely open under normal operating hours.',
      },
      {
        question: 'Are wine shops and thekas open in Delhi and UP on 25 December?',
        answer:
          'Yes, government corporation retail stores in Delhi and private retail shops in Uttar Pradesh (Noida, Ghaziabad, Lucknow) operate standard retail hours (10:00 AM to 10:00 PM).',
      },
      {
        question: 'Can restaurants and bars serve alcohol on Christmas Eve (24 Dec)?',
        answer:
          'Yes, Christmas Eve is completely open. Commercial venues and lounges frequently operate under extended festival night permissions granted by municipal and excise authorities.',
      },
      {
        question: 'Do I need a special license for a private Christmas farmhouse party?',
        answer:
          'Yes, serving liquor at a hired banquet venue, farmhouse, or commercial terrace requires a one-day occasional license (such as L-49A in Delhi, FL-11 in UP, or FL-4 in Maharashtra).',
      },
      {
        question: 'Are alcohol shops closed in Bangalore and Mumbai on Christmas?',
        answer:
          'No, retail shops (CL-2 in Karnataka, FL-II in Maharashtra) and bars operate normal licensed hours in both Bengaluru and Mumbai.',
      },
      {
        question: 'Which Indian states remain dry on Christmas?',
        answer:
          'Only statutory total prohibition states—Bihar, Gujarat, Nagaland, and Mizoram—alongside the Lakshadweep archipelago remain dry, as alcohol is prohibited year-round in those jurisdictions.',
      },
      {
        question: 'Can tourists buy alcohol on Christmas in Kolkata?',
        answer:
          'Yes, retail off-shops in Kolkata operate from 10:00 AM to 10:00 PM, while Park Street on-premise bars and restaurants operate late into the evening during Christmas carnival festivities.',
      },
    ],
    relatedStateSlug: 'goa',
    relatedGuideSlugs: [
      'new-year-2027-dry-day',
      'goa-dry-days-and-liquor-rules',
      'delhi-dry-days-2026',
      'maharashtra-dry-days-2026',
    ],
  },
  {
    slug: 'new-year-2027-dry-day',
    title: 'Is New Year 2027 a Dry Day? 31 Dec & 1 Jan Rules in India',
    h1Title: 'Is New Year 2027 a Dry Day? 31 Dec & 1 Jan Rules in India',
    seoTitle: 'New Year 2027 Dry Day: 31 Dec & 1 Jan Rules',
    metaDescription:
      'Is 31 Dec or 1 Jan a dry day in India? Official excise rules for New Year 2027 liquor theka timings, party permits & extended bar hours across Delhi & Mumbai.',
    stateSlug: 'maharashtra',
    stateName: 'Maharashtra',
    region: 'West',
    excerpt:
      'Authoritative guide to alcohol sales, extended bar curfews, and retail vend timings for New Year’s Eve (31 December 2026) and New Year’s Day (1 January 2027). Discover metro-by-metro operating hours, Kerala’s 1st-of-month BEVCO dry day exception, and traffic police breathalyzer laws.',
    primaryKeywords: [
      'new year dry day 2027',
      'is 31 december dry day',
      'is 1 january dry day',
      'new year eve liquor shop timings',
      'is 31st dec dry day in delhi',
      'mumbai bar timings 31 december',
      'is new year a dry day in india',
    ],
    secondaryKeywords: [
      'kerala 1st of month dry day',
      'delhi 31 dec theka timings',
      'bangalore pub timings new year eve',
      'motor vehicles act section 185 drink and drive',
      'goa new year eve party hours',
    ],
    publishedDate: '2026-11-16',
    lastUpdatedDate: '2026-11-16',
    lastReviewedDate: '2026-11-16',
    readingTimeMinutes: 8,
    status: 'published',
    isHistorical: false,
    sources: [
      {
        title: 'State Excise Department - Annual Holiday & Notification Register',
        organization: 'Government of Maharashtra',
        url: 'https://stateexcise.maharashtra.gov.in',
        claimSupported:
          'Confirmation that 31 December and 1 January are commercial open days with specialized annual late-night hospitality extensions.',
      },
      {
        title: 'Foreign Liquor Rules (Rule 7A Statutory 1st-of-Month Directive)',
        organization: 'Kerala State Beverages Corporation (BEVCO)',
        url: 'https://keralaexcise.gov.in',
        claimSupported:
          'Statutory mandate that 1 January is a compulsory statewide dry day across all BEVCO retail stores and commercial bars under Rule 7A.',
      },
      {
        title: 'Delhi Traffic Police - New Year Traffic Management & Section 185 Protocol',
        organization: 'Delhi Police',
        url: 'https://delhitrafficpolice.nic.in',
        claimSupported:
          'Standard guidelines on Alcometer breathalyzer limits (30mg/100ml) and traffic nakas on 31 December.',
      },
    ],
    faqs: [
      {
        question: 'Is 31 December (New Year’s Eve) a dry day anywhere in India?',
        answer:
          'No, 31 December is never a dry day in any open Indian state or Union Territory. Retail stores, restaurants, clubs, and microbreweries operate normal or extended hours.',
      },
      {
        question: 'Is 1 January 2027 (New Year’s Day) a dry day?',
        answer:
          '1 January is an open day across almost all of India, except in Kerala where Rule 7A of the Foreign Liquor Rules mandates that the 1st of every calendar month is a mandatory dry day for BEVCO retail and private bars.',
      },
      {
        question: 'What time do liquor thekas close on 31 December in Delhi and UP?',
        answer:
          'Retail government vends in Delhi and private wine shops in Uttar Pradesh close at standard retail hours (10:00 PM). Customers should buy supplies during daytime hours.',
      },
      {
        question: 'Are bars open until 5:00 AM in Mumbai on New Year’s Eve?',
        answer:
          'Yes, the Maharashtra State Excise Department traditionally issues a special gazetted notification permitting FL-III restaurant and bar license holders to serve until 5:00 AM on the night of 31 December.',
      },
      {
        question: 'Can you buy alcohol on 1 January in Kerala?',
        answer:
          'No, all retail BEVCO vends and private bars are completely shut in Kerala on 1 January under the standing monthly dry-day order. Retail operations resume on 2 January.',
      },
      {
        question: 'What is the legal BAC limit for driving on New Year’s Eve?',
        answer:
          'Under Section 185 of the Motor Vehicles Act, driving with blood alcohol content (BAC) exceeding 30mg per 100ml is a punishable offense carrying an immediate ₹10,000 fine and driving license suspension.',
      },
      {
        question: 'Do hotel bars in Bangalore stay open late on New Year’s Eve?',
        answer:
          'Yes, Bengaluru city police and excise authorities typically extend commercial pub operating hours until 1:00 AM or 2:00 AM across MG Road, Brigade Road, and Indiranagar.',
      },
      {
        question: 'Are wine shops open in Goa on 31 December and 1 January?',
        answer:
          'Yes, both 31 December and 1 January are completely open commercial days across North and South Goa.',
      },
    ],
    relatedStateSlug: 'maharashtra',
    relatedGuideSlugs: [
      'christmas-2026-dry-day',
      'kerala-dry-days-2026',
      'delhi-dry-days-2026',
      'goa-dry-days-and-liquor-rules',
    ],
  },
  {
    slug: 'goa-dry-days-and-liquor-rules',
    title: 'Goa Dry Days & Liquor Rules 2026: Permits & Transit Limits',
    h1Title: 'Goa Dry Days & Liquor Rules 2026: Permits & Transit Limits',
    seoTitle: 'Goa Dry Days 2026: Permits & Transit Rules',
    metaDescription:
      'Official Goa dry days list for 2026, 2-bottle tourist permit rules, Form 25 transit guidelines, flight baggage limits & border checkpost penalties.',
    stateSlug: 'goa',
    stateName: 'Goa',
    region: 'West',
    excerpt:
      'Exhaustive guide to Goa’s standing dry days calendar, the mandatory 2-bottle liquor transit permit (Form 25), flight check-in baggage allowances under BCAS regulations, and severe border checkpost penalties along Maharashtra and Karnataka state lines.',
    primaryKeywords: [
      'goa dry days 2026',
      'goa liquor permit',
      'carrying alcohol from goa by flight',
      'goa to mumbai liquor checkpost',
      'how many bottles of alcohol allowed from goa',
      'goa liquor transport permit form 25',
      'patradevi checkpost liquor check',
    ],
    secondaryKeywords: [
      'goa excise duty act 1964',
      'carrying liquor on konkan railway',
      'bcas flight alcohol limit domestic',
      'dabolim airport liquor check-in limit',
      'mopa airport alcohol carriage rules',
    ],
    publishedDate: '2026-11-16',
    lastUpdatedDate: '2026-11-16',
    lastReviewedDate: '2026-11-16',
    readingTimeMinutes: 9,
    status: 'published',
    isHistorical: false,
    sources: [
      {
        title: 'Office of the Commissioner of Excise - Citizen Charter & Transport Rules',
        organization: 'Government of Goa',
        url: 'https://goaexcise.gov.in',
        claimSupported:
          'Provisions governing Form 25 liquor transit permits authorizing tourists to transport up to 2 bottles of IMFL/wine per permit outside Goa.',
      },
      {
        title: 'Bureau of Civil Aviation Security (BCAS) - Carriage of Liquids & Alcohol',
        organization: 'Ministry of Civil Aviation, Government of India',
        url: 'https://bcasindia.gov.in',
        claimSupported:
          'Permitting up to 5 litres of alcoholic beverages (24%–70% ABV) in registered passenger check-in baggage on domestic flights.',
      },
      {
        title: 'Maharashtra Prohibition Act, 1949 - Section 65 Border Enforcement Provisions',
        organization: 'State Excise Department, Government of Maharashtra',
        url: 'https://stateexcise.maharashtra.gov.in',
        claimSupported:
          'Statutory penalties and vehicle impoundment for transporting non-duty paid Goa liquor across Patradevi/Banda checkposts.',
      },
    ],
    faqs: [
      {
        question: 'How many dry days does Goa have in a year?',
        answer:
          'Goa has only 3 standing gazetted dry days each year: Republic Day (26 January), Independence Day (15 August), and Gandhi Jayanti (2 October), alongside temporary election curfews.',
      },
      {
        question: 'How many bottles of alcohol can I legally carry out of Goa?',
        answer:
          'Under Goa Excise rules, a tourist holding an official Form 25 permit can carry a maximum of 2 bottles (up to 750ml each) of IMFL, foreign liquor, or wine.',
      },
      {
        question: 'How do I get a Goa liquor transport permit (Form 25)?',
        answer:
          'Any licensed retail wine shop in Goa can issue a Form 25 permit instantly at the billing counter upon presenting a valid government photo ID. The fee is approximately ₹20–₹25.',
      },
      {
        question: 'Can I carry alcohol from Goa on a domestic flight?',
        answer:
          'Yes, in registered check-in baggage only. BCAS regulations permit up to 5 litres of alcoholic beverages (between 24% and 70% ABV) per passenger in secure commercial retail packaging.',
      },
      {
        question: 'Can I carry alcohol in cabin hand baggage on flights leaving Goa?',
        answer:
          'No, airport security completely bans liquids exceeding 100ml in cabin baggage. All liquor bottles must be packed securely in checked luggage.',
      },
      {
        question: 'Can I carry liquor from Goa on the train (Indian Railways)?',
        answer:
          'No, under Sections 164 and 165 of the Indian Railways Act, carrying alcohol in passenger train coaches is strictly prohibited and invites immediate RPF confiscation and fines.',
      },
      {
        question: 'Does Maharashtra recognize the Goa Form 25 permit at checkposts?',
        answer:
          'Maharashtra excise checkposts (Patradevi/Banda) do not automatically exempt travellers from Maharashtra state duty. Carrying commercial quantities across state borders results in seizure and arrest under Section 65 of the Maharashtra Prohibition Act.',
      },
      {
        question: 'Are liquor shops open in Goa on Christmas and New Year?',
        answer:
          'Yes, retail stores, beach shacks, and night lounges in North and South Goa are completely open on both Christmas (25 Dec) and New Year (31 Dec & 1 Jan).',
      },
    ],
    relatedStateSlug: 'goa',
    relatedGuideSlugs: [
      'christmas-2026-dry-day',
      'new-year-2027-dry-day',
      'maharashtra-dry-days-2026',
      'karnataka-dry-days-2026',
    ],
  },
  {
    slug: 'punjab-dry-days-and-liquor-timings',
    title: 'Punjab Dry Days & Liquor Timings 2026: Theka Rules',
    h1Title: 'Punjab Dry Days & Liquor Timings 2026: Theka Rules',
    seoTitle: 'Punjab Dry Days 2026: Rules & Timings',
    metaDescription:
      'Official Punjab dry days 2026 list, theka operating hours (9 AM–11 PM), Punjab Excise Act 1914 rules, L-2 vends & Chandigarh border transit quotas.',
    stateSlug: 'punjab',
    stateName: 'Punjab',
    region: 'North',
    excerpt:
      'Authoritative breakdown of Punjab’s retail liquor shop (theka) timings, L-2 and L-14A licenses under the Punjab Excise Act 1914, village panchayat prohibition powers under Section 26, standing religious dry days, and strict Chandigarh border smuggling penalties.',
    primaryKeywords: [
      'punjab dry days 2026',
      'punjab theka timings',
      'punjab excise act 1914',
      'ludhiana liquor shop timings',
      'amritsar wine shop open or closed',
      'chandigarh liquor carry in punjab penalty',
      'punjab legal drinking age',
    ],
    secondaryKeywords: [
      'punjab l-2 retail vend license',
      'section 26 punjab panchayati raj act',
      'punjab dry day list 2026',
      'shaheed bhagat singh martyrdom dry day',
      'guru gobind singh jayanti dry day punjab',
    ],
    publishedDate: '2026-11-16',
    lastUpdatedDate: '2026-11-16',
    lastReviewedDate: '2026-11-16',
    readingTimeMinutes: 8,
    status: 'published',
    isHistorical: false,
    sources: [
      {
        title: 'Department of Excise and Taxation - Annual State Excise Policy & Timings',
        organization: 'Government of Punjab',
        url: 'https://excise.punjab.gov.in',
        claimSupported:
          'Statutory operating hours (9:00 AM to 11:00 PM) for L-2 and L-14A retail vends in municipal corporation areas.',
      },
      {
        title: 'Punjab Excise Act, 1914 - Sections 29, 54 & 61 Enforcement Directives',
        organization: 'Government of Punjab',
        url: 'https://punjabrevenue.nic.in',
        claimSupported:
          'Legal drinking age of 25 years and criminal prosecution for unauthorized transport across Chandigarh borders.',
      },
      {
        title: 'Department of Rural Development & Panchayats - Section 26 Resolution Registry',
        organization: 'Government of Punjab',
        url: 'https://pbrdp.gov.in',
        claimSupported:
          'Statutory powers of Gram Sabhas to pass resolutions banning retail liquor vends within village boundaries.',
      },
    ],
    faqs: [
      {
        question: 'What are the official retail liquor shop (theka) timings in Punjab?',
        answer:
          'Under Punjab Excise Department rules, retail vends (L-2 for IMFL and L-14A for country liquor) in municipal corporations operate from 9:00 AM to 11:00 PM.',
      },
      {
        question: 'What is the legal drinking age in Punjab?',
        answer:
          'Under Section 29 of the Punjab Excise Act, 1914, the statutory legal drinking age in Punjab is 25 years. Selling liquor to persons under 25 is an offense.',
      },
      {
        question: 'Is Guru Nanak Jayanti a mandatory dry day in Punjab?',
        answer:
          'Yes, Guru Nanak Jayanti (Prakash Parv) is a full statewide dry day across Punjab. All retail vends, bars, and commercial hospitality counters are closed for 24 hours.',
      },
      {
        question: 'Can I bring cheaper liquor from Chandigarh into Punjab?',
        answer:
          'No, bringing liquor marked “For Sale in Chandigarh Only” into Punjab without a valid excise transit permit violates Section 61 of the Punjab Excise Act and attracts arrest, fines, and vehicle impoundment.',
      },
      {
        question: 'Can a village panchayat in Punjab ban liquor shops?',
        answer:
          'Yes, under Section 26 of the Punjab Panchayati Raj Act, 1994, a Gram Sabha can pass a resolution with a two-thirds majority before 30 September to prevent any liquor vend from opening in their village.',
      },
      {
        question: 'Is Shaheed Bhagat Singh Martyrdom Day (23 March) a dry day in Punjab?',
        answer:
          'Yes, the Punjab Government frequently notifies 23 March as a gazetted dry day in homage to Shaheed Bhagat Singh, Rajguru, and Sukhdev.',
      },
      {
        question: 'Are thekas open in Mohali on Sundays?',
        answer:
          'Yes, retail liquor stores in Mohali and across Punjab operate 7 days a week from 9:00 AM to 11:00 PM, closing only on gazetted dry days or election polling curfews.',
      },
      {
        question: 'What are the personal possession limits for alcohol in Punjab?',
        answer:
          'An adult individual of legal age may possess up to two bottles of IMFL/imported spirits or one case of beer for bona fide domestic consumption with valid retail invoices.',
      },
    ],
    relatedStateSlug: 'punjab',
    relatedGuideSlugs: [
      'guru-nanak-jayanti-2026-dry-day',
      'delhi-dry-days-2026',
      'rajasthan-dry-days-2026',
      'november-dry-days-2026',
    ],
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
