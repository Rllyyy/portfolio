/**
 * Converts a date string in the format "day.month.year" to a formatted date string.
 * @param dateString - The date string in the format "day.month.year".
 * @param locale - The locale for formatting the date string.
 * @param options - The formatting options for the date.
 * @returns The formatted date string.
 */
export function getFormattedDate(dateString: string, local: string, options: Intl.DateTimeFormatOptions) {
  const [day, month, year] = dateString.split(".");
  const date = new Date(Number(year), Number(month) - 1, Number(day));

  return new Intl.DateTimeFormat(local, options).format(date);
}
