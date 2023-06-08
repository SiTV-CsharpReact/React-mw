import React, { useRef } from 'react';
import AgGridComponent from './AgGridComponent';
import { GridRefContext } from './GridRefContext';
function ParentComponent() {
    const gridRef = useRef<any>();

  return (
    <GridRefContext.Provider value={gridRef}>
    <div>
      <AgGridComponent/>
    </div>
    </GridRefContext.Provider>
  );
}

export default ParentComponent;