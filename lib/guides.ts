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
    seoTitle: 'Kerala Dry Days 2026: Official Dates, Election Order & Rules | DryCheck India',
    metaDescription:
      'Detailed legal analysis of Kerala Government Order G.O.(Rt)No.332/2026/TAXES for the 2026 Assembly election. Verified polling and counting dry dates, RPA Section 135C restrictions, and how to verify current status.',
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
