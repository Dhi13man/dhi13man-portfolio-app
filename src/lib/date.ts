import { format, parseISO, parse } from "date-fns";

export function formatDate(date: string): string {
  if (!date) return "";
  if (date === "Present") return "Present";

  try {
    return format(parseISO(date), "MMM yyyy");
  } catch {
    // Log warning in development to help debug invalid date formats
    if (process.env.NODE_ENV === "development") {
      console.warn(`Invalid date format: "${date}". Expected ISO 8601 format.`);
    }
    return date;
  }
}

/**
 * Parse a date string in "MMM yyyy" format (e.g., "Jun 2023") or ISO format to a Date object.
 * Used for sorting by date.
 * @param dateStr - Date string in "MMM yyyy" or ISO format
 * @returns Date object, or epoch (1970) if parsing fails
 */
export function parseStartDate(dateStr: string): Date {
  if (!dateStr) return new Date(0);

  // Try ISO format first (e.g., "2023-01-01")
  try {
    const isoDate = parseISO(dateStr);
    if (!isNaN(isoDate.getTime())) {
      return isoDate;
    }
  } catch {
    // Continue to try other formats
  }

  // Try "MMM yyyy" format (e.g., "Jun 2023")
  try {
    const parsed = parse(dateStr, "MMM yyyy", new Date());
    if (!isNaN(parsed.getTime())) {
      return parsed;
    }
  } catch {
    // Continue to fallback
  }

  // Fallback: return epoch date
  return new Date(0);
}

export function formatDateRange(
  startDate: string,
  endDate: string | "Present",
): string {
  const start = formatDate(startDate);
  const end = formatDate(endDate);

  if (!start) return end || "";
  if (!end) return start;

  return `${start} - ${end}`;
}

export function isDatePresent(date: string): boolean {
  return date === "Present";
}
