import React from "react"
import "./week-line.css"
import DayBox from "../day-box/day-box";


 function WeekLine(props){

    const {week, clickedDay, active, dateId} = {...props};


    let block = [];
    week.forEach((item) =>{
         const {day, month, year} = {...item}
         block.push(<DayBox clickedDay={clickedDay} id={`${year}-${month}-${day}`} active={active} dateId={dateId} {...item}/>);
    });

    return(<div className={'d-flex'}>{block}</div>)
}

export default WeekLine;