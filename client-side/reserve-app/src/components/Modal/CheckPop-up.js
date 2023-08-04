import './Modal.css'
import moment from 'moment';
import { reserveDesk } from "../../api/reservations"

const CheckPopup = ({ dateInterval, onClose, desk_id, mail, onMessage }) => {

    const handleReserve = async () => {


        const response = await reserveDesk(
            desk_id,
            moment(dateInterval[0]).format("YYYY-MM-DD"),
            moment(dateInterval[1]).format("YYYY-MM-DD"),
            mail,
            localStorage.getItem("mail"),
            localStorage.getItem("accessToken")
        )

        if (response.message === "success") {
            onMessage("Başarıyla rezerve edildi. :)")
        }
        else  {
            onMessage(response.message+" error, INTERNAL SERVER ERROR :( (Tekrar deneyin).")
        }

    }



    return (
        <div className="modal">
            <div className="modal-content mdl">

                <p>
                    Başlangıç:
                    <b style={{ paddingLeft: 10 }}>

                        {moment(dateInterval[0]).format('DD-MM-YYYY')}
                    </b>

                    <br />
                    Bitiş:
                    <b style={{ paddingLeft: 10 }}>

                        {moment(dateInterval[1]).format('DD-MM-YYYY')}
                    </b>
                    <br />
                    arası rezerve edilecek devam etmek istiyor musunuz?
                    <br />
                    mail:{mail}
                    <br />
                    <button  className={"btn"} onClick={handleReserve}>
                        Onaylıyorum
                    </button>
                </p>


                <button className="close-modal btn" style={{backgroundColor:"red"}} onClick={() => onClose(false)}>
                    X
                </button>
            </div>


        </div>
    )
}



export default CheckPopup;