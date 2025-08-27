import React from 'react';
import { type CountryData } from '../types/co2';
import { filterSearchSort } from '../utils/dataTransforms';
import CountryCard from './CountryCard';

interface CountryListProps {
  countries: CountryData[];
  selectedYear: number;
  regionFilter: string;
  searchQuery: string;
  sortBy: string;
  sortOrder: 'asc' | 'desc';
  selectedColumns: string[];
}

const CountryList: React.FC<CountryListProps> = ({
  countries,
  selectedYear,
  regionFilter,
  searchQuery,
  sortBy,
  sortOrder,
  selectedColumns
}) => {

  const list = filterSearchSort(countries, {
    regionFilter,
    searchQuery,
    sortBy,
    sortOrder,
    selectedYear
  });

  return (
    <div className="country-list">
      {list.map((country) => (
        <CountryCard
          key={country.iso || country.name || country.key}
          country={country}
          selectedYear={selectedYear}
          selectedColumns={selectedColumns}
        />
      ))}
      {list.length === 0 && <div className="muted">Ничего не найдено</div>}
    </div>
  );
};

export default CountryList;