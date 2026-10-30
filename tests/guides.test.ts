import { describe, test, expect } from 'vitest';
import {
  getAllGuides,
  getPublishedGuides,
  getGuideBySlug,
  getPublishedGuideBySlug,
  getPublishedGuidesByState,
  getGuideStateSummary,
  GUIDES,
} from '@/lib/guides';
import { getStateBySlug } from '@/lib/dryday';
import sitemap from '@/app/sitemap';

describe('Guides Registry & Data Model', () => {
  test('GUIDES registry is defined and contains published Kerala guide', () => {
    const all = getAllGuides();
    expect(all.length).toBeGreaterThanOrEqual(1);

    const keralaGuide = all.find((g) => g.slug === 'kerala-dry-days-2026');
    expect(keralaGuide).toBeDefined();
    expect(keralaGuide?.status).toBe('published');
    expect(keralaGuide?.stateSlug).toBe('kerala');
  });

  test('every guide in registry has valid metadata and schema fields', () => {
    const all = getAllGuides();
    for (const guide of all) {
      // URL slug format
      expect(guide.slug).toMatch(/^[a-z0-9-]+$/);

      // Titles and meta
      expect(guide.title.length).toBeGreaterThan(15);
      expect(guide.h1Title.length).toBeGreaterThan(15);
      expect(guide.seoTitle.length).toBeGreaterThan(20);
      expect(guide.metaDescription.length).toBeGreaterThan(50);
      expect(guide.excerpt.length).toBeGreaterThan(50);

      // State reference validation
      const state = getStateBySlug(guide.stateSlug);
      expect(state).toBeDefined();
      expect(state?.slug).toBe(guide.stateSlug);

      // Dates
      expect(guide.publishedDate).toMatch(/^\d{4}-\d{2}-\d{2}$/);
      expect(guide.lastUpdatedDate).toMatch(/^\d{4}-\d{2}-\d{2}$/);
      expect(guide.lastReviewedDate).toMatch(/^\d{4}-\d{2}-\d{2}$/);

      // Keywords
      expect(guide.primaryKeywords.length).toBeGreaterThanOrEqual(1);
      expect(guide.secondaryKeywords.length).toBeGreaterThanOrEqual(1);

      // Reading time
      expect(guide.readingTimeMinutes).toBeGreaterThan(0);

      // Verified sources
      expect(guide.sources.length).toBeGreaterThanOrEqual(1);
      for (const src of guide.sources) {
        expect(src.title.length).toBeGreaterThan(5);
        expect(src.organization.length).toBeGreaterThan(3);
        expect(src.url).toMatch(/^https:\/\//);
        expect(src.claimSupported.length).toBeGreaterThan(10);
      }

      // FAQs
      expect(guide.faqs.length).toBeGreaterThanOrEqual(5);
      for (const faq of guide.faqs) {
        expect(faq.question.length).toBeGreaterThan(10);
        expect(faq.answer.length).toBeGreaterThan(20);
      }
    }
  });

  test('getPublishedGuides returns only published guides', () => {
    const published = getPublishedGuides();
    for (const g of published) {
      expect(g.status).toBe('published');
    }
  });

  test('getPublishedGuideBySlug returns the guide if published, undefined otherwise', () => {
    const guide = getPublishedGuideBySlug('kerala-dry-days-2026');
    expect(guide).toBeDefined();
    expect(guide?.title).toContain('Kerala Dry Days 2026');

    expect(getPublishedGuideBySlug('non-existent-slug')).toBeUndefined();
  });

  test('getPublishedGuidesByState filters correctly', () => {
    const keralaGuides = getPublishedGuidesByState('kerala');
    expect(keralaGuides.length).toBe(1);
    expect(keralaGuides[0].slug).toBe('kerala-dry-days-2026');

    const upGuides = getPublishedGuidesByState('uttar-pradesh');
    expect(upGuides.length).toBe(1);
    expect(upGuides[0].slug).toBe('uttar-pradesh-dry-days-2026');

    const delhiGuides = getPublishedGuidesByState('delhi');
    expect(delhiGuides.length).toBe(2);
    expect(delhiGuides.map((g) => g.slug)).toContain('delhi-dry-days-2026');
    expect(delhiGuides.map((g) => g.slug)).toContain('november-dry-days-2026');

    const mhGuides = getPublishedGuidesByState('maharashtra');
    expect(mhGuides.length).toBe(1);
    expect(mhGuides[0].slug).toBe('maharashtra-dry-days-2026');

    const karnatakaGuides = getPublishedGuidesByState('karnataka');
    expect(karnatakaGuides.length).toBe(1);
    expect(karnatakaGuides[0].slug).toBe('karnataka-dry-days-2026');

    const rajasthanGuides = getPublishedGuidesByState('rajasthan');
    expect(rajasthanGuides.length).toBe(1);
    expect(rajasthanGuides[0].slug).toBe('rajasthan-dry-days-2026');

    const gujaratGuides = getPublishedGuidesByState('gujarat');
    expect(gujaratGuides.length).toBe(1);
    expect(gujaratGuides[0].slug).toBe('dry-states-in-india-2026');

    const biharGuides = getPublishedGuidesByState('bihar');
    expect(biharGuides).toEqual([]);
  });

  test('getGuideStateSummary reports correct summary for published states', () => {
    const summary = getGuideStateSummary();
    const kerala = summary.find((s) => s.stateSlug === 'kerala');
    expect(kerala).toBeDefined();
    expect(kerala?.stateName).toBe('Kerala');
    expect(kerala?.guideCount).toBe(1);

    const up = summary.find((s) => s.stateSlug === 'uttar-pradesh');
    expect(up).toBeDefined();
    expect(up?.stateName).toBe('Uttar Pradesh');
    expect(up?.guideCount).toBe(1);
  });
});

describe('Uttar Pradesh Guide 2026 - Rules & Timings Verification', () => {
  const up = getPublishedGuideBySlug('uttar-pradesh-dry-days-2026');

  test('UP guide is defined and has valid stateSlug and keywords', () => {
    expect(up).toBeDefined();
    expect(up?.stateSlug).toBe('uttar-pradesh');
    expect(up?.stateName).toBe('Uttar Pradesh');
    expect(up?.region).toBe('North');
    expect(up?.isHistorical).toBe(false);

    expect(up?.primaryKeywords).toContain('up dry day 2026');
    expect(up?.primaryKeywords).toContain('dry day today in UP');
    expect(up?.primaryKeywords).toContain('today dry day in uttar pradesh');
    expect(up?.primaryKeywords).toContain('dry day in up tomorrow');
    expect(up?.primaryKeywords).toContain('kya aaj up me dry day hai');
  });

  test('UP guide includes verified sources including Kaanoon UP Excise link', () => {
    expect(up).toBeDefined();
    const kaanoonSource = up?.sources.find((s) => s.url.includes('kaanoon.com/157781/uttar-pradesh-excise-law-and-rules'));
    expect(kaanoonSource).toBeDefined();

    const upExciseSource = up?.sources.find((s) => s.url.includes('upexcise.gov.in'));
    expect(upExciseSource).toBeDefined();
  });

  test('UP guide FAQs cover required intent queries and keywords', () => {
    expect(up).toBeDefined();
    const questions = up?.faqs.map((f) => f.question.toLowerCase()) || [];
    expect(questions.some((q) => q.includes('kya aaj up me dry day hai'))).toBe(true);
    expect(questions.some((q) => q.includes('is tomorrow is dry day in up'))).toBe(true);
    expect(questions.some((q) => q.includes('operating timings'))).toBe(true);
    expect(questions.some((q) => q.includes('delhi or haryana'))).toBe(true);
  });
});

describe('Kerala Guide 2026 - Official Facts & Source Verification', () => {
  const kerala = getPublishedGuideBySlug('kerala-dry-days-2026');

  test('kerala guide has verified order metadata matching official government order', () => {
    expect(kerala).toBeDefined();
    const meta = kerala?.orderMetadata;
    expect(meta).toBeDefined();

    expect(meta?.orderNumber).toBe('G.O.(Rt)No.332/2026/TAXES');
    expect(meta?.department).toBe('Taxes (A) Department');
    expect(meta?.issuingAuthority).toContain('Government of Kerala');
    expect(meta?.signatory).toBe('K R Jyothilal, Additional Chief Secretary');
    expect(meta?.dateOfOrder).toContain('19 March 2026');
    expect(meta?.statutoryBasis).toContain('Section 135C of the Representation of the People Act, 1951');
    expect(meta?.pollingDate).toContain('09 April 2026');
    expect(meta?.countingDate).toContain('04 May 2026');
    expect(meta?.sourcePdfUrl).toBe(
      'https://www.ceo.kerala.gov.in/ceokerala/pdf/govt_orders/legislative-assembly-2026/government-orders/go-dry-day.pdf'
    );
  });

  test('kerala guide is flagged as historical with explanatory note', () => {
    expect(kerala?.isHistorical).toBe(true);
    expect(kerala?.historicalPeriodNote).toBeDefined();
    expect(kerala?.historicalPeriodNote).toContain('Historical election notification documentation');
  });

  test('kerala guide primary official source link matches Chief Electoral Officer Kerala PDF', () => {
    const officialPdfSource = kerala?.sources.find((s) =>
      s.url.includes('ceo.kerala.gov.in/ceokerala/pdf/govt_orders/legislative-assembly-2026/government-orders/go-dry-day.pdf')
    );
    expect(officialPdfSource).toBeDefined();
    expect(officialPdfSource?.documentNumber).toBe('G.O.(Rt)No.332/2026/TAXES');
  });
});

describe('Sitemap Integration', () => {
  test('sitemap contains /guides and /guides/kerala-dry-days-2026', async () => {
    const map = await sitemap();
    const urls = map.map((entry) => entry.url);

    expect(urls).toContain('https://drycheck.in/guides');
    expect(urls).toContain('https://drycheck.in/guides/kerala-dry-days-2026');
    expect(urls).toContain('https://drycheck.in/guides/uttar-pradesh-dry-days-2026');
    expect(urls).toContain('https://drycheck.in/guides/delhi-dry-days-2026');
    expect(urls).toContain('https://drycheck.in/guides/maharashtra-dry-days-2026');
    expect(urls).toContain('https://drycheck.in/guides/karnataka-dry-days-2026');
    expect(urls).toContain('https://drycheck.in/guides/rajasthan-dry-days-2026');
    expect(urls).toContain('https://drycheck.in/guides/dry-states-in-india-2026');
    expect(urls).toContain('https://drycheck.in/guides/november-dry-days-2026');

    // Confirm existing routes still exist
    expect(urls).toContain('https://drycheck.in');
    expect(urls).toContain('https://drycheck.in/about');
    expect(urls).toContain('https://drycheck.in/india/kerala');
    expect(urls).toContain('https://drycheck.in/india/delhi');

    // Confirm no duplicates
    const uniqueUrls = new Set(urls);
    expect(uniqueUrls.size).toBe(urls.length);
  });
});

describe('Dry States in India Guide 2026 - Prohibition & Open States Verification', () => {
  const guide = getPublishedGuideBySlug('dry-states-in-india-2026');

  test('guide is defined and targets prohibition queries', () => {
    expect(guide).toBeDefined();
    expect(guide?.slug).toBe('dry-states-in-india-2026');
    expect(guide?.stateSlug).toBe('gujarat');
    expect(guide?.primaryKeywords).toContain('is sikkim a dry state');
    expect(guide?.primaryKeywords).toContain('is uttarakhand a dry state');
    expect(guide?.primaryKeywords).toContain('is meghalaya a dry state');
    expect(guide?.primaryKeywords).toContain('is jharkhand dry state');
  });

  test('guide FAQs answer key user search queries', () => {
    const questions = guide?.faqs.map((f) => f.question.toLowerCase()) || [];
    expect(questions.some((q) => q.includes('uttarakhand'))).toBe(true);
    expect(questions.some((q) => q.includes('sikkim'))).toBe(true);
    expect(questions.some((q) => q.includes('meghalaya'))).toBe(true);
    expect(questions.some((q) => q.includes('jharkhand'))).toBe(true);
    expect(questions.some((q) => q.includes('gujarat'))).toBe(true);
  });
});

describe('November Dry Days Guide 2026 - Monthly Hub Verification', () => {
  const guide = getPublishedGuideBySlug('november-dry-days-2026');

  test('guide is defined and targets November festival queries', () => {
    expect(guide).toBeDefined();
    expect(guide?.slug).toBe('november-dry-days-2026');
    expect(guide?.stateSlug).toBe('delhi');
    expect(guide?.primaryKeywords).toContain('dry days in november 2026');
    expect(guide?.primaryKeywords).toContain('dry day in november 2026');
    expect(guide?.primaryKeywords).toContain('diwali dry day 2026');
    expect(guide?.primaryKeywords).toContain('guru nanak jayanti dry day 2026');
  });

  test('guide FAQs answer key November queries', () => {
    const questions = guide?.faqs.map((f) => f.question.toLowerCase()) || [];
    expect(questions.some((q) => q.includes('diwali'))).toBe(true);
    expect(questions.some((q) => q.includes('guru nanak jayanti'))).toBe(true);
    expect(questions.some((q) => q.includes('kartiki ekadashi'))).toBe(true);
    expect(questions.some((q) => q.includes('chhath puja'))).toBe(true);
  });
});
