const express = require('express');
const router = express.Router();
const reservationController = require('../controller/reservationController')






//GET ALL FLOORS ✓
//GET ALL DESKS ✓
//get busy dates of any desk that passed param ✓ 
//reserve the desk that passed for desk_id and reserved_by and dates ✓
//GET MY PAST reservations and FUTURE reservations ✓
//cancel(delete) any reservation ✓

router.post('/get-all-floors', reservationController.getAllFloors)
router.post('/get-all-desks', reservationController.getAllDesks)
router.post('/get-busy-dates', reservationController.getBusyDates)
router.post('/reserve-desk', reservationController.reserveDesk)
router.post('/get-my-reservations', reservationController.getMyReservations)
router.post('/delete-my-reservation', reservationController.deleteMyReservation)
router.post('/create-desk', reservationController.createDesk)
router.put('/update-desk', reservationController.updateDeskGroup)
router.delete('/delete-desk', reservationController.deleteDeskGroup)
router.post('/create-floor', reservationController.createFloor)



// TODO
// Login register
// Admin sayfasi oluştur


//FOR ADMIN


//add new floor
//add new desk
//delete desk
//delete a floor





module.exports = router;
