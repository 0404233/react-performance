import React, { useState, useEffect } from 'react';
import ReactDOM from 'react-dom';
import { DEFAULT_COLUMNS } from '../utils/dataTransforms';

interface ColumnSelectorModalProps {
  allColumns: string[];
  selectedColumns: string[];
  onClose: () => void;
  onApply: (cols: string[]) => void;
}

const modalRoot = document.getElementById('modal-root');

const ColumnSelectorModal: React.FC<ColumnSelectorModalProps> = ({
  allColumns,
  selectedColumns,
  onClose,
  onApply
}) => {
  const [localCols, setLocalCols] = useState<string[]>([...selectedColumns]);

  useEffect(() => {
    setLocalCols([...selectedColumns]);
  }, [selectedColumns]);

  const selectable = allColumns.filter((c) => c !== 'year');

  const toggle = (col: string) => {
    setLocalCols((prev) =>
      prev.includes(col) ? prev.filter((c) => c !== col) : [...prev, col]
    );
  };

  const resetDefault = () => setLocalCols([...DEFAULT_COLUMNS]);

  if (!modalRoot) return null;

  return ReactDOM.createPortal(
    <div className="modal-backdrop" onClick={onClose}>
      <div className="modal" onClick={(e) => e.stopPropagation()}>
        <h3>Выбор колонок</h3>
        <div className="columns-grid">
          {selectable.map((c) => (
            <label key={c} className="checkbox">
              <input
                type="checkbox"
                checked={localCols.includes(c)}
                onChange={() => toggle(c)}
              />
              <span>{c}</span>
            </label>
          ))}
        </div>
        <div className="modal-actions">
          <button className="btn-secondary" onClick={resetDefault}>Сбросить</button>
          <div className="spacer" />
          <button className="btn" onClick={() => onApply(localCols)}>Применить</button>
          <button className="btn-outline" onClick={onClose}>Отмена</button>
        </div>
      </div>
    </div>,
    modalRoot
  );
};

export default ColumnSelectorModal;