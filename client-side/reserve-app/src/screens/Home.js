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
        const fetchData = async () => {
            const result = await getFloors();
            setFloors(result.data);
        }
        fetchData()
    }, []);

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
                <Reservations mail={"modaljs115@mail.com"}></Reservations>
            </div>
        </div>
    )
}

export default Home;