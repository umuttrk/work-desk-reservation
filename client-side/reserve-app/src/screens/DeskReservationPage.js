import Hexagon from "../components/Hexagon";
import Rectangle from "../components/Rectangle";
import React, { useState, useEffect } from "react";
import { useParams } from 'react-router-dom';
import { getAllDesks } from "../api/desks";
import Modal from "../components/Modal/Modal"
import '../App.css'
import 'react-calendar/dist/Calendar.css';
import Calendar from 'react-calendar';
import moment from 'moment';

import { filterReservations } from "../api/reservations";
const DeskReservationPage = () => {
    const date = new Date();
    let currentDate = moment(date).format('YYYY-MM-DD')
    const [selectedDate, setSelectedDate] = useState(null);
    const [boolCheck, setboolCheck] = useState()
    const { floor } = useParams();
    const [hexagonDesks, setHexagonDesks] = useState([]);
    const [rectangleDesks, setRectangleDesks] = useState([]);
    const [modal, setModal] = useState(false);
    const [clickedDeskId, setClickedDeskId] = useState(null);
    const [message, setMessage] = useState(" ")
    const [showMessageModal, setShowMessageModal] = useState(false)
    const [showIdModal, setShowIdModal] = useState(false)
    const [modalInfo, setmodalInfo] = useState({
        pageX: null,
        pageY: null,
        deskId: null
    })

    const isDateDisabled = (date) => {
        let dateFormatted = moment(date).format('YYYY-MM-DD');
        if (dateFormatted <= currentDate) {
            return true;
        } else { return false; }

    };
    const handleDateChange = (date) => {
        if (isDateDisabled(date)) {
            setSelectedDate(null);
            return;
        }

        setSelectedDate(date)
        setboolCheck(true)
    }


    const handleDivClick = (deskId) => {
        setModal(true);
        setClickedDeskId(deskId)
    };

    const handleFilter = async (floor, start_date, end_date) => {
        const result = await filterReservations(floor, start_date, end_date,localStorage.getItem("mail"),localStorage.getItem("accessToken"));
        var busyDesks = result.data;
        const updatedHexagonColors = hexagonDesks.map((hexagon) => {
            return {
                ...hexagon,
                props: {
                    ...hexagon.props,
                    color: hexagon.props.desks.map(item => {
                        if (busyDesks.includes(item.desk_id)) {
                            console.log(item.desk_id + " rengini değiştir");
                            return "red";
                        }
                        return "rgb(79, 214, 45)"; // Eğer busyDesks içinde değilse, aynı öğeyi döndür
                    })
                }
            };
        });
        const updatedRectangleColors = rectangleDesks.map((rectangle) => {
            return {
                ...rectangle,
                props: {
                    ...rectangle.props,
                    color: rectangle.props.desks.map(item => {
                        if (busyDesks.includes(item.desk_id)) {
                            return "red";
                        }
                        return "rgb(79, 214, 45)"; // Eğer busyDesks içinde değilse, aynı öğeyi döndür
                    })
                }
            };
        });
        setHexagonDesks(updatedHexagonColors)
        setRectangleDesks(updatedRectangleColors);
    };


    const handleMessage = (message) => {
        setModal(false);
        setMessage(message)
        setShowMessageModal(true);
    }
    const handleCloseModal = () => {
        setModal(false);
        setClickedDeskId(null)
    };
    const handleMouseOver = (pageX, pageY, desk_id) => {
        setmodalInfo({
            pageX: pageX,
            pageY: pageY,
            deskId: desk_id
        })
        setShowIdModal(true)

    }
    const handleMouseOut = () => {
        setShowIdModal(false)
    }
    useEffect(() => {
        const fetchData = async () => {
            const result = await getAllDesks(floor,localStorage.getItem("mail"),localStorage.getItem("accessToken"));
            const hexagonDeskElements = [];
            const rectangleDeskElements = [];

            result.data.forEach((data) => {
                if (data.desk_size === 2) {
                    rectangleDeskElements.push(
                        <Rectangle
                            onMouseOver={handleMouseOver}
                            onMouseOut={handleMouseOut}
                            onDivClick={handleDivClick}
                            key={data.desk_group_id}
                            deskGroupKey={data.desk_group_id}
                            positionX={data.position_x}
                            positionY={data.position_y}
                            rotate={data.rotation}
                            desks={data.desks}
                            control={false}
                            color={["white","white","white"]} />
                    );
                } else if (data.desk_size === 3) {
                    hexagonDeskElements.push(
                        <Hexagon
                            onMouseOver={handleMouseOver}
                            onMouseOut={handleMouseOut}
                            onDivClick={handleDivClick}
                            key={data.desk_group_id}
                            deskGroupKey={data.desk_group_id}
                            positionX={data.position_x}
                            positionY={data.position_y}
                            rotate={data.rotation}
                            desks={data.desks}
                            control={false}
                            color={["white","white","white"]
                        } />
                    );
                }
            });

            setHexagonDesks(hexagonDeskElements);
            setRectangleDesks(rectangleDeskElements);
        };

        fetchData();
    }, []);



    return (
        <div
          >
            {hexagonDesks!=null&&
              (  hexagonDesks.map((desk) => (
                    <div key={desk.key} >
                        {desk}
                    </div>
                )))
            }
            {
               rectangleDesks!=null&&( rectangleDesks.map((desk) => (
                    <div key={desk.key}>
                        {desk}
                    </div>
                )))
            }
            <div className="filterContainer">
                <div style={{ textAlign: "center" }}>
                    <h1>Tarih filtrele</h1>
                    <div style={{ margin: 10, border: "2px solid black" }}>

                        <Calendar
                            value={selectedDate}
                            onClickDay={(event) => {
                                if (boolCheck && selectedDate) {
                                    setSelectedDate(null)
                                }
                                setboolCheck(false)
                            }}
                            onChange={handleDateChange}
                            tileDisabled={({ date }) => isDateDisabled(date)}
                            selectRange={true}
                        />

                    </div>
                    <button className="btn"
                        disabled={(selectedDate === null ? true : false)}
                        style={{ margin: 5, cursor: selectedDate === null ? "not-allowed" : "pointer" }}
                        onClick={() => {
                            handleFilter(
                                floor,
                                moment(selectedDate[0]).format("YYYY-MM-DD").toString(),
                                moment(selectedDate[1]).format("YYYY-MM-DD").toString()
                            )


                        }}>
                        Filter
                    </button>
                    <br></br>
                    <button className="btn"
                     style={{ margin: 5, cursor: selectedDate === null ? "not-allowed" : "pointer" }}
                    onClick={()=>{
                              const updatedHexagonColors = hexagonDesks.map((hexagon) => {
                                return {
                                    ...hexagon,
                                    props: {
                                        ...hexagon.props,
                                        color: ["white","white","white"]
                                    }
                                };
                            });
                            const updatedRectangleColors = rectangleDesks.map((rectangle) => {
                                return {
                                    ...rectangle,
                                    props: {
                                        ...rectangle.props,
                                        color: ['white','white']
                                    }
                                };
                            });
                            setHexagonDesks(updatedHexagonColors)
                            setRectangleDesks(updatedRectangleColors);
                            setSelectedDate(null)
                    }}> Reset</button>

                </div>

            </div>

            {modal && <Modal deskId={clickedDeskId} onClose={handleCloseModal} onMessage={handleMessage} />}
            {showMessageModal && <div className='modal'>
                <div className='modal-content'>
                    <h1>
                        Mesaj:
                    </h1>
                    {message}
                    <button className="close-modal" onClick={() => { setShowMessageModal(false) }}>
                        X
                    </button>
                </div>
            </div>}
            {showIdModal && <div style={{
                position: "absolute",
                top: modalInfo.pageY - 30,
                left: modalInfo.pageX - 20,
                width: 30, height: 30
            }}>
                <div style={{ background: "white" }}>{modalInfo.deskId}</div>

            </div>}
        </div>
    )
}

export default DeskReservationPage