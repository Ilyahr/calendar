import React from "react"
import './days-nav-block.css'

function DaysNavBlock(){

    const days = ["Пн", "Вт", "Ср", "Чт", "Пт", "Сб", "Вс"];
    let week = [];
    days.forEach((item) =>{
        week.push(<div className={'day-name'}>
            {item}
        </div>);
    });

    return(
        <div className={'d-flex'}>
            {week}
        </div>)
}

export default DaysNavBlock;