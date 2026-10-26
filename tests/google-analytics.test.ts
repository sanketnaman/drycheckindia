import { describe, expect, test, vi } from 'vitest';
import { renderToStaticMarkup } from 'react-dom/server';

// next/script renders a <script> tag; in the node test environment it falls
// back to a plain script element. We only assert on the rendered markup.
vi.mock('next/script', () => ({
  default: function MockScript(props: Record<string, unknown>) {
    const { src, id, strategy, children } = props as {
      src?: string;
      id?: string;
      strategy?: string;
      children?: string;
    };
    if (src) {
      return `<script data-src="${src}" data-strategy="${strategy ?? ''}"></script>`;
    }
    return `<script id="${id ?? ''}" data-strategy="${strategy ?? ''}">${children ?? ''}</script>`;
  },
}));

import GoogleAnalytics from '@/components/GoogleAnalytics';

describe('GoogleAnalytics component', () => {
  test('renders nothing when GA4 is not configured', () => {
    vi.stubEnv('NEXT_PUBLIC_GA_MEASUREMENT_ID', '');
    const markup = renderToStaticMarkup(GoogleAnalytics());
    expect(markup).toBe('');
  });

  test('renders nothing when the id is a placeholder', () => {
    vi.stubEnv('NEXT_PUBLIC_GA_MEASUREMENT_ID', 'G-XXXXXXXXXX');
    const markup = renderToStaticMarkup(GoogleAnalytics());
    expect(markup).toBe('');
  });

  test('renders the gtag script when a real id is configured', () => {
    vi.stubEnv('NEXT_PUBLIC_GA_MEASUREMENT_ID', 'G-9PWTNCZKZ2');
    const markup = renderToStaticMarkup(GoogleAnalytics());

    expect(markup).toContain('googletagmanager.com/gtag/js?id=G-9PWTNCZKZ2');
    // The initial page view is sent by gtag('config'); client-side
    // navigations are sent manually by usePageViews, which skips the first
    // render so the initial view is never double-counted.
    expect(markup).toContain('anonymize_ip: true');
    expect(markup).not.toContain('send_page_view: false');
    // The init script must reference the real id.
    expect(markup).toContain('G-9PWTNCZKZ2');
    expect(markup).toContain('gtag');
    expect(markup).toContain('config');
  });

  test('never renders a script tag for a placeholder id', () => {
    vi.stubEnv('NEXT_PUBLIC_GA_MEASUREMENT_ID', 'G-XXXXXXXXXX');
    const markup = renderToStaticMarkup(GoogleAnalytics());
    expect(markup).not.toContain('googletagmanager.com');
    expect(markup).not.toContain('gtag');
  });
});
