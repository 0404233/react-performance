import type { CountryData, NormalizedData, YearlyData } from '../types/co2';

export const DEFAULT_COLUMNS = ['year', 'population', 'co2', 'co2_per_capita'] as const;

function safeNameFromKey(key: string) {
  return key;
}

function tryMeta<T, O extends Record<string, unknown>>(
  obj: O | null | undefined,
  key: string,
  fallback: T
): T {
  return obj && key in obj && obj[key] !== undefined
    ? (obj[key] as T)
    : fallback;
}

function indexByYear(arr: YearlyData[]) {
  const map = new Map<number, YearlyData>();
  for (const row of arr) {
    map.set(row.year, row);
  }
  return map;
}

function getLatestYear(arr: YearlyData[]) {
  return arr.reduce((max, r) => (r.year > max ? r.year : max), -Infinity);
}

export function normalizeCo2Dataset(raw: Record<string, unknown>): NormalizedData {
  const countries: CountryData[] = [];
  const columnsSet = new Set<string>(DEFAULT_COLUMNS);
  const yearsSet = new Set<number>();
  const regionsSet = new Set<string>();

  for (const [key, value] of Object.entries(raw)) {
    let name: string;
    let iso: string | null = null;
    let region: string | null = null;
    let dataArr: YearlyData[] = [];

    if (
      value &&
      typeof value === 'object' &&
      !Array.isArray(value) &&
      Array.isArray((value as { data?: unknown }).data)
    ) {
      const valObj = value as Record<string, unknown>;
      name = tryMeta(valObj, 'country', safeNameFromKey(key));
      iso = tryMeta(valObj, 'iso_code', key.length === 3 ? key : null);
      region = tryMeta(valObj, 'region', tryMeta(valObj, 'continent', 'Other'));
      dataArr = valObj.data as YearlyData[];
    } else if (Array.isArray(value)) {
      name = safeNameFromKey(key);
      iso = key.length === 3 ? key : null;
      region = 'Other';
      dataArr = value as YearlyData[];
    } else {
      name = safeNameFromKey(key);
      iso = key.length === 3 ? key : null;
      region = 'Other';
    }

    for (const row of dataArr) {
      yearsSet.add(row.year);
      Object.keys(row).forEach((col) => columnsSet.add(col));
    }

    const latest = getLatestYear(dataArr);
    const byYear = indexByYear(dataArr);

    countries.push({ key, name, iso, region, data: dataArr, byYear, latestYear: latest });
    if (region) regionsSet.add(region);
  }

  const years = Array.from(yearsSet).sort((a, b) => a - b);
  const allColumns = Array.from(columnsSet);
  const regions = ['All', ...Array.from(regionsSet).sort()];

  return { countries, years, allColumns, regions };
}

export function getValueForYear(country: CountryData, year: number, field: string) {
  const row = country.byYear.get(year);
  return row?.[field] ?? 'N/A';
}

export function filterSearchSort(
  countries: CountryData[],
  opts: {
    regionFilter: string;
    searchQuery: string;
    sortBy: string;
    sortOrder: 'asc' | 'desc';
    selectedYear: number;
  }
) {
  const q = opts.searchQuery.toLowerCase();
  let list = countries;

  if (opts.regionFilter !== 'All') {
    list = list.filter((c) => c.region === opts.regionFilter);
  }
  if (q) {
    list = list.filter((c) => c.name.toLowerCase().includes(q));
  }
  if (opts.sortBy === 'population') {
    list = [...list].sort((a, b) => {
      const av = a.byYear.get(opts.selectedYear)?.population ?? -Infinity;
      const bv = b.byYear.get(opts.selectedYear)?.population ?? -Infinity;
      return opts.sortOrder === 'asc' ? av - bv : bv - av;
    });
  } else {
    list = [...list].sort((a, b) =>
      opts.sortOrder === 'asc'
        ? a.name.localeCompare(b.name)
        : b.name.localeCompare(a.name)
    );
  }
  return list;
}