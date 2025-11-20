import { format, parseISO } from "date-fns";

export function formatDate(date: string): string {
  if (!date) return "";
  if (date === "Present") return "Present";

  try {
    return format(parseISO(date), "MMM yyyy");
  } catch {
    return date;
  }
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
