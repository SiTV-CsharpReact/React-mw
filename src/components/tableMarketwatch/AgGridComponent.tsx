import React, { useContext } from 'react';
import { AgGridReact } from 'ag-grid-react';
import { GridRefContext } from './GridRefContext';
import columnDefs from './components/columnDef';

const AgGridComponent: React.FC = () => {
  const gridRef = useContext(GridRefContext);

  console.log(gridRef?.current);

  return (
    <AgGridReact
      ref={gridRef}
      columnDefs={columnDefs}
      // Các thiết lập khác của AgGridReact
    />
  );
};

export default AgGridComponent;