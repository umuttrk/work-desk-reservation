const express = require('express');
const router = express.Router();
const userController = require('../controller/userController')
const tokenOperations = require('../utils/tokens');
const verify = tokenOperations.verify;

router.post('/refreshtoken',userController.refreshToken)

router.post('/login',userController.postLogin)

router.post('/logout',userController.postLogout)

router.post('/register',userController.postRegister)

router.get('/credentials/:mail',verify,userController.getUserCredentials )

module.exports = router;
