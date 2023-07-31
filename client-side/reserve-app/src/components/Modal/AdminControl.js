import './Modal.css'
import {deleteMyReservation} from "../../api/reservations"

import moment from 'moment';

const AdminControl = ({ busyDates, onClose ,onMessage}) => {

    const handleDeleteReservation=async(reservation_id)=>{
        const result=await deleteMyReservation(reservation_id);
        if(result.message==="success")
            onMessage("Reservation deleted succesfully")
        else
            onMessage("Server Error")
    }

    return (
            <div className="modal">
                <div className="modal-content mdl test">

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

                    <button className="close-modal btn" style={{backgroundColor:"red"}} onClick={() => onClose(false)}>
                        X
                    </button>
                </div>


            </div>
      
    )
}


export default AdminControl;