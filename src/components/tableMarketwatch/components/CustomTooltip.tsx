import React, { useMemo } from 'react'

const CustomTooltip = (props:any) => {
    const data = useMemo(
        () => props.api.getDisplayedRowAtIndex(props.rowIndex).data,
        []
      );
  return (
    <div
    className="custom-tooltip"
    style={{ backgroundColor: props.color || 'white' }}
  >
    <p>
      <span>{data.MCK}</span>
    </p>
    {/* <p>
      <span>Country: </span> {data}
    </p>
    <p>
      <span>Total: </span> {data.total}
    </p> */}
  </div>
  )
}

export default CustomTooltip
