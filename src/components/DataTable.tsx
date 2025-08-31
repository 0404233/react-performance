import React, { useMemo } from 'react';
import ReactDOM from 'react-dom';
import { type CountryData } from '../types/co2';

interface DataTableModalProps {
  country: CountryData;
  selectedYear: number;
  selectedColumns: string[];
  onClose: () => void;
}

const modalRoot = document.getElementById('modal-root');

const DataTableModal: React.FC<DataTableModalProps> = React.memo(
  ({ country, selectedYear, selectedColumns, onClose }) => {
    const rows = useMemo(() => {
      return Array.from(country.byYear.entries())
        .map(([year, data]) => ({
          ...data,
          year,
        }))
        .sort((a, b) => a.year - b.year);
    }, [country]);

    if (!modalRoot) return null;

    return ReactDOM.createPortal(
      <div className="modal-backdrop" onClick={onClose}>
        <div className="modal modal-table" onClick={(e) => e.stopPropagation()}>
          <h3>{country.name}</h3>
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
          <div className="modal-actions">
            <button className="btn" onClick={onClose}>
              Закрыть
            </button>
          </div>
        </div>
      </div>,
      modalRoot
    );
  }
);

function formatNumber(value: unknown) {
  if (value == null || value === 'N/A') return 'N/A';
  if (typeof value === 'number') {
    return new Intl.NumberFormat().format(value);
  }
  return String(value);
}

export default DataTableModal;