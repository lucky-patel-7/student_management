import React from 'react'

import './ChartScreen.css'
import Navbar from '../../components/navbar/Navbar'
import ChartButtonContainer from '../../components/chart/chartbuttonlist/ChartButtonContainer';
import BarChartModel from '../../components/chart/chartlist/BarChartModel';
import LineChartModel from '../../components/chart/chartlist/MonthWiseLeaveLineChartModel';
import MonthWiseBarChartModel from '../../components/chart/chartlist/MonthWiseBarChartModel';

import { Service } from '../../service/Service';
import ChartUtil from '../../util/ChatUtil';
function ChartScreen({props}) {

    const [isSelectMap, setSelectMap] = React.useState("");
    const [isData, setData] = React.useState("");
    const [isStudentList, setStudentList] = React.useState("");
    const [isTimeSpentData, setTimeSpentData] = React.useState("");

    const onButtonClick = (item) => {

        setSelectMap(item.title);
        setData('');

        if(item.title === "City Wise")
        {
            Service.get('getCityWiseStudentCount', "teacher","", (res) => {
                if (res.code === "200") {

                    let options = { chart:{id: 'apexchart-example'}, xaxis:{categories:ChartUtil.getCityWiseOptions(res.data)}}
                    let graphData = ChartUtil.CityWiseGraphData(res.data)

                    setData({options:options, graphData:graphData})

                } else alert(res.message)
            },(err) => console.log(err))
        }
        else if(item.title === "Month Wise Leave" || item.title === "Monthly Score")
        {
            Service.get("getAllStudents", "teacher","", (res) => {
                if (res.code === "200") {
                    setStudentList(res.data)
                } else alert(res.message)
            },(err) => console.log(err))
        }
        else if(item.title === "Time Spent")
        {
            Service.get("totalTimeSpent", "teacher","", (res) => {
                if (res.code === "200") {

                    let options = { chart:{id: 'apexchart-example'}, xaxis:{categories:ChartUtil.getTotalTimeSpendOptions(res.data)}}
                    let graphData = ChartUtil.TotalTimeSpendGraphData(res.data)
                    setData({options:options, graphData:graphData})

                } else alert(res.message)
            },(err) => console.log(err))
        }
        else if(item.title === "Late Count")
        {
            Service.get("isLateCount", "teacher","", (res) => {
                if (res.code === "200") {
                    let options = { chart:{id: 'apexchart-example'}, xaxis:{categories:ChartUtil.getLateCountOptions(res.data.result)}}
                    let graphData = ChartUtil.getLateCountGraphData(res.data.result)
                    setData({options:options, graphData:graphData})

                } else alert(res.message)
            },(err) => console.log(err))
        }
        else if(item.title === "Monthly Present")
        {
            Service.get("totalPresent", "teacher","", (res) => {
                if (res.code === "200") {
                    let options = { chart:{id: 'apexchart-example'}, xaxis:{categories:ChartUtil.getPresentCountOptions(res.data.result)}}
                    let graphData = ChartUtil.getPresentCountGraphData(res.data.result)
                    setData({options:options, graphData:graphData})

                } else alert(res.message)
            },(err) => console.log(err))
        }
        else if(item.title === "Submit Lesson On Time")
        {
            Service.get("lessonsOnTimeMonthly/true", "teacher","", (res) => {
                if (res.code === "200") {
                    let options = { chart:{id: 'apexchart-example'}, xaxis:{categories:ChartUtil.getSubmitLessonOnTimeOptions(res.data)}}
                    let graphData = ChartUtil.getSubmitLessonOnTimeGraphData(res.data)
                    setData({options:options, graphData:graphData})

                } else alert(res.message)
            },(err) => console.log(err))
        }
        else if(item.title === "Submit Lesson Not On Time")
        {
            Service.get("lessonsOnTimeMonthly/false", "teacher","", (res) => {
                if (res.code === "200") {
                    let options = { chart:{id: 'apexchart-example'}, xaxis:{categories:ChartUtil.getSubmitLessonOnTimeOptions(res.data)}}
                    let graphData = ChartUtil.getSubmitLessonOnTimeGraphData(res.data)
                    setData({options:options, graphData:graphData})

                } else alert(res.message)
            },(err) => console.log(err))
        }
        else if(item.title === "Total Submit Lesson")
        {
            Service.get("lessonsSubmittedCount", "teacher","", (res) => {
                if (res.code === "200") {
                    let options = { chart:{id: 'apexchart-example'}, xaxis:{categories:ChartUtil.getTotalSubmitLessonOptions(res.data.result)}}
                    let graphData = ChartUtil.getTotalSubmitLessonGraphData(res.data.result)
                    setData({options:options, graphData:graphData})

                } else alert(res.message)
            },(err) => console.log(err))
        }
        else if(item.title === "Total Not Submit Lesson")
        {
            Service.get("lessonsSubmittedCount", "teacher","", (res) => {
                if (res.code === "200") {
                    let options = { chart:{id: 'apexchart-example'}, xaxis:{categories:ChartUtil.getTotalNotSubmitLessonOptions(res.data.result)}}
                    let graphData = ChartUtil.getTotalNotSubmitLessonGraphData(res.data.result, res.data.totalQuestions)
                    setData({options:options, graphData:graphData})

                } else alert(res.message)
            },(err) => console.log(err))
        }
        else if(item.title === "Score Below 35")
        {
            Service.get("lessScores", "teacher","", (res) => {
                if (res.code === "200") {
                    let options = { chart:{id: 'apexchart-example'}, xaxis:{categories:ChartUtil.getStudenLossScoreOptions(res.data)}}
                    let graphData = ChartUtil.getStudentLossScoreGraphData(res.data)
                    setData({options:options, graphData:graphData})

                } else alert(res.message)
            },(err) => console.log(err))
        }
        else if(item.title === "Teacher Questions")
        {
            Service.get("getQuestionsMonthly", "teacher","640ad53ce843b1161e9868b7", (res) => {
                if (res.code === "200") {
                    let options = { chart:{id: 'apexchart-example'}, xaxis:{categories:ChartUtil.getTeacherQuestionsOptions(res.data)}}
                    let graphData = ChartUtil.getTeacherQuestionsGraphData(res.data)
                    setData({options:options, graphData:graphData})

                } else alert(res.message)
            },(err) => console.log(err))
        }
    }

    return (

        <>
            <div className='MainContainer'>
                <Navbar />
                <ChartButtonContainer onClickChart={(item) => onButtonClick(item)} />
                {isSelectMap == "City Wise" && isData != "" && <BarChartModel options={isData.options} graphData={isData.graphData} type={"bar"}/>}
                {isSelectMap == "Month Wise Leave" && isStudentList != "" && <LineChartModel item={isStudentList}/>}
                {isSelectMap == "Time Spent" && isData != "" && <BarChartModel options={isData.options} graphData={isData.graphData} type={"bar"}/>}
                {isSelectMap == "Late Count" && isData != "" && <BarChartModel options={isData.options} graphData={isData.graphData} type={"bar"}/>}
                {isSelectMap == "Monthly Present" && isData != "" && <BarChartModel options={isData.options} graphData={isData.graphData} type={"bar"}/>}
                {isSelectMap == "Submit Lesson On Time" && isData != "" && <BarChartModel options={isData.options} graphData={isData.graphData} type={"bar"}/>}
                {isSelectMap == "Submit Lesson Not On Time" && isData != "" && <BarChartModel options={isData.options} graphData={isData.graphData} type={"bar"}/>}
                {isSelectMap == "Total Submit Lesson" && isData != "" && <BarChartModel options={isData.options} graphData={isData.graphData} type={"bar"}/>}
                {isSelectMap == "Total Not Submit Lesson" && isData != "" && <BarChartModel options={isData.options} graphData={isData.graphData} type={"bar"}/>}
                {isSelectMap == "Monthly Score" && isStudentList != "" && <MonthWiseBarChartModel item={isStudentList}/>}
                {isSelectMap == "Score Below 35" && isData != "" && <BarChartModel options={isData.options} graphData={isData.graphData} type={"bar"}/>}
                {isSelectMap == "Teacher Questions" && isData != "" && <BarChartModel options={isData.options} graphData={isData.graphData} type={"bar"}/>}
                    
                
               
            </div>
        </>

    )
}

export default ChartScreen