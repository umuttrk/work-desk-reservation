import './Modal.css'
import { deleteMyReservation } from "../../api/reservations"
import CheckPopup from './CheckPop-up';

import React, { useState, useEffect } from 'react';
import Calendar from 'react-calendar';
import moment from 'moment';

const AdminControl = ({ desk_id,busyDates, onClose, onMessage }) => {
    const date = new Date();
    let currentDate = moment(date).format('YYYY-MM-DD')
    const [selectedDate, setSelectedDate] = useState(null);
    const [boolCheck, setboolCheck] = useState();
    const [checkModal, setCheckModal] = useState(false)
    const [mail, setMail] = useState("");
    const isDateDisabled = (date) => {
        let dateFormatted = moment(date).format('YYYY-MM-DD');
        if (dateFormatted <= currentDate) {
            return true;
        }
        if (Array.isArray(busyDates) && busyDates.length > 0) {
            return busyDates.some((busyDate) => {
                if (dateFormatted >= busyDate.start_date && dateFormatted <= busyDate.end_date) {
                    return true;
                }
            });
        } else {
            return false;
        }
    };


    const handleDateChange = (date) => {
        if (isDateDisabled(date)) {
            setSelectedDate(null);
            return;
        }
        let start = moment(date[0]).format('YYYY-MM-DD');
        let end = moment(date[1]).format('YYYY-MM-DD');
        for (var i = moment(start); i.isBefore(end); i.add(1, 'days')) {
            if (isDateDisabled(i))
                return
        }
        setSelectedDate(date)
        setboolCheck(true)
    }


    const handleCloseCheckPopup = () => {

        setCheckModal(false);
    }
    const handleMessage = (msg) => {
        onMessage(msg)
    }
    const handleSubmitClick = () => {
        setCheckModal(true);
    }
    const handleCancelClick = () => {
        setSelectedDate(null);
    };
    const handleDeleteReservation = async (reservation_id) => {
        const result = await deleteMyReservation(reservation_id, localStorage.getItem("mail"), localStorage.getItem("accessToken"));
        if (result.message === "success")
            onMessage("Reservation deleted succesfully")
        else
            onMessage("Server Error")
    }

    return (
        <>
            <div className="modal" >
                <div className="modal-content-admin mdl test">
                    <table>
                        <thead>
                            <tr>
                                <th>Start Date</th>
                                <th>End Date</th>
                                <th>Reserved By</th>
                                <th></th>
                            </tr>
                        </thead>
                        <tbody>
                            {busyDates.map((item) => (
                                <tr key={item.reservation_id}>
                                    <td>{moment(item.start_date).format("DD-MM-YYYY")}</td>
                                    <td>{moment(item.end_date).format("DD-MM-YYYY")}</td>
                                    <td>{item.reserved_by}</td>
                                    <td>
                                        <button className='btn' onClick={() => handleDeleteReservation(item.reservation_id)}>Cancel</button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>

                <div className='modal-content-admin-calendar mdl' style={{

                }}>
                    <h1>Assign desk</h1>
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
                    <button className="close-modal btn" style={{ backgroundColor: "red" }} onClick={() => onClose(false)}>
                        X
                    </button>
                    <label for="username">Mail:</label>
                    <br></br>
                    <input className='input-signIn' type="text" placeholder="Mail" value={mail} autoComplete="off" onChange={(e) => { setMail(e.target.value); }} required></input>
                   <br/>
                    <button className={"btn"} style={{ marginTop: 2 }} disabled={(selectedDate === null ? true : false)} onClick={handleSubmitClick}>
                        Submit
                    </button>
                    {selectedDate && (
                        <button className={"btn"} style={{ position: "absolute", right: 40, marginTop: 2 }} onClick={handleCancelClick}>Cancel</button>
                    )}
                </div>
                {checkModal && <CheckPopup dateInterval={selectedDate} desk_id={desk_id} mail={mail} onMessage={handleMessage} onClose={handleCloseCheckPopup}></CheckPopup>}
            </div>
        </>

    )
}


export default AdminControl;