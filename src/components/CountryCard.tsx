import React, { useEffect, useMemo, useState } from 'react';
import { type CountryData } from '../types/co2';
import DataTableModal from './DataTable';
import { getValueForYear } from '../utils/dataTransforms';

interface CountryCardProps {
  country: CountryData;
  selectedYear: number;
  selectedColumns: string[];
}

const CountryCard: React.FC<CountryCardProps> = React.memo(
  ({ country, selectedYear, selectedColumns }) => {
    const [showTable, setShowTable] = useState(false);
    const [highlight, setHighlight] = useState(false);

    const latestPopulation = useMemo(() => {
      if (!country.latestYear) return 'N/A';
      return country.byYear.get(country.latestYear)?.population ?? 'N/A';
    }, [country]);

    const currPopulation = useMemo(() => {
      return getValueForYear(country, selectedYear, 'population');
    }, [country, selectedYear]);

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
            onClick={() => setShowTable((e) => !e)}
          >
            {showTable ? 'Скрыть таблицу' : 'Показать таблицу'}
          </button>
        </div>

        {showTable && (
          <DataTableModal
            country={country}
            selectedYear={selectedYear}
            selectedColumns={selectedColumns}
            onClose={() => setShowTable(false)}
          />
        )}
      </div>
    );
  }
);

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
