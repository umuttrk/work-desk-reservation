const Floor = require('../models/associations').Floor;
const DeskGroup = require('../models/associations').DeskGroup;
const Desk = require('../models/associations').Desk;
const Reservation = require('../models/associations').Reservation;
const sequelize = require('../utils/dbConnection').sequelize
const { QueryTypes, where } = require('sequelize');
const Sequelize = require('sequelize');
var moment = require('moment');
const { Op } = require('sequelize');

const date = new Date();
exports.getAllFloors = async (req, res) => {
    let allFloors;
    try {
        allFloors = await Floor.findAll({
            raw: true,
            attributes: ['floor_id', 'floor_number']
            //Other parameters
        });
    } catch (error) {
        return res.status(500).send({ "error_message": error })
    }
    // let floor_array = []
    // allFloors.map(e => floor_array.push(e.floor_number))
    res.status(200).send({ message: 'success', data: allFloors })
}

exports.getAllDesks = async (req, res) => {
    const { floor } = req.params
    let results;
    try {
        results = await sequelize.query(
            `
            SELECT 
                floors.floor_number,
                desk_groups.desk_group_id,
                desk_groups.desk_size,
                desk_groups.position_x,
                desk_groups.position_y,
                desk_groups.rotation,

                JSON_ARRAYAGG(
                    JSON_OBJECT(
                        'desk_id',desks.desk_id,
                        'order_in_desk_group', desks.order_in_desk_group
                    )
                ) as desks
            FROM floors
            INNER JOIN desk_groups ON desk_groups.floor_id = floors.floor_id
            INNER JOIN desks ON desks.desk_group_id = desk_groups.desk_group_id
            WHERE floors.floor_id = ${floor}
            GROUP BY floors.floor_number, desk_groups.desk_group_id;
        `
            ,
            { type: QueryTypes.SELECT })

    } catch (error) {
        console.log(error)
        return res.status(500).send({ "error_message": error })
    }
    console.log(results)
    res.status(200).send({ message: 'success', data: results })
}
exports.deleteFloor=async (req,res)=>{
    const {floor}=req.params;
    try {
        const row = await Floor.findOne(
            {
                where: {
                    floor_id: floor
                }
            }
        )
        if (!row)
            return res.status(400).send({ message: "Not found floor for your input id" })
        await row.destroy();
        return res.status(200).send({ message: 'success' })
    } catch (error) {
        return res.status(500).send({ "message": error })
    }

}
exports.getBusyDates = async (req, res) => {
    const { deskId } = req.params
    let currentDate = moment(date).format('YYYY-MM-DD')
    console.log(currentDate)
    let dbResults;
    try {
        dbResults = await Reservation.findAll({
            attributes: ['reservation_id','start_date', 'end_date','reserved_by'],
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
        return res.status(500).send({ "message": error })
    }

    res.status(200).send({ message: 'success', data: dbResults })
}

exports.reserveDesk = async (req, res) => {
    const { desk_id, start_date, end_date, mail } = req.body;
    console.log(start_date)
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
            return res.status(400).send({ message: 'Invalid dates' })
        }
    } catch (error) {
        console.log(error)
        return res.status(500).send({ "message": error })
    }

    res.status(200).send({ message: 'success', data: reservationInstance })

}

exports.getMyReservations = async (req, res) => {
    const { myMail } = req.params;
    let allReservations;
    if (!myMail) {
        return res.status(400).send({ message: "enter valid mail" })
    }
    try {
        allReservations = await Reservation.findAll({
            attributes: ['reservation_id', 'desk_id', 'start_date', 'end_date'],
            where: {
                reserved_by: myMail
            }
            , order: [['updatedAt', 'DESC']]
        })
    } catch (error) {
        console.log("hataaaa")
        return res.status(500).send({ "message": error })
    }
    return res.status(200).send({ message: 'success', data: allReservations });
}

