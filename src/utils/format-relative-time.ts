const UNITS = {
  year: 24 * 60 * 60 * 1000 * 365,
  month: (24 * 60 * 60 * 1000 * 365) / 12,
  day: 24 * 60 * 60 * 1000,
  hour: 60 * 60 * 1000,
  minute: 60 * 1000,
  second: 1000,
};

const LOCALE = "ja";

const rtf = new Intl.RelativeTimeFormat(LOCALE, { numeric: "auto" });

export function formatRelativeTime(fromDate, toDate?) {
  const elapsed = fromDate - (toDate || new Date());

  for (let u in UNITS) {
    if (Math.abs(elapsed) > UNITS[u] || u === "second")
      return rtf.format(Math.round(elapsed / UNITS[u]), u as Intl.RelativeTimeFormatUnit);
  }

  return fromDate.toLocaleDateString(LOCALE);
}