import React, { useEffect } from 'react'
import { useAppDispatch, useAppSelector } from '../../store/configureStore'
import { fetchChartIndexAsync } from './chartIndexSlice';

const ChartIndex = () => {
    const dispatch = useAppDispatch();
  const {isLoading,dataChartIndex,status} = useAppSelector((state)=>state.chartIndex)
  useEffect(()=>{
    dispatch(fetchChartIndexAsync())
  },[])

  console.log(dataChartIndex)
  return (
    <div>ChartIndex</div>
  )
}

export default React.memo(ChartIndex)