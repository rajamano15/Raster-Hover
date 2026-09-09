export type Stat = {
  value: number;
  suffix?: string;
  label: string;
};

/** Company statistics shown in the hero stats bar. */
export const HERO_STATS: Stat[] = [
  { value: 33, suffix: "+", label: "Years of Experience" },
  { value: 225, suffix: "+", label: "Parent Hospital Beds" },
  { value: 100, suffix: "+", label: "worldwide clients" },
  { value: 100, suffix: "+", label: "Software Engineers" },
  { value: 4, suffix: "+", label: "Awards" },
];
