import React, { useEffect, useState } from 'react';
import { type CountryData } from '../types/co2';
import DataTable from './DataTable';
import { getValueForYear } from '../utils/dataTransforms';

interface CountryCardProps {
  country: CountryData;
  selectedYear: number;
  selectedColumns: string[];
}

const CountryCard: React.FC<CountryCardProps> = ({
  country,
  selectedYear,
  selectedColumns
}) => {
  const [expanded, setExpanded] = useState(false);
  const [highlight, setHighlight] = useState(false);

  const latestPopulation = !country.latestYear
    ? 'N/A'
    : country.byYear.get(country.latestYear)?.population ?? 'N/A';

  const currPopulation = getValueForYear(country, selectedYear, 'population');

  useEffect(() => {
    setHighlight(true);
    const t = setTimeout(() => setHighlight(false), 700);
    return () => clearTimeout(t);
  }, [selectedYear]);

  return (
    <div className="country-card">
      <div className="country-header">
        <div className="title">
          <div className="name">{country.name}</div>
          <div className="meta">
            <span className="tag">{country.iso ?? 'N/A'}</span>
            <span className="tag">{country.region ?? 'Other'}</span>
          </div>
        </div>

        <div className="stats">
          <div className={`stat ${highlight ? 'highlight' : ''}`}>
            <div className="stat-label">Население ({selectedYear})</div>
            <div className="stat-value">{formatNumber(currPopulation)}</div>
          </div>
          <div className="stat">
            <div className="stat-label">Население (последний год)</div>
            <div className="stat-value">{formatNumber(latestPopulation)}</div>
          </div>
        </div>

        <button
          className="btn-outline"
          onClick={() => setExpanded((e) => !e)}
        >
          {expanded ? 'Скрыть таблицу' : 'Показать таблицу'}
        </button>
      </div>

      {expanded && (
        <DataTable
          country={country}
          selectedYear={selectedYear}
          selectedColumns={selectedColumns}
        />
      )}
    </div>
  );
};

function formatNumber(n: number | string) {
  if (n === 'N/A' || n == null || Number.isNaN(Number(n))) return 'N/A';
  if (typeof n === 'string') return n;
  try {
    return new Intl.NumberFormat().format(n);
  } catch {
    return String(n);
  }
}

export default CountryCard;