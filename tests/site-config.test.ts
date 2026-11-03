import { describe, test, expect } from 'vitest';
import { EDITOR_NAME, EDITOR_ROLE, EDITOR_BIO, CONTACT_EMAIL } from '@/lib/site-config';

describe('site-config — editorial configuration', () => {
  test('exports required string fields', () => {
    expect(typeof EDITOR_NAME).toBe('string');
    expect(typeof EDITOR_ROLE).toBe('string');
    expect(typeof EDITOR_BIO).toBe('string');
    expect(CONTACT_EMAIL).toBe('support@drycheck.in');
  });

  test('editor configuration does not contain placeholder strings', () => {
    expect(EDITOR_NAME, 'EDITOR_NAME must be replaced with real name').not.toMatch(/REPLACE_WITH/);
    expect(EDITOR_ROLE, 'EDITOR_ROLE must be replaced with real role').not.toMatch(/REPLACE_WITH/);
    expect(EDITOR_BIO, 'EDITOR_BIO must be replaced with real bio').not.toMatch(/REPLACE_WITH/);
  });
});
