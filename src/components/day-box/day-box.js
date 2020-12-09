import React from "react"
import "./day-box.css"

export default function DayBox(props){
    const {day, month, year, clickedDay, dateId, id, visibility, active} = {...props}

    const dayParam = {
        day: day,
        month: month,
        year: year
    }

    let classChooser = 'day';
    const now = `${(new Date()).getFullYear()}-${(new Date()).getMonth()}-${(new Date()).getDate()}`;
    const chosenDay = `${dateId.getFullYear()}-${dateId.getMonth()}-${dateId.getDate()}` ===
        `${dayParam.year}-${dayParam.month}-${dayParam.day}`;

    if(now === id){
        classChooser += " today-color";
    }
    if(!visibility) {
        classChooser += " opacity";
    }
    if(active && chosenDay){
        classChooser += " active";
    }


    return(
        <div id={id} className={classChooser}  onClick={() => clickedDay(dayParam)}>
            {day}
        </div>
    )

}