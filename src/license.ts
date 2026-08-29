export const PRODUCT_SLUG = 'deposit-deadline-bridge';
const TOKEN_KEY = `sb_license:${PRODUCT_SLUG}`;
const VERDICT_KEY = `sb_license_verdict:${PRODUCT_SLUG}`;
const API_ROOT = 'https://api.sociobot.in/api/v1';

type Verdict = { valid: boolean; checkedAt: number };

export function checkoutUrl(): string {
  return `${API_ROOT}/products/${PRODUCT_SLUG}/checkout`;
}

/**
 * Accept a checkout return token without treating URL text as proof of a purchase.
 * A cached positive verdict can support offline use only after a prior successful
 * verification; every newly returned or pasted token starts locked.
 */
export function captureLicense(): boolean {
  const url = new URL(window.location.href);
  const token = url.searchParams.get('license')?.trim();
  if (!token) return false;
  localStorage.setItem(TOKEN_KEY, token);
  localStorage.setItem(VERDICT_KEY, JSON.stringify({ valid: false, checkedAt: 0 }));
  url.searchParams.delete('license');
  history.replaceState({}, '', `${url.pathname}${url.search}${url.hash}`);
  return true;
}

export function storeLicense(token: string): void {
  localStorage.setItem(TOKEN_KEY, token.trim());
  localStorage.setItem(VERDICT_KEY, JSON.stringify({ valid: false, checkedAt: 0 }));
}

export function removeLicense(): void {
  localStorage.removeItem(TOKEN_KEY);
  localStorage.removeItem(VERDICT_KEY);
}

export function cachedLicenseIsValid(): boolean {
  const token = localStorage.getItem(TOKEN_KEY);
  if (!token) return false;
  try {
    return Boolean((JSON.parse(localStorage.getItem(VERDICT_KEY) || '{}') as Verdict).valid);
  } catch {
    return false;
  }
}

export async function verifyLicense(force = false): Promise<boolean> {
  const token = localStorage.getItem(TOKEN_KEY);
  if (!token) return false;
  try {
    const cached = JSON.parse(localStorage.getItem(VERDICT_KEY) || '{}') as Verdict;
    if (!force && cached.checkedAt && Date.now() - cached.checkedAt < 86_400_000) return cached.valid;
  } catch { /* verify below */ }
  const response = await fetch(`${API_ROOT}/products/${PRODUCT_SLUG}/verify?license=${encodeURIComponent(token)}`);
  if (!response.ok) throw new Error('The license service is unavailable.');
  const result = await response.json() as { valid: boolean };
  localStorage.setItem(VERDICT_KEY, JSON.stringify({ valid: result.valid, checkedAt: Date.now() }));
  return result.valid;
}
