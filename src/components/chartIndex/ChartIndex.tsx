import React, { useEffect, useRef } from 'react'
import { useAppDispatch, useAppSelector } from '../../store/configureStore'
import { fetchChartIndexAsync } from './chartIndexSlice';
import * as Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';
import { drawChart } from './util/app.chart';
import { chartIndex } from '../../models/chartIndex';
import './chartIndex.scss'
import { data } from './data';
type Props ={
  value: string;
  // Other props...
}

const gradient: any = [0, 0, 50, 500];
// const xAxis: any = [
//   '09 h', '10 h', '11 h','12 h', '13 h', '14 h', '15 h'
// ];

const options: Highcharts.Options = {
  // plotOptions: {
  //   series: {
  //     click: false, // Tắt sự kiện click trên series line
  //   },
  // },
  title: {
    text: '',
  },
  credits: {
    enabled: false
},

  series: [
    {
      type: 'line',
      data: data,
      color: '#00ff00',
      marker: {
        enabled: false
      },
      tooltip: {
                      
                    }
    },
   
  ],
  chart:{
    className: 'gradient-bg',
    marginTop:10,
   height: 80,
   width:190,
   backgroundColor: {
    linearGradient: gradient,
    stops: [
      [0, "#080808"],
      [1, "#917c05"],
    ],
  },
        // plotBackgroundColor: {
        //   linearGradient: gradient,
        //   stops: [
        //     [0, "#080808"],
        //     [1, "#917c05"],
        //   ],
        // },
   borderWidth: 1,
   borderColor:"#505050"

  },
 
  yAxis:{
    
    height:60,
    gridLineWidth: 0,
    labels: {
      enabled: false, // Tắt hiển thị giá trị bên trục y
    },
        title:{
          text:''
        },
        lineWidth: 0,
  },
  xAxis: {
    type: 'datetime',
    tickInterval: 3600 * 1000, 
    gridLineWidth: 1,
    gridLineColor:'#222012',
    
    // startOnTick: true,
    labels: {
      rotation: 0,
      style: {
        color: "#969696",
        fontSize: "8px",
      },
    },
     height: 40,
  },
 
};

// const chartStyle = {
//   height: '150px', // Chiều cao tùy chỉnh
//   width: '100px', // Chiều rộng tùy chỉnh
// };
const ChartIndex: React.FC<Props> = (props: HighchartsReact.Props ) => {
  // log(props)
  console.log(props.value)
    const dispatch = useAppDispatch();
  const {isLoading,dataChartIndex,status} = useAppSelector((state)=>state.chartIndex)
  useEffect(()=>{
    dispatch(fetchChartIndexAsync())
  },[])
  const dataChart = drawChart(dataChartIndex);
  // console.log(dataChartIndex)
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