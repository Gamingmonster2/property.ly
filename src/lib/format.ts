export function formatPrice(
  value: number,
  currency: string,
  locale: string
): string {
  const numberLocale = locale === "ar" ? "ar-LY" : "en-US";
  try {
    return new Intl.NumberFormat(numberLocale, {
      style: "currency",
      currency,
      maximumFractionDigits: 0,
    }).format(value);
  } catch {
    return `${value.toLocaleString(numberLocale)} ${currency}`;
  }
}

export function formatNumber(value: number, locale: string): string {
  const numberLocale = locale === "ar" ? "ar-LY" : "en-US";
  return new Intl.NumberFormat(numberLocale).format(value);
}

// Approximate static FX rates (Phase 1). Live feed planned for Phase 2.
const RATES_TO_USD: Record<string, number> = {
  LYD: 5.05,
  USD: 1,
  EUR: 0.92,
  EGP: 50.4,
  AED: 3.67,
  SAR: 3.75,
  TRY: 42.6,
  TND: 3.1,
  MAD: 9.9,
  JOD: 0.71,
  KWD: 0.31,
  QAR: 3.64,
  OMR: 0.385,
  BHD: 0.376,
  IQD: 1310,
  DZD: 135,
  LBP: 89500,
  YER: 250,
  SDG: 600,
};

export function convertToUsd(price: number, currency: string): number | null {
  const rate = RATES_TO_USD[currency?.toUpperCase()];
  if (!rate) return null;
  return Math.round((price / rate) * 100) / 100;
}
