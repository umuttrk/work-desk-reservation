const User = require('../models/associations').User;
const jwt = require('jsonwebtoken')
const dotenv = require('dotenv');
dotenv.config({ path: './config.env' });
const bcrypt = require('bcryptjs');
const JWT_SECRET = process.env.JWT_SECRET || "*/*s2039lsss/;1919"
const tokenOperations = require('../utils/tokens');
const { where } = require('sequelize');
const validateEmail = require('../utils/validateMail');


exports.refreshToken = async (req, res) => {
    //take the refresh token from the user
    const {refreshToken} = req.body;
    //send error if there is no token or it's invalid

    if (!refreshToken) return res.status(401).json("You are not authenticated!");

    try {
        const user = await User.findAll({
            where: {
                refreshToken: refreshToken
            }
        })
        console.log(user)
        if (!user) {
            return res.status(403).json("Refresh token is not valid!");
        }

        jwt.verify(refreshToken, JWT_SECRET, async (err, user) => {
            console.log('controller>refreshToken-api')
            console.log(JWT_SECRET)
            console.log(user)
            err ? console.log(err) : '';
            const newAccessToken = tokenOperations.generateAccessToken( user.mail);
            const newRefreshToken = tokenOperations.generateRefreshToken( user.mail);

            User.update(
                { refreshToken: newRefreshToken },
                { where: { refreshToken: refreshToken } }
            )
                .then(result => {
                    console.log("loo")
                    return res.status(200).json({
                        accessToken: newAccessToken,
                        refreshToken: newRefreshToken,
                    });
                }
                )
                .catch(err => {return res.status(403).json(err);}
                )
          
        });
        //if everything is ok, create new access token, refresh token and send to user
    } catch (error) {
        return res.status(500).send({ message: "Server error" })
    }



}
exports.postLogout = async (req, res) => {
    const { refreshToken } = req.body;
    try {
        await User.update({ refreshToken: '' }, {
            where: {
                refreshToken
            }
        })
    } catch (error) {
        res.json({ status: 'fail', message: 'an error occured while exitting.' })
    }

    res.status(200).json({ status: 'success', msg: 'user logged out' })
}


exports.postLogin = async (req, res) => {
    let { mail, password } = req.body;
    let user;
    if (
        mail != "admin" && //admin kontrolü silinecek
        !validateEmail.validateEmail(mail)) {
        return res.status(400).json({ status: 'fail', message: 'Please enter a valid mail' })
    }
    try {

        mail = mail.trim();
        password = password.trim();
        user = await User.findOne({
            where: {
                mail: mail
            }
        });
    } catch (error) {
        return res.status(403).json({ status: 'fail', message: error.message });
    }

    if (!user) {
        return res.status(403).json({ status: 'fail', message: 'Wrong username or password' })
    }
    if (await bcrypt.compare(password, user.password)) {

        const accessToken = tokenOperations.generateAccessToken(user.mail);
        const refreshToken = tokenOperations.generateRefreshToken(user.mail);

        await User.update({ refreshToken: refreshToken }, { where: { mail } }).then(() => {
            return res.status(200).json({ status: 'success', mail, accessToken, refreshToken });

        })

    } else {
        return res.status(403).json({ status: 'fail', message: 'Wrong username or password' });
    }

}
exports.getUserCredentials = async (req, res) => {
    let { mail } = req.params;
    let user;
    try {
        user =await User.findOne({ attributes: ['name','mail', 'isAdmin'], where: { mail:mail } })
    } catch (error) {
        return res.status(500).send({ "error_message": error })

    }
    res.status(200).send({ message: 'success', data: user })

}
exports.postRegister = async (req, res) => {
    let { name, mail, password } = req.body;
    if (!name || typeof name !== 'string') {
        return res.status(400).json({ status: 'fail', message: 'Invalid name' })
    }
    if (!password || typeof password !== 'string') {
        return res.status(400).json({ status: 'fail', message: 'Invalid password' })
    } if (password.length < 3) {
        return res.status(400).json({ status: 'fail', message: 'Too small password.Should be greater than 6 character' })
    }
    if (!validateEmail.validateEmail(mail)) {
        return res.status(400).json({ status: 'fail', message: 'Please enter a valid mail' })
    }
    try {
        name = name.trim();
        mail = mail.trim();
        password = password.trim();
        const hashedPassword = await bcrypt.hash(password, 10);
        const refreshToken = tokenOperations.generateRefreshToken(mail);
        const accessToken = tokenOperations.generateAccessToken(mail);
        User.create({
            name,
            mail,
            password: hashedPassword,
            refreshToken
        }).then(async (user) => {
            console.log(user.username);
            console.log("User has been registered succesfully");
            return res.status(200).json({ status: 'success', accessToken, refreshToken, mail })
        }).catch((err) => {
            if (err.name === 'SequelizeUniqueConstraintError') {
                return res.status(403).json({ status: 'fail', message: "Mail already signed up" })
            }
            return res.status(403).json({ status: 'fail', message: err })
        })
    } catch (error) {
        console.log(error.code)
        return res.status(403).json({ status: 'fail', message: error.message })
    }
}