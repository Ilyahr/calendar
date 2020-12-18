import React, {useState} from "react"
import AddEventModal from "../AddEventModal/AddEventModal.jsx";
import "./DayEventsBox.css"

export default function DayEventsBox(props){

    const [modal, switchModal] = useState(false);
    const [time, setTime] = useState(0);

    let classes ='overflow-scroll';
    function openCloseModal(time){
        setTime(time);
        switchModal(!modal);
        if(!modal){
            classes = "overflow-scroll";
        }
        else
            classes = "overflow-hidden";
    }

    const block = [];
    const {dayContent, setText, count} = {...props};


    for(let i = 0; i < 24; i++){
        const some = dayContent.filter(index =>{
            return +(index.Time) === i;
        });
        let allEventsOfTheDay = '';

        some.forEach((item) =>{
            allEventsOfTheDay += ` ${item.NewEvent}`;
        })

        block.push(<div onClick={() => openCloseModal(i)} className={'hour-of-day'}>{i}.{allEventsOfTheDay}</div>);
    }




    return(
        <div className={classes}>
            <AddEventModal openCloseModal={openCloseModal} modal={modal} time={time} setText={setText} count={count}/>
            <div>{block}</div>
        </div>
    )
}