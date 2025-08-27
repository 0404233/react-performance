import React from 'react';
import { type CountryData } from '../types/co2';

interface DataTableProps {
  country: CountryData;
  selectedYear: number;
  selectedColumns: string[];
}

const DataTable: React.FC<DataTableProps> = ({
  country,
  selectedYear,
  selectedColumns
}) => {

  const rows = Array.from(country.byYear.entries())
    .map(([year, data]) => ({
      ...data,
      year,
    }))
    .sort((a, b) => a.year - b.year);

  return (
    <div className="data-table-wrapper">
      <table className="data-table">
        <thead>
          <tr>
            <th>Год</th>
            {selectedColumns.map((col) => (
              <th key={col}>{col}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.map((row) => (
            <tr
              key={row.year}
              className={row.year === selectedYear ? 'highlight-row' : ''}
            >
              <td>{row.year}</td>
              {selectedColumns.map((col) => (
                <td key={col}>
                  {formatNumber(row[col as keyof typeof row])}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

function formatNumber(value: unknown) {
  if (value == null || value === 'N/A') return 'N/A';
  if (typeof value === 'number') {
    return new Intl.NumberFormat().format(value);
  }
  return String(value);
}

export default DataTable;