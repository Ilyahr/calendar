import React, {useState, useEffect, useCallback} from 'react';
import './app.css';
import Main from "../main/main";
import DayPlanBox from "../day-plan-box/day-plan-box";

export default function App(){
    //get

    const date = new Date(),
        data = [
            {
                id: 1, NewEvent: "", Date: "2020-12-07", Time: "18:00:00.000",
            }
        ]
    const [condition, setCondition] = useState(true);
    const [count, setCount] = useState(date);
    const [dateId, setNewActiveDay] = useState(date);
    const [dayContent, setContent] = useState(data);
    const url = 'http://localhost:1337/calendars/';


    const getResource = useCallback((url) =>{
        return fetch(url)
            .then(res => res.json())
    }, []);


    useEffect(() =>{
        newData();
    });




    const newData = useCallback(() => {
        getResource(url)
            .then(res => {
                    const now = toNoDate(dateId);
                    let month = res.filter((item) => {
                        return item.Date === now;
                    })
                    if(!month)
                        month = data;
                    else if(JSON.stringify(dayContent) !== JSON.stringify(month))
                       setContent(month);
                }
            ).catch(error => console.log("error", error));
    }, [data, dateId, dayContent, getResource])


    const getText = useCallback( (text, count, time) =>{
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
            .then(res =>{
                console.log('success', res);
                newData();
            })
            .catch(error => console.log("error", error));

    }, [newData])





    const toNoDate = useCallback((date) => {
        let noDate = date.getFullYear() + "-";
        noDate += (((date.getMonth()) + 1)/ 10 < 1)? "0"+(date.getMonth() + 1): date.getMonth() + 1;
        noDate  += "-";
        noDate  += (((date.getDate()) / 10) < 1)?  "0"+(date.getDate()): date.getDate();
        return noDate;
    }, [])

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


    return(<div className={'work-zone'}>
        <Main count={count} minusMonth ={minusMonth} plusMonth={plusMonth} clickedDay={clickedDay} active={condition} dateId={dateId}/>
        <DayPlanBox dayContent={dayContent} count={dateId} getText={getText}/>
    </div>)
}
