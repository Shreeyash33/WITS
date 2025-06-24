export default function formatDate(dateString: string | undefined): string {
  if (!dateString) return "";

  const parsedDate = new Date(dateString);
  if (isNaN(parsedDate.getTime())) return "";

  const formatter = new Intl.DateTimeFormat("en-us", {
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
    hour12: true,
  });

  return formatter.format(parsedDate);
}
