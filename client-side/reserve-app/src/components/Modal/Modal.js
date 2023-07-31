import React, { useState, useEffect } from 'react';
import ReactDOM from 'react-dom';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import moment from 'moment';
import "./Modal.css";
import getBusyDates from '../../api/reservations';
import CheckPopup from './CheckPop-up';
import AdminControl from './AdminControl';

const Modal = ({ deskId, onClose, onMessage }) => {
    const date = new Date();
    let currentDate = moment(date).format('YYYY-MM-DD')
    const isAdmin = true;
    const [pageLoaded, setPageLoaded] = useState(false);
    const [checkModal, setCheckModal] = useState(false)
    const [busyDates, setBusyDates] = useState([]);
    const [selectedDate, setSelectedDate] = useState(null);
    const [boolCheck, setboolCheck] = useState();
    const [showAdminControlModal, setShowAdminControlModal] = useState(false)
    useEffect(() => {
        const fetchData = async () => {
            const response = await getBusyDates(deskId);
            setBusyDates(response.data);
            setPageLoaded(true)
        };
        fetchData();
    }, []);
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
    const handleMessage = (msg) => {
        onMessage(msg)
    }
    const handleSubmitClick = () => {
        setCheckModal(true);
    }

    const handleCloseCheckPopup = () => {

        setCheckModal(false);
    }
    const handleCloseAdminPopup = () => {

        setShowAdminControlModal(false);
    }
    const handleCancelClick = () => {
        setSelectedDate(null);
    };

    if (pageLoaded) {
        return (
            <div className="modal">
                <div className="modal-content">
                    <h2>masa id:{deskId} </h2>
                    <h4>Lütfen rezerve etmek istediğiniz aralığı seçiniz.</h4>
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
                    <button className="close-modal btn" style={{backgroundColor:"red"}} onClick={onClose}>
                        X
                    </button>
                    <button className="control-res btn" style={{ display: isAdmin ? "block" : "none" }} onClick={() => { setShowAdminControlModal(true) }}>
                        CONTROL
                    </button>

                    <button className={"btn"} style={{ marginTop: 2 }} disabled={(selectedDate === null ? true : false)} onClick={handleSubmitClick}>
                        Submit
                    </button>
                    {selectedDate && (
                        <button className={"btn"} style={{ position: "absolute", right: 40, marginTop: 2 }} onClick={handleCancelClick}>Cancel</button>
                    )}
                </div>
                {checkModal && <CheckPopup dateInterval={selectedDate} desk_id={deskId} mail={"modaljs115@mail.com"} onMessage={handleMessage} onClose={handleCloseCheckPopup}></CheckPopup>}
                {showAdminControlModal && <div className='adminContainer'><AdminControl busyDates={busyDates} onMessage={handleMessage} onClose={handleCloseAdminPopup} ></AdminControl></div>}
            </div>
        );
    }
};

export default Modal;