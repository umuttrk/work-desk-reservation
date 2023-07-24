//katlar databaseden getirilecek
import getFloors from "../api/floors";
import { createFloor } from "../api/floors";
import React, { useState, useEffect, useRef } from "react";
import { useNavigate } from 'react-router-dom';

import "../AdminHomepage.css";

const AdminHomepage = () => {
    const inputRef = useRef();

    const navigate = useNavigate();
    const [floors, setFloors] = useState([]);
    useEffect(() => {
        const fetchData = async () => {
            const result = await getFloors();
            setFloors(result.data);
        }
        fetchData()
    }, []);
    function editFloor(params) {
        navigate('/admin-design-floor/' + params)
    }
    const handleAddFloor = async (event) => {
        event.preventDefault();
        const result = await createFloor(inputRef.current.value)
        if (result.message === "success") {
            setFloors((prevFloors) => [...prevFloors, result.data])
            inputRef.current.value = ""

        } else {
            inputRef.current.value = "Farklı bir değer gir!"
        }
        //navigate('/admin-design-floor')
    }

    return (

        <>
            <div>
                <p>Welcome Admin </p>
                <h2>Kayıtlı katlar</h2>
                {floors.map((floor) => (
                    <div className="floor-item" key={floor.floor_id}>
                        <p>{floor.floor_number}</p>
                        <button onClick={(event) => {
                            editFloor(floor.floor_id)
                        }}> Düzenle</button>
                        <button onClick={(event) => {
                            // editFloor(floor)
                        }}> Sil</button>
                    </div>

                ))

                }
                {
                    <>
                        <form onSubmit={handleAddFloor}>
                            <input type="text" ref={inputRef} />
                            <button type="submit">Kat Ekle</button>
                        </form>



                    </>}
            </div>

        </>
    )
}

export default AdminHomepage;