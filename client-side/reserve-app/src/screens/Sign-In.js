import React, { useEffect, useState } from 'react';
import "../styles/SignInPage.css"
import { useNavigate } from 'react-router-dom';
import login from '../api/user';
import "../components/Modal/Modal.css"

export default function SignIn() {
    const [mail, setMail] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate()
    const [iShow, setiShow] = useState(false);

    const [modalMessage, setModalMessage] = useState("");
    useEffect(() => {
        if ((localStorage.getItem("accessToken")))
            navigate('/home')
    }, [])

    const handleSignIn = async () => {
        console.log("giriş yap basıldı")
        const result = await login(mail, password)
        if (result.status === "success") {
            localStorage.setItem("accessToken", result.accessToken);
            localStorage.setItem("refreshToken", result.refreshToken);
            localStorage.setItem("mail", result.mail);
            setModalMessage("Your registration is successful. Logging in...");
            setTimeout(() => { navigate('/home') }, 1000);
        } else {
            setModalMessage(result.message);
        }
        setiShow(true);

    }
    const onKeyDown = (e) => {
        if (e.key === 'Enter') {
            e.preventDefault();
            e.stopPropagation();
            handleSignIn();
        }
    }
    return (
        <body id='body'>
            <div id="container">
                <div id="login-form">
                    <h1>Giriş Yap</h1>
                    <label for="username">Mail</label>
                    <input className='input-signIn' type="text" placeholder="Mail" value={mail} autoComplete="off" onChange={(e) => { setMail(e.target.value); }} required></input>
                    <label for="password">Password</label>
                    <input className='input-signIn' onKeyDown={onKeyDown} type="password" id="password" name="password" onChange={(e) => { setPassword(e.target.value); }} required></input>
                    <button className='button-signIn' onClick={handleSignIn}>Giriş Yap</button>
                    <button className='button-register-onsignIn' onClick={() => {
                        navigate('/register')
                    }} >Register</button>
                </div>
                {iShow && <div className='modal'>
                    <div className='modal-content'>
                        {modalMessage}
                        <button className="close-modal" onClick={() => { setiShow(false) }}>
                            X
                        </button>
                    </div>
                </div>}
            </div>
        </body>
    )

    {/* <div >
                    <input type="text" placeholder="Username" value={username} autoComplete="off" onChange={(e) => { setUsername(e.target.value); }}></input>
                    <input type="password" id="PasswordInput" onKeyDown={onKeyDown} placeholder="Password" value={password} autoComplete="off" onChange={(e) => { setPassword(e.target.value); }}></input>
                    <button onClick={handleSignIn}>Log in</button>
                    <button onClick={() => {
                            navigate('/register')
                    }} >Sign Up</button>
            </div> */}
}