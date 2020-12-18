import React, {useEffect, useState, useCallback} from "react";
import {IsValidEmail} from "../Services/ValidEmail";
import "./ModalRegistration.css";
import {FetchLogin} from "../Services/FetchLogin";

export const ModalRegistration = (props) =>{

    const noWarning = {
        content: <p> </p>,
        warning: false
    };
    const textInput = React.createRef();
    const {loginModalClass, isLogin, openLogSingModal, setLoggedInInfo} = {...props};
    const modalClass = loginModalClass + " modal-log";
    const [login, setLogin] = useState("");
    const [loginWarning, setLoginWarn] = useState(noWarning);
    const [password, setPassword] = useState("");
    const [passwordWarning, setPasswordWarn] = useState(noWarning);
    const [passwordRepeat, setPasswordRepeat] = useState("");
    const [passwordRepeatWarning, setPasswordRepeatWarn] = useState(noWarning);


    const focusTextInput = useCallback(() =>{
        textInput.current.focus();
    }, [textInput]);

    useEffect(() =>{
        focusTextInput();
    }, []);

    const inputs = (isLogin) =>{
        if(!isLogin){
            return  <input required ref={textInput}
                           placeholder="repeat password"
                           name="password repeat"
                           type="mail"
                           className="modal__input"
                           autoComplete='off'
                           onChange={onValueChange}
                           value={passwordRepeat}/>
        }
    }

    function onValueChange(e){
        switch (e.target.name){
            case "login":
                setLogin(e.target.value);
                break;
            case "password":
                setPassword(e.target.value);
                break;
            case "password repeat":
                setPasswordRepeat(e.target.value);
                break;
            default:{}
        }
    }

    function onSubmit(e){
        e.preventDefault();
        if(!IsValidEmail(login)){
            setLoginWarn({content: <p>Укажите верный мейл</p>,  warning:true})
        }
        else{
            setLoginWarn(noWarning)
        }
        if(password.length === 0){
            setPasswordWarn({
            content:<p>пароль слишком короткий</p>,
            warning: true
        })
        }
        else if(password.length < 8){
            setPasswordWarn({
            content:<p>пароль слишком короткий</p>,
            warning: true
        })
        }
        else{
            setPasswordWarn(noWarning)
        }
        if(!isLogin && password !== passwordRepeat){
            setPasswordRepeatWarn({content: <p>пароли не совпадают</p>, warning: true})
        }
        else{
            setPasswordRepeatWarn(noWarning)
        }

        if(!loginWarning.warning && !passwordWarning.warning && !passwordRepeatWarning.warning) {
            FetchLogin(login, password)
                .then(resp => {
                    if(resp.jwt) setLoggedInInfo(resp);
                    setTimeout(()=>{}, 2000)
                })
                .then(openLogSingModal(false))
                .catch(error => console.log("Error: " + error))
        }
    }


    function close(e){
        if(e.target.classList.contains('show'))
        {
            openLogSingModal(false);
        }
    }

    return(
        <div className={modalClass} onClick = {close}>
            <div className="modal-dialog">
                <div className="modal-content">
                    <form  action="#" onSubmit={onSubmit}>
                        <div>
                            <div onClick={() => openLogSingModal(false)} className="modal__close">&times;</div>
                            <input required ref={textInput}
                                   placeholder="login"
                                   name="login" type="mail"
                                   className="modal__input"
                                   autoComplete='off'
                                   onChange={onValueChange}
                                   value={login}/>
                            {loginWarning.content}
                            <input placeholder="password"
                                   name="password" type="mail"
                                   className="modal__input"
                                   autoComplete='off'
                                   onChange={onValueChange}
                                   value={password}/>
                            {passwordWarning.content}
                            {inputs(isLogin)}
                            {passwordRepeatWarning.content}
                        </div>
                        <button className="btnModal">Submit</button>
                    </form>
                </div>
            </div>
        </div>
    )


}