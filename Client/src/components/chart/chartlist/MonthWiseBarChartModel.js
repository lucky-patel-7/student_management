import React, { useEffect } from 'react'
import Chart from 'react-apexcharts'
import { Link } from 'react-router-dom';
import { Service } from '../../../service/Service';
import ChartUtil from '../../../util/ChatUtil';

function MonthWiseLeaveBarChartModel({ item }) {

    const [isMonthList, seMonthList] = React.useState(['Jan', 'Feb', 'Mar', 'Apr', 'May', 'June', 'July', 'Aug', 'Sept', 'Oct', 'Nov', 'Dec']);
    const [isSelectedMonth, seSelectedMonth] = React.useState(1);
    const [isStudentList, setStudentList] = React.useState(item);
    const [isSelectStudentId, setSelectStudentId] = React.useState(item[0]._id);

    const [isData, setData] = React.useState('');

    const onStudent = (id, month) => {

        setSelectStudentId(id)
        seSelectedMonth(month)
        setData('')

        Service.get("getStudentMonthlyScore", "teacher", id + "/" + month, (res) => {
            if (res.code === "200") {
                let options = { chart: { id: 'apexchart-example' }, xaxis: { categories: ChartUtil.getStudentWiseMonthlyScoreOptions(res.data) } }
                let graphData = ChartUtil.getStudentWiseMonthlyScoreGraphData(res.data)

                setData({ options: options, graphData: graphData })

            } else alert(res.message)

        }, (err) => console.log(err))
    }

    const studentList = isStudentList.map((item, index) =>
        <div key={index} onClick={() => onStudent(item._id, isSelectedMonth)} className="getQue">
            <li><Link>{` -  ${item.Name}`}</Link></li>
        </div>
    );
    const onButtomList = isMonthList.map((item, index) =>
        <div key={index} onClick={() => onStudent(isSelectStudentId, index + 1)}>
            <button>{item}</button>
        </div>
    );

    console.log("isData", isData);
    return (
        <div className='chartContainer2'>
            <div className='LeftPart'>
                <ul>{studentList}</ul>
            </div>
            <div className='RightPart'>
                <div class="btn-group">
                    <>{onButtomList}</>
                </div>
                {isData != '' && <Chart options={isData.options} series={isData.graphData} type="bar" width={1000} height={500} />}
            </div>
        </div>
    )
}

export default React.memo(MonthWiseLeaveBarChartModel);