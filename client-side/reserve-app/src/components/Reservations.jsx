import '../App.css'
import { useState, useEffect } from 'react';
import moment from 'moment';
import { deleteMyReservation } from '../api/reservations';
import { getMyReservations } from '../api/reservations';
const Reservations = (mail) => {
    const [myFutureReservations, setMyFutureReservations] = useState([])
    const [myPastReservations, setMyPastReservations] = useState([])
    const [showMessageModal, setshowMessageModal] = useState(false)
    const [message, setMessage] = useState(" ")
    const date = new Date();
    let currentDate = moment(date).format('YYYY-MM-DD')

    useEffect(() => {
        const fetchData = async () => {
            console.log(mail.mail)
            let futureReservationsArray = [];
            let pastReservationsArray = [];
            const response = await getMyReservations(mail.mail);
            console.log(response)

            if (response.message === "success") {
                response.data.map((data) => {
                    if (data.end_date > currentDate) {
                        futureReservationsArray.push(data)
                    } else {
                        pastReservationsArray.push(data)
                    }
                })
                setMyFutureReservations(futureReservationsArray)
                setMyPastReservations(pastReservationsArray)
            }


            else {
                setMessage(response.message)
                setshowMessageModal(true)

            }

        };
        fetchData();
    }, [])

    const handleCancelReservation = async (reservation_id) => {
        const response = await deleteMyReservation(reservation_id)
        if (response.message === "success") {
            setMyFutureReservations((current) =>
                current.filter((r) => r.reservation_id !== reservation_id)
            );
            setMessage("Başarıyla iptal edildi.")
            setshowMessageModal(true)
        } else {
            setMessage(response.message)
            setshowMessageModal(true)
        }
    }

    return (


        <div className="table-container">

            <div id='title'> <span >My Reservations</span></div>
            <table>
                <thead>
                    <tr>
                        <th>Desk ID</th>
                        <th>Start Date</th>
                        <th>End Date</th>
                        <th></th>
                    </tr>
                </thead>
                <tbody>
                    {myFutureReservations.map((item) => (
                        <tr key={item.reservation_id}>
                            <td>{item.desk_id}</td>
                            <td>{moment(item.start_date).format("DD-MM-YYYY")}</td>
                            <td>{moment(item.end_date).format("DD-MM-YYYY")}</td>
                            <td>
                                <button className='btn' onClick={() => handleCancelReservation(item.reservation_id)}>Cancel</button>
                            </td>
                        </tr>
                    ))}
                    <br />
                    {myPastReservations.map((item) => (
                        <tr key={item.reservation_id}>
                            <td>{item.desk_id}</td>
                            <td>{moment(item.start_date).format("DD-MM-YYYY")}</td>
                            <td>{moment(item.end_date).format("DD-MM-YYYY")}</td>
                            <td>
                                {/* <button onClick={() => console.log("first")}>Cancel</button> */}
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
            {showMessageModal && <div className='modal rsr'>
                <div className='modal-content'>
                    <h1>
                        Mesaj:
                    </h1>
                    {message}
                    <button className="close-modal btn" onClick={() => { setshowMessageModal(false) }}>
                        X
                    </button>
                </div>
            </div>}
        </div>
        // <div className="container" >
        //     {myFutureReservations.map((reservation) => (
        //         <div className='data-item'>
        //                 <span>{reservation.end_date}</span>
        //                 <span>{reservation.end_date}</span>
        //                 <span>{reservation.end_date}</span>
        //             <button>Buton</button>
        //         </div>
        //     ))}

        //     <hr />
        //     {myPastReservations.map((reservation) => (
        //         <div className='data-item'>
        //          <span>{reservation.end_date}</span>
        //             <button>Buton</button>
        //         </div>
        //     ))}
        //     {showMessageModal && <div className='modal rsr'>
        //         <div className='modal-content'>
        //             <h1>
        //                 Mesaj:
        //             </h1>
        //             {message}
        //             <button className="close-modal" onClick={() => { setshowMessageModal(false) }}>
        //                 X
        //             </button>
        //         </div>
        //     </div>}
        // </div>

    )
}


export default Reservations;