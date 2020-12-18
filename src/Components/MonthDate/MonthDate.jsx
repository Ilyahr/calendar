import React from "react"
import "./MonthDate.css"

export default function MonthDate(props){
    const {count} ={...props};
    const dayOfWeek = ['Воскресение', 'Понедельник', 'Вторник', 'Среда', 'Четверг', 'Пятница', 'Суббота'];

    const
        thisDay = dayOfWeek[count.getDay()];

    return (<div className='month-date-name-box'>
            <div className="month-date-name">{thisDay}</div>
        </div>
    )
}