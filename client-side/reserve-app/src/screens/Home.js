import React, { useState, useEffect } from "react";
import getFloors from "../api/floors";
import { useNavigate } from 'react-router-dom';
import Reservations from "../components/Reservations";

const Home = () => {
    const navigate = useNavigate();

    function handleNavigateFloor(floor_id) {
        navigate('/desk-reservation/' + floor_id)
    }
    const [floors, setFloors] = useState([]);

    useEffect(() => {
        var token=localStorage.getItem("accessToken")
        if(!token)
            navigate('/login')
        const fetchData = async () => {
            const result = await getFloors(token,localStorage.getItem("mail"));
            if(result.message==="success")
                setFloors(result.data);
        }
        fetchData()
    }, []);
console.log(floors)
    return (
        <div>
            {floors.map((floor) => (
                <button
                className="btn" 
                style={{
                    width: 100,
                    height: 75,
                    margin: 50
                }} onClick={() => handleNavigateFloor(floor.floor_id)} key={floor.floor_id}>KAT: {floor.floor_number}</button>
            ))}
            <div className="reservations-container">
                <Reservations mail={localStorage.getItem("mail")}></Reservations>
            </div>
            <br/>
            <br/>
            <br/>
            <br/>
            <br/>
            <br/>
            <button onClick={()=>{
                localStorage.removeItem("accessToken");
                localStorage.removeItem("refreshToken");
                localStorage.removeItem("mail");
                navigate('/login')
            }}className="btn" style={{backgroundColor:"brown"}}>Log out</button>
        </div>
    )
}

export default Home;