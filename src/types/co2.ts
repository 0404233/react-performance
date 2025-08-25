export interface YearlyData {
  year: number;
  population?: number;
  co2?: number;
  co2_per_capita?: number;
  [key: string]: number | string | undefined;
}

export interface CountryData {
  key: string;
  name: string;
  iso?: string | null;
  region?: string | null;
  data: YearlyData[];
  byYear: Map<number, YearlyData>;
  latestYear: number;
}

export interface NormalizedData {
  countries: CountryData[];
  years: number[];
  allColumns: string[];
  regions: string[];
}