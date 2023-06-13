import React, { useEffect, useRef } from 'react'
import { useAppDispatch, useAppSelector } from '../../store/configureStore'
import { fetchChartIndexAsync } from './chartIndexSlice';
import * as Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';

const gradient: any = [0, 0, 50, 500];
// const xAxis: any = [
//   '09 h', '10 h', '11 h','12 h', '13 h', '14 h', '15 h'
// ];
const xAxis: any = [
  0, // Vị trí 0 tương ứng với 09h
  1, // Vị trí 1 tương ứng với 10h
  2, // Vị trí 2 tương ứng với 11h
  3, // Vị trí 3 tương ứng với 12h
  4, // Vị trí 4 tương ứng với 13h
  5, // Vị trí 5 tương ứng với 14h
  6, // Vị trí 6 tương ứng với 15h
];
const options: Highcharts.Options = {
  title: {
    text: '',
  },
  credits: {
    enabled: false
},
  series: [
    {
      type: 'line',
      data: [1, 2, 3,7,8,9,10,23,37],
      color: '#00ff00',
      marker: {
        enabled: false
      }
    },
   
  ],
  chart:{
   height: 95,
   backgroundColor: "#000",
        plotBackgroundColor: {
          linearGradient: gradient,
          stops: [
            [0, "#080808"],
            [1, "#917c05"],
          ],
        },
   borderWidth: 1,
   borderColor:"#505050"

  },
 
  yAxis:{
    min: 0,
    height:80,
    gridLineWidth: 0,
    labels: {
      style: {
        fontSize: "9px",
        color: "#00ff00",
      },
      distance: 8,
    },
        title:{
          text:''
        },
        lineWidth: 0,
  },
  xAxis: {
    categories: xAxis,
    gridLineWidth: 1,
    gridLineColor:'#222012',
    startOnTick: true,
    labels: {
      rotation: 0,
      style: {
        color: "#969696",
        fontSize: "8px",
      },
    },
     height: 60,
  },
 
};

// const chartStyle = {
//   height: '150px', // Chiều cao tùy chỉnh
//   width: '100px', // Chiều rộng tùy chỉnh
// };
const ChartIndex = (props: HighchartsReact.Props) => {
    const dispatch = useAppDispatch();
  const {isLoading,dataChartIndex,status} = useAppSelector((state)=>state.chartIndex)
  useEffect(()=>{
    dispatch(fetchChartIndexAsync())
  },[])

  console.log(dataChartIndex)
  const chartComponentRef = useRef<HighchartsReact.RefObject>(null);
  return (
    <HighchartsReact
      highcharts={Highcharts}
      options={options}
      ref={chartComponentRef}
      // style={chartStyle}
      {...props}
    />
  )
}

export default React.memo(ChartIndex)