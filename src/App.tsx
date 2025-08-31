import { Suspense, useState } from 'react';
import { co2Resource } from './api/co2Resource';
import CountryList from './components/CountryList';

function AppContent() {
  const { countries, years, regions } = co2Resource.read();

  const [selectedYear, setSelectedYear] = useState<number>(
    years[years.length - 1]
  );
  const [regionFilter, setRegionFilter] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [sortBy, setSortBy] = useState<string>('co2');
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('desc');
  const [selectedColumns] = useState<string[]>([
    'co2',
    'population',
    'co2_per_capita',
  ]);

  return (
    <div style={{ padding: '1rem' }}>
      <h1>Данные по выбросам CO₂</h1>
      <div style={{ marginBottom: '1rem' }}>
        <label>
          Год:{' '}
          <select
            value={selectedYear}
            onChange={(e) => setSelectedYear(Number(e.target.value))}
          >
            {years.map((y) => (
              <option key={y} value={y}>
                {y}
              </option>
            ))}
          </select>
        </label>

        <label style={{ marginLeft: '1rem' }}>
          Регион:{' '}
          <select
            value={regionFilter}
            onChange={(e) => setRegionFilter(e.target.value)}
          >
            <option value="all">Все</option>
            {regions.map((r) => (
              <option key={r} value={r}>
                {r}
              </option>
            ))}
          </select>
        </label>

        <label style={{ marginLeft: '1rem' }}>
          Поиск:{' '}
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Введите название страны"
          />
        </label>

        <label style={{ marginLeft: '1rem' }}>
          Сортировать по:{' '}
          <select value={sortBy} onChange={(e) => setSortBy(e.target.value)}>
            <option value="co2">CO₂</option>
            <option value="population">Население</option>
            <option value="co2_per_capita">CO₂ на душу</option>
          </select>
        </label>

        <label style={{ marginLeft: '1rem' }}>
          Порядок:{' '}
          <select
            value={sortOrder}
            onChange={(e) => setSortOrder(e.target.value as 'asc' | 'desc')}
          >
            <option value="desc">По убыванию</option>
            <option value="asc">По возрастанию</option>
          </select>
        </label>
      </div>

      <CountryList
        countries={countries}
        selectedYear={selectedYear}
        regionFilter={regionFilter}
        searchQuery={searchQuery}
        sortBy={sortBy}
        sortOrder={sortOrder}
        selectedColumns={selectedColumns}
      />
    </div>
  );
}

export default function App() {
  return (
    <Suspense fallback={<div>Загружаем данные…</div>}>
      <AppContent />
    </Suspense>
  );
}
