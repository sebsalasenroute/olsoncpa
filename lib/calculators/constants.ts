export const monthLabels = [
  "Jan",
  "Feb",
  "Mar",
  "Apr",
  "May",
  "Jun",
  "Jul",
  "Aug",
  "Sep",
  "Oct",
  "Nov",
  "Dec"
] as const;

export const monthKeys = monthLabels.map((_, index) => `m${index + 1}`);

export function defaultMonthGrid(value: number) {
  return monthKeys.reduce<Record<string, number>>((acc, key) => {
    acc[key] = value;
    return acc;
  }, {});
}
