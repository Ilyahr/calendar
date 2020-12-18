import React, {useState, useEffect, useCallback, useMemo} from 'react';
import './App.css';
import CalendarBody from "../CalendarBoby/CalendarBody";
import DayPlanBox from "../DayPlanBox/DayPlanBox";
import {Header} from "../Header/Header";
import {ModalRegistration} from "../ModalRegistration/ModalRegistration";
import {GetResource} from "../Services/GetResource";

export default function App(){
    //get
    const date = new Date();
    const data = useMemo(() =>{ return[
            {
                id: 1, NewEvent: "", Date: "2020-12-07", Time: "18",
            }
        ]}, []);

    const [condition, setCondition] = useState(true);
    const [count, setCount] = useState(date);
    const [dateId, setNewActiveDay] = useState(date);
    const [dayContent, setContent] = useState(data);
    const [loginModalClass, setNewModalClass] = useState('hide');
    const [overflow, setOverflow] = useState('')
    const [loginOrSingUp, setLoginOrSingUp] = useState(true);
    const url = 'http://localhost:1337/calendars/';
    const [loggedInInfo, setLoggedInInfo] = useState(false);



    useEffect(() =>{
        newData();
    });


    const toNoDate = useCallback((date) => {
        let noDate = date.getFullYear() + "-";
        noDate += (((date.getMonth()) + 1)/ 10 < 1)? "0"+(date.getMonth() + 1): date.getMonth() + 1;
        noDate  += "-";
        noDate  += (((date.getDate()) / 10) < 1)?  "0"+(date.getDate()): date.getDate();
        return noDate;
    }, [])

    const newData = useCallback(() => {
        const urlRequest = `${url}?Date=${toNoDate(dateId)}`;
        GetResource(urlRequest)
            .then(res => {
                   if(JSON.stringify(dayContent) !== JSON.stringify(res)) {
                        setContent(res);
                    }
                }
            ).catch(error => console.log("error", error));
    }, [dateId, dayContent, toNoDate])


    const setText = useCallback( (text, count, time) =>{
        const body = {
            NewEvent:  text, Date: count, Time: time
        }
        fetch(url, {
            method: "POST",
            body: JSON.stringify(body),
            headers: {
                'Content-type':'application/json'
            }
        }).then((response) => response.json())
            .then(() => newData())
            .catch(error => console.log("error", error));

    }, [newData])







    const minusMonth = useCallback(() =>{
        setCount( (new Date(count.getFullYear(), count.getMonth() - 1)) );
    }, [count])

    const plusMonth = useCallback(() =>{
        setCount( (new Date(count.getFullYear(), count.getMonth() + 1)) )
    }, [count])

    const clickedDay = useCallback((id) => {
        setCondition(true)
        setNewActiveDay(new Date(id.year, id.month, id.day))
    }, [])


    const openLogSingModal = (isOpenModal) =>{
        if(!overflow){
            setNewModalClass('show');
            setOverflow("hidden");
        }
        else {
            setNewModalClass('hide');
            setOverflow("");
        }
        setLoginOrSingUp(isOpenModal);
    }



    return(
        <div className={overflow}>
            <ModalRegistration openLogSingModal={openLogSingModal}
                               isLogin={loginOrSingUp}
                               loginModalClass={loginModalClass}
                               setLoggedInInfo={setLoggedInInfo}/>
            <Header loggedInInfo={loggedInInfo} openLogSingModal={openLogSingModal} />
            <div className={'work-zone'}>
                <CalendarBody count={count} minusMonth ={minusMonth} plusMonth={plusMonth} clickedDay={clickedDay} active={condition} dateId={dateId}/>
                <DayPlanBox dayContent={dayContent} count={dateId} setText={setText}/>
            </div>
        </div>)
}
