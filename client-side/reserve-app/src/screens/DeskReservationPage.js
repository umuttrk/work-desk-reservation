import Hexagon from "../components/Hexagon";
import Rectangle from "../components/Rectangle";
import React, { useState, useEffect } from "react";
import { useParams } from 'react-router-dom';
import { getAllDesks } from "../api/desks";
import Modal from "../components/Modal/Modal"




const DeskReservationPage = () => {
    const { floor } = useParams();
    const [hexagonDesks, setHexagonDesks] = useState([]);
    const [rectangleDesks, setRectangleDesks] = useState([]);
    const [modal, setModal] = useState(false);
    const [clickedDeskId, setClickedDeskId] = useState(null);

    const handleDivClick = (deskId) => {
        setModal(true);
        setClickedDeskId(deskId)
    };

    const handleCloseModal = () => {
        setModal(false);
        setClickedDeskId(null)
    };

    useEffect(() => {
        const fetchData = async () => {
            const result = await getAllDesks(floor);
            const hexagonDeskElements = [];
            const rectangleDeskElements = [];

            result.data.forEach((data) => {
                if (data.desk_size === 2) {
                    rectangleDeskElements.push(
                        <Rectangle
                            onDivClick={handleDivClick}
                            key={data.desk_group_id}
                            deskGroupKey={data.desk_group_id}
                            positionX={data.position_x}
                            positionY={data.position_y}
                            rotate={data.rotation}
                            desks={data.desks}
                            control={false} />
                    );
                } else if (data.desk_size === 3) {
                    hexagonDeskElements.push(
                        <Hexagon
                            onDivClick={handleDivClick}
                            key={data.desk_group_id}
                            deskGroupKey={data.desk_group_id}
                            positionX={data.position_x}
                            positionY={data.position_y}
                            rotate={data.rotation}
                            desks={data.desks}
                            control={false} />
                    );
                }
            });

            setHexagonDesks(hexagonDeskElements);
            setRectangleDesks(rectangleDeskElements);
        };

        fetchData();
    }, [floor]);



    return (
        <div>
            {
                hexagonDesks.map((desk) => (
                    <div key={desk.key} >
                        {desk}
                    </div>
                ))
            }
            {
                rectangleDesks.map((desk) => (
                    <div key={desk.key}>
                        {desk}
                    </div>
                ))
            }
            {modal && <Modal deskId={clickedDeskId} onClose={handleCloseModal} />}

        </div>
    )
}

export default DeskReservationPage