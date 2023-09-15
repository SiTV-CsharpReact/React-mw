import React from 'react';

type TooltipChartIndexProps = {
  customTooltipX: number | null;
  customTooltipY: number | null;
  customTooltipContent: string;
};

const TooltipChartIndex: React.FC<TooltipChartIndexProps> = ({ customTooltipX, customTooltipY, customTooltipContent }) => {
    console.log({ customTooltipX, customTooltipY, customTooltipContent })
  return (
    <div
      style={{
        position: 'absolute',
        left: customTooltipX !== null ? customTooltipX + 'px' : 'auto',
        top: customTooltipY !== null ? customTooltipY-20 + 'px' : 'auto',
        backgroundColor: '#ffffffc9',
        borderColor: '#07d800',
        borderRadius: '5px',
        borderWidth: '1px',
        padding: '6px',
        width: '150px',
        fontSize: '11px',
        fontWeight: '500',
      }}
      dangerouslySetInnerHTML={{ __html: customTooltipContent }}
    />
  );
};

export default TooltipChartIndex;
