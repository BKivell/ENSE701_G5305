import React from "react";

interface Props {
  columns: string[];
  visibleColumns: string[];
  setVisibleColumns: React.Dispatch<React.SetStateAction<string[]>>;
}

const ColumnVisibilityToggle: React.FC<Props> = ({
  columns,
  visibleColumns,
  setVisibleColumns,
}) => {
  const toggleColumn = (column: string) => {
    if (visibleColumns.includes(column)) {
      setVisibleColumns(visibleColumns.filter((col) => col !== column));
    } else {
      setVisibleColumns([...visibleColumns, column]);
    }
  };

  return (
    <div>
      <h3>Show / Hide Columns</h3>
      {columns.map((column) => (
        <label key={column}>
          <input
            type="checkbox"
            checked={visibleColumns.includes(column)}
            onChange={() => toggleColumn(column)}
          />
          {column}
        </label>
      ))}
    </div>
  );
};

export default ColumnVisibilityToggle;
