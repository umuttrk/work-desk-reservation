//katlar databaseden getirilecek
import getFloors from "../api/floors";
import { createFloor } from "../api/floors";
import React, { useState, useEffect, useRef } from "react";
import { useNavigate } from 'react-router-dom';
import { getAllDesks } from "../api/desks"
import "../AdminHomepage.css";
import { deleteFloor } from "../api/floors";

const AdminHomepage = () => {
    const inputRef = useRef();
    const [showMessageModal, setshowMessageModal] = useState(false)
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
    const handleDeleteFloor = async (floor_id) => {
        const desks = await getAllDesks(floor_id);

        if (desks.data.length === 0) {
            await deleteFloor(floor_id)
            setFloors(floors.filter(item => item.floor_id != floor_id))
        } else {
            setshowMessageModal(true)
        }
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
                            handleDeleteFloor(floor.floor_id)
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
            {showMessageModal && <div className="modal">
                <div className="modal-content">
                To delete a floor, all desks have to be deleted belongs to that floor.
                    <button className="close-modal btn" style={{backgroundColor:"red"}} onClick={()=>{setshowMessageModal(false)}}>
                        X
                    </button>
                </div>
                
            </div>}
        </>
    )
}

export default AdminHomepage;