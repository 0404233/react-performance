import React from 'react';

interface ControlsProps {
  years: number[];
  regions: string[];
  selectedYear: number;
  onYearChange: (year: number) => void;
  regionFilter: string;
  onFilterRegion: (region: string) => void;
  searchQuery: string;
  onSearch: (query: string) => void;
  sortBy: string;
  sortOrder: 'asc' | 'desc';
  onSortChange: (field: string) => void;
  onSortOrderChange: (order: 'asc' | 'desc') => void;
  selectedColumns: string[];
  onOpenModal: () => void;
}

const Controls: React.FC<ControlsProps> = ({
  years,
  regions,
  selectedYear,
  onYearChange,
  regionFilter,
  onFilterRegion,
  searchQuery,
  onSearch,
  sortBy,
  sortOrder,
  onSortChange,
  onSortOrderChange,
  selectedColumns,
  onOpenModal
}) => {
  const yearOptions = years.map((y) => ({ value: y, label: y }));

  return (
    <div className="controls">
    </div>
  );
};

export default Controls;
