import React from 'react';
import type { CountryData } from '../types/co2';
import { getValueForYear } from '../utils/dataTransforms';

interface CountryCardProps {
  country: CountryData;
  selectedYear: number;
  selectedColumns: string[];
}

const CountryCard: React.FC<CountryCardProps> = ({ country, selectedYear, selectedColumns }) => {
  return (
    <div className="country-card">
      <h3>{country.name}</h3>
      <ul>
        {selectedColumns.map((col) => (
          <li key={col}>
            <strong>{col}:</strong> {getValueForYear(country, selectedYear, col)}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default CountryCard;
