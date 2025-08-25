import { createResource } from '../lib/createResource';
import { normalizeCo2Dataset } from '../utils/dataTransforms';
import { type NormalizedData } from '../types/co2';

const DATA_URL =
  '/React-perfomance/owid-co2-data.json';

async function fetchCo2(): Promise<NormalizedData> {
  const res = await fetch(DATA_URL, { cache: 'no-store' });
  if (!res.ok) throw new Error('Failed to fetch CO2 data');
  const json = await res.json();
  return normalizeCo2Dataset(json);
}

export const co2Resource = createResource<NormalizedData>(fetchCo2);