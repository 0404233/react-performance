import React from 'react';
import type { CountryData } from '../types/co2';
import CountryCard from './CountryCard';

interface CountryListProps {
  countries: CountryData[];
  selectedYear: number;
  selectedColumns: string[];
}

const CountryList: React.FC<CountryListProps> = ({ countries, selectedYear, selectedColumns }) => {
  return (
    <div className="country-list">
      {countries.map((c) => (
        <CountryCard
          key={c.key}
          country={c}
          selectedYear={selectedYear}
          selectedColumns={selectedColumns}
        />
      ))}
    </div>
  );
};

export default CountryList;
