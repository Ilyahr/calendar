import React from "react"
import MonthDate from "../month-date/month-date";
import DayEventsBox from "../day-events-box/day-events-box";
import "./day-plan-box.css"

export default function DayPlanBox(props){

    const
        {count, dayContent, getText} = {...props};

    return(<div className={"box "} >
        <MonthDate count={count}/>
        <DayEventsBox dayContent={dayContent} getText={getText} count={count}/>
    </div>)
}