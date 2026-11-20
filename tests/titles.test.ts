import { describe, test, expect } from 'vitest';
import { metadata as homeMetadata } from '@/app/page';
import { generateMetadata as generateStateMetadata } from '@/app/india/[state-slug]/page';
import { generateMetadata as generateDateMetadata } from '@/app/dry-days/[date]/page';
import { generateMetadata as generateGuideMetadata } from '@/app/guides/[slug]/page';
import { getPublishedGuides } from '@/lib/guides';

function resolveTitle(title: unknown): string {
  if (typeof title === 'string') {
    return `${title} | DryCheck India`;
  }
  if (title && typeof title === 'object' && 'absolute' in title) {
    return (title as { absolute: string }).absolute;
  }
  throw new Error(`Unexpected title format: ${JSON.stringify(title)}`);
}

function countOccurrences(str: string, substr: string): number {
  return str.split(substr).length - 1;
}

describe('Page Title & Metadata Formatting', () => {
  test('homepage title has DryCheck India exactly once and pre-brand <= 60 chars', () => {
    const finalTitle = resolveTitle(homeMetadata.title);
    const preBrand = finalTitle.replace(' | DryCheck India', '');
    console.log(`[Homepage] "${finalTitle}" (Pre-brand length: ${preBrand.length})`);
    expect(countOccurrences(finalTitle, 'DryCheck India')).toBe(1);
    expect(preBrand.length).toBeLessThanOrEqual(60);
  });

  test('state pages (uttar-pradesh, puducherry, dadra-and-nagar-haveli-and-daman-and-diu)', async () => {
    const testSlugs = [
      'uttar-pradesh',
      'puducherry',
      'dadra-and-nagar-haveli-and-daman-and-diu',
    ];

    for (const slug of testSlugs) {
      const meta = await generateStateMetadata({
        params: Promise.resolve({ 'state-slug': slug }),
      });
      const finalTitle = resolveTitle(meta.title);
      const preBrand = typeof meta.title === 'string' ? meta.title : '';
      console.log(`[State: ${slug}] "${finalTitle}" (Pre-brand length: ${preBrand.length})`);

      // (a) "DryCheck India" appears exactly once
      expect(countOccurrences(finalTitle, 'DryCheck India')).toBe(1);

      // (b) the part before the brand is <= 60 characters
      expect(preBrand.length).toBeLessThanOrEqual(60);
    }
  });

  test('date page title has no weekday and pre-brand <= 60 chars', async () => {
    const meta = await generateDateMetadata({
      params: Promise.resolve({ date: '2-october-2026' }),
    });
    const finalTitle = resolveTitle(meta.title);
    const preBrand = typeof meta.title === 'string' ? meta.title : '';
    console.log(`[Date: 2-october-2026] "${finalTitle}" (Pre-brand length: ${preBrand.length})`);

    expect(countOccurrences(finalTitle, 'DryCheck India')).toBe(1);
    expect(preBrand.length).toBeLessThanOrEqual(60);
    // Asserts no day of week
    expect(preBrand).not.toMatch(/^(Mon|Tue|Wed|Thu|Fri|Sat|Sun)/i);
    expect(preBrand).toBe('Is 2 October 2026 a Dry Day in India? State List');
  });

  test('date pages automatically apply noindex to past dates and index to future dates', async () => {
    // 27 October 2026 is in the past
    const pastMeta = await generateDateMetadata({
      params: Promise.resolve({ date: '27-october-2026' }),
    });
    expect(pastMeta.robots).toEqual({ index: false, follow: true });

    // 25 December 2026 is in the future
    const futureMeta = await generateDateMetadata({
      params: Promise.resolve({ date: '25-december-2026' }),
    });
    expect(futureMeta.robots).toEqual({ index: true, follow: true });
  });

  test('all published guides have DryCheck India exactly once and pre-brand <= 60 chars', async () => {
    const publishedGuides = getPublishedGuides();
    expect(publishedGuides.length).toBeGreaterThanOrEqual(1);

    const karnataka = publishedGuides.find((g) => g.slug === 'karnataka-dry-days-2026');
    expect(karnataka?.seoTitle).toBe('Karnataka Dry Days 2026: Dates, Rules & Theka Timings');

    for (const guide of publishedGuides) {
      const meta = await generateGuideMetadata({
        params: Promise.resolve({ slug: guide.slug }),
      });
      const finalTitle = resolveTitle(meta.title);
      const preBrand = typeof meta.title === 'string' ? meta.title : '';
      console.log(`[Guide: ${guide.slug}] "${finalTitle}" (Pre-brand length: ${preBrand.length})`);

      // (a) "DryCheck India" appears exactly once
      expect(countOccurrences(finalTitle, 'DryCheck India')).toBe(1);

      // (b) the part before the brand is <= 60 characters
      expect(preBrand.length).toBeLessThanOrEqual(60);
    }
  });

  test('all 36 states have unique authoritative excise profiles and zero boilerplate', async () => {
    const { STATE_EXCISE_PROFILES } = await import('@/lib/state-excise-profiles');
    const profileKeys = Object.keys(STATE_EXCISE_PROFILES);
    expect(profileKeys.length).toBe(36);

    const summaries = new Set<string>();
    for (const key of profileKeys) {
      const p = STATE_EXCISE_PROFILES[key];
      expect(p.actName.length).toBeGreaterThan(10);
      expect(p.regulatoryAuthority.length).toBeGreaterThan(10);
      expect(p.officialPortal.startsWith('https://') || p.officialPortal.startsWith('http://')).toBe(true);
      expect(p.retailModel.length).toBeGreaterThan(5);
      expect(p.statutorySummary.length).toBeGreaterThan(50);
      expect(p.standingDryDaysSummary.length).toBeGreaterThan(20);
      expect(p.transitAndPossessionRule.length).toBeGreaterThan(20);
      expect(p.penaltiesNotice.length).toBeGreaterThan(20);

      expect(summaries.has(p.statutorySummary)).toBe(false);
      summaries.add(p.statutorySummary);
    }
  });
});
