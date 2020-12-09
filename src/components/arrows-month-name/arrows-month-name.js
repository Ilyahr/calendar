import React from "react"
import "./arrows-month-name.css"

export default function ArrowsMothName(props){

    const {minusMonth, plusMonth, thisMonth, thisYear} = {...props};

    return(
        <div className={"d-flex"}>
            <img onClick={minusMonth} src={process.env.PUBLIC_URL + "./arrow.png"} className="arrow left-arrow" alt="arrow-left"/>
            <div className="month-name">{thisMonth} - {thisYear}</div>
            <img onClick={plusMonth} src={process.env.PUBLIC_URL + "./arrow.png"} className="arrow right-arrow" alt="arrow-right"/>
        </div>
    )
}