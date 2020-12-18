import React from "react"
import DaysNavBlock from "../DaysNavBlock/DaysNavBlock";
import DaysBlock from "../DaysBlock/DaysBlock";
import ArrowsMothName from "../ArrowsMonthName/ArrowsMonthMame.jsx";
import './CalendarBody.css'


export default function CalendarBody(props){



    const {count, minusMonth, plusMonth, clickedDay, active, dateId} = {...props}

    const
        thisMonth = count.toLocaleString('ru', {month: 'long'}),
        thisYear = count.getFullYear();

    return(
        <div className="calendar-body">
            <ArrowsMothName minusMonth={minusMonth} plusMonth={plusMonth} thisMonth = {thisMonth} thisYear={thisYear}/>
            <DaysNavBlock/>
            <DaysBlock clickedDay={clickedDay} year={count.getFullYear()} month={count.getMonth()} active={active} dateId={dateId}/>
        </div>
    )
}
