import React, { useEffect } from 'react'
import Chart from 'react-apexcharts'
import { Link } from 'react-router-dom';
import { Service } from '../../../service/Service';

function MonthWiseLeaveLineChartModel({ item }) {

    const [isData, setData] = React.useState([]);
    const [isStudentList, setStudentList] = React.useState(item);
    let options = {chart: { id: 'apexchart-example' }, xaxis: { categories: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'June', 'July', 'Aug', 'Sept', 'Oct', 'Nov', 'Dec'] },}

    useEffect(() => {
        setStudentList(item);
    }, [])

    const onStudent = (item) => {
        Service.get("studentTotalLeave", "teacher", item._id, (res) => {
            if (res.code === "200") {
                if (res.data.leaves.length > 0)
                    setData(getFilterData(res.data.leaves))
                else
                    setData([]);

            } else alert(res.message)

        }, (err) => console.log(err))
    }

    const getFilterData = (item) => {

        var obj = [{ name: 'series-1', data: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]}];

        item.forEach(element => {
            if (element.name != null && element.name != "" && element.month != null && element.month != "" && element.count != null && element.count != "") {
                let arr = obj[0].data;
                arr[element.month - 1] = element.count;
            }
        }
        );

        return obj;
    }

    const listItems = isStudentList.map((item, index) =>
        <div key={index} onClick={() => onStudent(item)} className="getQue">
            <li><Link>{` -  ${item.Name}`}</Link></li>
        </div>
    );
    return (
        <div className='chartContainer2'>
            <div className='LeftPart'>
                <ul>{listItems}</ul>
            </div>
            {isData &&
                <div className='RightPart'>
                   <Chart options={options} series={isData} type="line" width={1000} height={500} />
                </div>
            }
        </div>
    )
}

export default React.memo(MonthWiseLeaveLineChartModel);