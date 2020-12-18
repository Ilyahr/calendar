import React from "react"
import "./DaysBlock.css"
import WeekLine from "../WeekLine/WeekLine";


function createCalendar(year, month){
    let date = new Date(year, month);

    const preMonthDate = getDay(date);

    let visibleMonth = [];

    for(let i = preMonthDate; i > 0; i--){
        date.setDate(date.getDate() - i);
        const dCopy = new Date(date)
        visibleMonth.push(pushDayDate(dCopy));
        date = new Date(year, month);
    }
    while(month === date.getMonth()){
        const dCopy = new Date(date)
        visibleMonth.push(pushDayDate(dCopy, true));
        date.setDate(date.getDate() + 1);
    }

    date = new Date(year, month + 1);
    if(getDay(date) !== 0){
        const pointer = 7 - getDay(date);
        for (let i = 0; i < pointer; i++) {
            const dCopy = new Date(date)
            visibleMonth.push(pushDayDate(dCopy));
            date.setDate(date.getDate() + 1);
        }
    }
    return visibleMonth;

}

function pushDayDate(date, same=false){
    const days = ["Пн", "Вт", "Ср", "Чт", "Пт", "Сб", "Вс"];
    return {
        visibility: same,
        day: date.getDate(),
        month: date.getMonth(),
        year: date.getFullYear(),
        dayOfWeek: getDay(date),
        dayOfWeekName: days[getDay(date)]
    }
}

function getDay(date) { // получить номер дня недели, от 0 (пн) до 6 (вс)
    let day = date.getDay();
    if (day === 0) day = 7; // сделать воскресенье (0) последним днем
    return day - 1;
}

export default function DaysBlock(props){

    const {year, month, active, dateId} = {...props}
    const count = createCalendar(year, month),
        clickedDay = props.clickedDay;
    // const [count, setCount] = useState(createCalendar(dateNow.getFullYear(), dateNow.getMonth()));
    // const updateCount = (year, month) => {
    //     setCount(createCalendar(year, month))
    // }

    let Month = [],
    pointer = 0;
    for(let j = 0; j < count.length/7; j++) {
        let week = [];
        for (let i = 0; i < 7; i++) {
            week.push(count[pointer++]);
        }
        Month.push(<WeekLine clickedDay={clickedDay} week={week} active={active} dateId={dateId}/>);
    }

    return(<div>{Month}</div>)

}