import React from "react"
import DaysNavBlock from "../days-nav-block/days-nav-block";
import DaysBlock from "../days-block/days-block";
import ArrowsMothName from "../arrows-month-name/arrows-month-name";
import './main.css'


export default function Main(props){



    const {count, minusMonth, plusMonth, clickedDay, active, dateId} = {...props}

    const
        thisMonth = count.toLocaleString('ru', {month: 'long'}),
        thisYear = count.getFullYear();

    return(<div>

            <ArrowsMothName minusMonth={minusMonth} plusMonth={plusMonth} thisMonth = {thisMonth} thisYear={thisYear}/>
            <DaysNavBlock/>
            <DaysBlock clickedDay={clickedDay} year={count.getFullYear()} month={count.getMonth()} active={active} dateId={dateId}/>
        </div>
    )
}
