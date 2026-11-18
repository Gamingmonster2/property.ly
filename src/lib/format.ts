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
