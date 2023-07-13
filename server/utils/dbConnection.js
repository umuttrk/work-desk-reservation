require('dotenv').config();

const { Sequelize } = require('sequelize');


const pass = process.env.PASS;
const user = process.env.USER;

const sequelize = new Sequelize('myDb', user, pass, {
    host: 'localhost',
    dialect: 'mysql',
});



const onConnect = async () => {
    try {
        await sequelize.authenticate()
        console.log("connected to db")
    } catch (error) {
        console.log(error)
    }
}
module.exports = {
    onConnect,
    sequelize
}