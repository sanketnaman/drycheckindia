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
});
