import React, {useState, useEffect} from 'react';
import "./addEventModal.css"


export default function AddEventModal(props){

    const textInput = React.createRef();
    const [text, setText] = useState('');
    const {modal, time, openCloseModal, getText, count} = {...props};
    let modalDiv = "modal ";
    if(modal){
        modalDiv += "show ";
     }
    else modalDiv += "hide ";
    const placeholder = `Что вы планируете в ${time}:00`;

    function focusTextInput(){
        textInput.current.focus();
    }

    useEffect(() =>{
        focusTextInput();
    })

    function onValueChange(e){
        setText(e.target.value)
    }

    function onSubmit(e){
        e.preventDefault();
        openCloseModal(time);
        getText(text, count, time);
        setText('')
    }

        return(
            <div className={modalDiv}>
                <div className="modal__dialog">
                    <div className="modal__content">
                        <form  action="#" onSubmit={onSubmit}>
                            <div onClick={() => {openCloseModal(time)}} className="modal__close">&times;</div>
                            <div className="modal__title">{placeholder}</div>
                            <input required ref={textInput}  placeholder="ввод..." name="event" type="text" className="modal__input"
                                   onChange={onValueChange} value={text} autoComplete='off'/>
                            <button className="btn btn_dark btn_min">Отправить</button>
                        </form>
                    </div>
                </div>
            </div>
            )
    }