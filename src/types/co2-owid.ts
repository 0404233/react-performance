export interface OwidYearRow {
  year: number;
  [key: string]: number | string | null | undefined;
}

export interface OwidEntity {
  country?: string;
  iso_code?: string | null;
  region?: string | null;
  continent?: string | null;
  data?: OwidYearRow[];
}

export type OwidRoot = Record<string, OwidEntity | OwidYearRow[]>;