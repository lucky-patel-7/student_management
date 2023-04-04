import React, { useEffect } from 'react'
import Chart from 'react-apexcharts'

function BarChartModel({ options, graphData, type }) {

    return (
        <div className='chartContainer'>
            {options != "" && <Chart options={options} series={graphData} type = {type} height={500}/>}
        </div>
    )
}

export default React.memo(BarChartModel);