import React, {useCallback} from 'react';
import './Header.css'

export const Header = (props) =>{

    const {openLogSingModal, loggedInInfo} = {...props};

    const isLogged = useCallback(() =>{
        if(!loggedInInfo){
            return(
                <div className="btn-box">
                    <button className='btn-nav login' onClick={() =>openLogSingModal(true)}>Log in</button>
                    <button className='btn-nav signup' onClick={() =>openLogSingModal(false)}>Sing Up</button>
                </div>
            )
        }
        else return(
            <div className="name">
                <h1>{loggedInInfo.user.username}</h1>
            </div>
        )
    }, [loggedInInfo, openLogSingModal])

    return(
        <div className="d-flex header">
            <div className='logo'>LOGO</div>
            {isLogged()}
        </div>
    )
}
