import React from "react"
import MonthDate from "../MonthDate/MonthDate";
import DayEventsBox from "../DayEventsBox/DayEventsBox.jsx";
import "./DayPlanBox.css"

export default function DayPlanBox(props){

    const
        {count, dayContent, setText} = {...props};

    return(<div className={"box "}>
        <MonthDate count={count}/>
        <DayEventsBox dayContent={dayContent} setText={setText} count={count}/>
    </div>)
}