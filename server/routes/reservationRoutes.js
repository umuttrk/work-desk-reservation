const express = require('express');
const router = express.Router();
const reservationController = require('../controller/reservationController')
const tokenOperations = require('../utils/tokens');
const verify = tokenOperations.verify;








router.get('/all-floors', verify, reservationController.getAllFloors)
router.get('/all-desks/:floor', verify, reservationController.getAllDesks)
router.get('/busy-dates/:deskId', verify, reservationController.getBusyDates)
router.post('/reserve-desk', verify, reservationController.reserveDesk)
router.get('/my-reservations/:myMail', verify, reservationController.getMyReservations)
router.delete('/delete-my-reservation/:reservation_id', verify, reservationController.deleteMyReservation)
router.post('/create-desk', verify, reservationController.createDesk)
router.put('/update-desk', verify, reservationController.updateDeskGroup)
router.delete('/delete-desk/:desk_group_id', verify, reservationController.deleteDeskGroup)
router.post('/create-floor', verify, reservationController.createFloor)
router.get('/filter-desks/:floor/', verify, reservationController.filterDesks)
router.delete('/floor/:floor', verify, reservationController.deleteFloor)







module.exports = router;
