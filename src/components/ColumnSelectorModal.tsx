import React from 'react';

interface ColumnSelectorModalProps {
  allColumns: string[];
  selectedColumns: string[];
  onClose: () => void;
  onApply: (cols: string[]) => void;
}

const ColumnSelectorModal: React.FC<ColumnSelectorModalProps> = () => {
  return null;
};

export default ColumnSelectorModal;