exports.filterDesks = async (req, res) => {
    const { floor } = req.params;
    const startDate = req.query.startDate;
    const endDate = req.query.endDate;
    let results;

    busyDesks=[]
    try {
        results = await sequelize.query(
        `
            SELECT 
                reservations.desk_id,
                reservations.start_date,
                reservations.end_date
            FROM floors
            INNER JOIN desk_groups ON desk_groups.floor_id = floors.floor_id
            INNER JOIN desks ON desks.desk_group_id = desk_groups.desk_group_id
            INNER JOIN reservations ON desks.desk_id = reservations.desk_id
            WHERE floors.floor_id = ${floor} AND reservations.end_date >NOW()
        `
            ,
            { type: QueryTypes.SELECT })


            results.map((r)=>{
                if (
                    (startDate > endDate) ||
                    (startDate == r.start_date) ||
                    (endDate == r.end_date) ||
                    (startDate <= r.start_date && endDate >= r.start_date) ||
                    (startDate >= r.start_date && endDate <= r.end_date) ||
                    (startDate <= r.end_date && endDate >= r.end_date)
                ) {
    
                    busyDesks.push(r.desk_id)
                }
            })


    } catch (error) {
        console.log("hataaaa")
        return res.status(500).send({ "message": error })
    }
    return res.status(200).send({ message: 'success', data: busyDesks });
}

exports.deleteMyReservation = async (req, res) => {
    const { reservation_id } = req.params;
    try {
        const row = await Reservation.findOne(
            {
                where: {
                    reservation_id: reservation_id
                }
            }
        )
        if (!row)
            return res.status(400).send({ message: "Not found reservation for your input id" })
        await row.destroy();
    } catch (error) {
        console.log(error)
        return res.status(500).send({ message: error.message })
    }
    res.status(200).send({ message: 'success' })
}

exports.createDesk = async (req, res) => {
    const { floor_id, position_x, desk_size, position_y, rotation, owner } = req.body;
    let deskGroupInstance;
    let deskArray = [];
    let resultDbDeskArray
    try {
        deskGroupInstance = await DeskGroup.create({
            floor_id: floor_id,
            position_x: position_x,
            desk_size: desk_size,
            position_y: position_y,
            rotation: rotation,
            owner: owner
        });
        for (let i = 0; i < desk_size; i++) {
            deskArray.push({
                "order_in_desk_group": i,
                "desk_group_id": deskGroupInstance.dataValues.desk_group_id
            })
        }

        resultDbDeskArray = await Desk.bulkCreate(deskArray);
    } catch (error) {
        console.log(error)
        return res.status(500).send({ "message": error })
    }
    return res.status(200).send({ message: 'success', data: resultDbDeskArray })

}

exports.updateDeskGroup = async (req, res) => {
    const { desk_group_id, position_x, position_y, rotation } = req.body;
    let deskInstance;
    try {
        deskInstance = await DeskGroup.update({
            position_x: position_x,
            position_y: position_y,
            rotation: rotation
        }, {
            where: {
                desk_group_id: desk_group_id
            }
        });

    } catch (error) {
        console.log(error)
        return res.status(500).send({ "error_message": error })
    }
    console.log("başarılı")
    return res.status(200).send({ message: 'success', data: deskInstance })

}

exports.deleteDeskGroup = async (req, res) => {
    const { desk_group_id } = req.params;
    let row;
    try {
        row = await DeskGroup.findOne({
            where: {
                desk_group_id: desk_group_id
            }
        });
        if (!row)
            return res.status(400).send({ message: "Not found reservation for your input id" })
        await row.destroy();
    } catch (error) {
        console.log(error)
        return res.status(500).send({ "error_message": error })
    }
    return res.status(200).send({ message: 'success' })

}

exports.createFloor = async (req, res) => {
    const { floor_number } = req.body;
    let floor_instance;
    try {
        floor_instance = await Floor.create({ floor_number })
    } catch (error) {
        console.log(error)
        return res.status(500).send({ "error_message": error })
    }
    return res.status(200).send({ message: 'success', data: floor_instance })
}
async function isReservable(desk_id, startDate, endDate) {
    let currentDate = moment(date).format('YYYY-MM-DD')
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
        console.log("285")
        return res.status(500).send({ "message": error })
    }
}


