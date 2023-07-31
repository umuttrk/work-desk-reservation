const express = require('express');
const router = express.Router();
const reservationController = require('../controller/reservationController')






//GET ALL FLOORS ✓
//GET ALL DESKS ✓
//get busy dates of any desk that passed param ✓ 
//reserve the desk that passed for desk_id and reserved_by and dates ✓
//GET MY PAST reservations and FUTURE reservations ✓
//cancel(delete) any reservation ✓

router.get('/all-floors', reservationController.getAllFloors)
router.get('/all-desks/:floor', reservationController.getAllDesks)
router.get('/busy-dates/:deskId', reservationController.getBusyDates)
router.post('/reserve-desk', reservationController.reserveDesk)
router.get('/my-reservations/:myMail', reservationController.getMyReservations)
router.delete('/delete-my-reservation/:reservation_id', reservationController.deleteMyReservation)
router.post('/create-desk', reservationController.createDesk)
router.put('/update-desk', reservationController.updateDeskGroup)
router.delete('/delete-desk/:desk_group_id', reservationController.deleteDeskGroup)
router.post('/create-floor', reservationController.createFloor)
router.get('/filter-desks/:floor/', reservationController.filterDesks)
router.delete('/floor/:floor',reservationController.deleteFloor)


// TODO
// Login register
// Admin sayfasi oluştur


//FOR ADMIN


//add new floor
//add new desk
//delete desk
//delete a floor





module.exports = router;
