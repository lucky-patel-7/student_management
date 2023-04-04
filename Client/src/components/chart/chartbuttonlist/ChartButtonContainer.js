import React from 'react'
import './ChartButtonContainer.css'
import buttonData from '../../../util/ChartButtomList';

function ChartButtonContainer({onClickChart}) {

    return (
        
        <div className='serviceContainer'>
        {
            buttonData?.map((item, index) => {
                return (
                    <div key={index} onClick={() => onClickChart(item)}>
                        <button>{item.title}</button>
                    </div>
                )
            })
        }
    </div>
    )
}

export default React.memo(ChartButtonContainer);