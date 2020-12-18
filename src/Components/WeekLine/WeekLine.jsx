import React from "react"
import "./WeekLine.css"
import {DayBox} from "../DayBox/DayBox.jsx";


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