import React, { useMemo, useCallback } from 'react';

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

const Controls: React.FC<ControlsProps> = React.memo(
  ({
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
    onOpenModal,
  }) => {
    const yearOptions = useMemo(
      () => years.map((y) => ({ value: y, label: y })),
      [years]
    );

    const handleYear = useCallback(
      (e: React.ChangeEvent<HTMLSelectElement>) => {
        onYearChange(Number(e.target.value));
      },
      [onYearChange]
    );

    const handleRegion = useCallback(
      (e: React.ChangeEvent<HTMLSelectElement>) => {
        onFilterRegion(e.target.value);
      },
      [onFilterRegion]
    );

    const handleSearch = useCallback(
      (e: React.ChangeEvent<HTMLInputElement>) => {
        onSearch(e.target.value);
      },
      [onSearch]
    );

    const handleSortBy = useCallback(
      (e: React.ChangeEvent<HTMLSelectElement>) => {
        onSortChange(e.target.value);
      },
      [onSortChange]
    );

    const handleSortOrder = useCallback(
      (e: React.ChangeEvent<HTMLSelectElement>) => {
        onSortOrderChange(e.target.value as 'asc' | 'desc');
      },
      [onSortOrderChange]
    );

    return (
      <div className="controls">
        <div className="row">
          <label className="control">
            <span>Год</span>
            <select value={selectedYear} onChange={handleYear}>
              {yearOptions.map(({ value, label }) => (
                <option key={value} value={value}>
                  {label}
                </option>
              ))}
            </select>
          </label>

          <label className="control">
            <span>Регион</span>
            <select value={regionFilter} onChange={handleRegion}>
              {regions.map((r) => (
                <option key={r} value={r}>
                  {r}
                </option>
              ))}
            </select>
          </label>

          <label className="control control-wide">
            <span>Поиск</span>
            <input
              type="text"
              value={searchQuery}
              onChange={handleSearch}
              placeholder="Например: Russia"
            />
          </label>

          <label className="control">
            <span>Сортировать по</span>
            <select value={sortBy} onChange={handleSortBy}>
              <option value="population">Население</option>
              <option value="name">Название</option>
            </select>
          </label>

          <label className="control">
            <span>Порядок</span>
            <select value={sortOrder} onChange={handleSortOrder}>
              <option value="asc">По возрастанию</option>
              <option value="desc">По убыванию</option>
            </select>
          </label>

          <button className="btn" onClick={onOpenModal}>
            Выбрать колонки ({selectedColumns.length})
          </button>
        </div>
      </div>
    );
  }
);

export default Controls;
