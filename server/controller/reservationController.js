const Floor = require('../models/associations').Floor;
const Desk = require('../models/associations').Desk;
const Reservation = require('../models/associations').Reservation;
const sequelize = require('../utils/dbConnection').sequelize
const { QueryTypes, where } = require('sequelize');
const Sequelize = require('sequelize');
var moment = require('moment');
const { Op } = require('sequelize')

const date = new Date();
exports.getAllFloors = async (req, res) => {
    let allFloors;
    try {
        allFloors = await Floor.findAll({
            raw: true,
            attributes: ['floor_number']
            //Other parameters
        });
    } catch (error) {
        res.status(500).send({ "error_message": error })
    }
    let floor_array = []
    allFloors.map(e => floor_array.push(e.floor_number))
    res.status(200).send({ message: 'success', data: floor_array })
}

exports.getAllDesks = async (req, res) => {
    const { floor } = req.body
    let results;
    try {

        results = await sequelize.query(`
        SELECT *
        FROM floors
        INNER JOIN desks ON desks.floor_id = floors.floor_id
        WHERE floors.floor_number = ${floor};`,
            { type: QueryTypes.SELECT })

    } catch (error) {
        console.log(error)
        return res.status(500).send({ "error_message": error })
    }
    console.log(results)
    res.status(200).send({ message: 'success', data: results })
}


exports.getBusyDates = async (req, res) => {
    const { deskId } = req.body
    let currentDate = moment(date).format('YYYY-MM-DD')
    console.log(currentDate)
    let dbResults;
    try {
        dbResults = await Reservation.findAll({
            attributes: ['start_date', 'end_date'],
            where: {
                desk_id: deskId,
                end_date: {
                    [Op.gt]: currentDate
                }
            },
        }
        )
    } catch (error) {
        console.log(error)
        return res.status(500).send({ "error_message": error })
    }


    // dbResults.forEach((element) => {
    //     if (currentDate < moment(element.end_date).utc().format('YYYY-MM-DD')) {
    //         revisedResults.push({
    //             "start_date": moment(element.start_date).utc().format('YYYY-MM-DD'),
    //             "end_date": moment(element.end_date).utc().format('YYYY-MM-DD')

    //         })
    //     } else {
    //         console.log("geçmiş tarih")
    //     }
    // });
    //sadece rezervasyonların bitiş tarihi bugünün tarihinden sonra olanlar olacak şekilde filtrelendi
    res.status(200).send({ message: 'success', data: dbResults })
}


exports.reserveDesk = async (req, res) => {
    const { desk_id, start_date, end_date, mail } = req.body;

    let reservationInstance;
    try {
        const isPossible = await isReservable(desk_id, start_date, end_date);
        if (isPossible) {
            reservationInstance = await Reservation.create({
                desk_id: desk_id,
                start_date: start_date,
                end_date: end_date,
                reserved_by: mail
            })

        } else {
            return res.status(400).send({ message: 'Unvalid dates' })
        }
    } catch (error) {
        console.log(error)
        return res.status(500).send({ "error_message": error })
    }

    res.status(200).send({ message: 'success', data: reservationInstance })

}



exports.getMyReservations = async (req, res) => {
    const { mail }= req.body;
    let allReservations;
    if(!mail){
        return res.status(400).send({message:"enter valid mail"})
    }
    try {
        allReservations= await Reservation.findAll({
            attributes:['reservation_id','start_date','end_date'],
            where:{
                reserved_by:mail
            }
        })
    } catch (error) {
        return res.status(500).send({ "error_message": error })
    }
    return res.status(200).send({message:'success',data:allReservations});
}



exports.deleteMyReservation=async (req,res)=>{
    const {reservation_id}=req.body;
    try {
       const row= await Reservation.findOne(
            {
                where:{
                    reservation_id:reservation_id
                }
            }
        )
        if(!row)
            return res.status(400).send({ message:"Not found reservation for your input id" })
        await row.destroy();
    } catch (error) {
        console.log(error)
        return res.status(500).send({ "error_message": error.message })
    }
    res.status(200).send({message:'success'})
}

async function isReservable(desk_id, startDate, endDate) {
    let currentDate = moment(date).tz("UTC").format('YYYY-MM-DD')
    let reservations;
    try {
        reservations = await Reservation.findAll({
            attributes: ['start_date', 'end_date'],
            where: {
                desk_id: desk_id,
                end_date: {
                    [Op.gt]: currentDate
                }
            },
        }
        )
        for (const r of reservations) {
            if (
                (startDate > endDate) ||
                (startDate == r.start_date) ||
                (endDate == r.end_date) ||
                (startDate < r.start_date && endDate > r.start_date) ||
                (startDate > r.start_date && endDate < r.end_date) ||
                (startDate < r.end_date && endDate > r.end_date)
            ) {

                return false;
            }
        }
        return true

    } catch (error) {
        console.log(error)
        return res.status(500).send({ "error_message": error })
    }
}


