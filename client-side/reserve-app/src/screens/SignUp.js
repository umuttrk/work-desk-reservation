import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { register } from '../api/user';
import "../styles/SignInPage.css"
import "../components/Modal/Modal.css"
export default function SignUp() {
    const [mail, setMail] = useState("");
    const [password, setPassword] = useState("");
    const [name, setName] = useState("")
    const navigate = useNavigate()

    const [iShow, setiShow] = useState(false);

    const [modalMessage, setModalMessage] = useState("");

    useEffect(() => {
        if ((localStorage.getItem("accessToken")))
            navigate('/home')
        console.log("acces token kontrol ediliyor eğer varsa /Home'a navigate ")
    }, [])

    const handleSignUp = async () => {
        console.log("kayıt yap basıldı")
        const result = await register(name, mail, password);
        console.log(result)
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
            handleSignUp();
        }
    }

    return (
        <body id='body'>
            <div id='container'>
                <div id="register-form">
                    <h1>Kayıt Ol</h1>
                    <label for="username">Name</label>
                    <input className='input-signIn' type="text" placeholder="Name" value={name} autoComplete="off" onChange={(e) => { setName(e.target.value); }} required></input>
                    <label for="username">Mail</label>
                    <input className='input-signIn' type="text" placeholder="Mail" value={mail} autoComplete="off" onChange={(e) => { setMail(e.target.value); }} required></input>
                    <label for="password">Password</label>
                    <input className='input-signIn' onKeyDown={onKeyDown} placeholder="********" type="password" id="password" name="password" onChange={(e) => { setPassword(e.target.value); }} required></input>

                    <button className='button-signIn' onClick={handleSignUp}>Register</button>

                    <button className='button-signIn-onregister' onClick={() => {
                        navigate('/login')
                    }} >Log-in</button>
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
}