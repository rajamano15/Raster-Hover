export type FieldErrors<T extends string> = Partial<Record<T, string>>;

export const isEmail = (v: string) =>
  /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(v.trim());

export const isPhone = (v: string) =>
  /^[+]?[\d\s()-]{7,18}$/.test(v.trim());

export function requiredMsg(label: string) {
  return `Please enter your ${label.toLowerCase()}.`;
}
