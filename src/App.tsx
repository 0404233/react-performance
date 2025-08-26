import { useState, Suspense } from 'react';
import Controls from './components/Controls';
import CountryList from './components/CountryList';
import DataTable from './components/DataTable';
import ColumnSelectorModal from './components/ColumnSelectorModal';
import { normalizeCo2Dataset, filterSearchSort, DEFAULT_COLUMNS } from './utils/dataTransforms';
import { createResource } from './lib/createResource';
import { useStickyState } from './hooks/useStickyState';

const dataResource = createResource(async () => {
  const res = await fetch('owid-co2-data.json');
  const json = await res.json();
  return normalizeCo2Dataset(json);
});

function App() {
  const { countries, years, allColumns, regions } = dataResource.read();

  const [selectedYear, setSelectedYear] = useStickyState('year', years[years.length - 1]);
  const [regionFilter, setRegionFilter] = useStickyState('region', 'All');
  const [searchQuery, setSearchQuery] = useStickyState('search', '');
  const [sortBy, setSortBy] = useStickyState('sortBy', 'name');
  const [sortOrder, setSortOrder] = useStickyState<'asc' | 'desc'>('sortOrder', 'asc');
  const [selectedColumns, setSelectedColumns] = useStickyState<string[]>('columns', [...DEFAULT_COLUMNS]);
  const [showModal, setShowModal] = useState(false);

  const filtered = filterSearchSort(countries, {
    regionFilter,
    searchQuery,
    sortBy,
    sortOrder,
    selectedYear
  });

  return (
    <div>
      <Controls
        years={years}
        regions={regions}
        selectedYear={selectedYear}
        onYearChange={setSelectedYear}
        regionFilter={regionFilter}
        onFilterRegion={setRegionFilter}
        searchQuery={searchQuery}
        onSearch={setSearchQuery}
        sortBy={sortBy}
        sortOrder={sortOrder}
        onSortChange={setSortBy}
        onSortOrderChange={setSortOrder}
        selectedColumns={selectedColumns}
        onOpenModal={() => setShowModal(true)}
      />
      <CountryList
        countries={filtered}
        selectedYear={selectedYear}
        selectedColumns={selectedColumns}
      />
      <DataTable
        countries={filtered}
        selectedYear={selectedYear}
        selectedColumns={selectedColumns}
      />
      {showModal && (
        <ColumnSelectorModal
          allColumns={allColumns}
          selectedColumns={selectedColumns}
          onClose={() => setShowModal(false)}
          onApply={(cols) => {
            setSelectedColumns(cols);
            setShowModal(false);
          }}
        />
      )}
    </div>
  );
}

export default function AppWithSuspense() {
  return (
    <Suspense fallback={<div>Loading data...</div>}>
      <App />
    </Suspense>
  );
}