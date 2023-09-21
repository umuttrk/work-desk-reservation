require('dotenv').config();

const { Sequelize } = require('sequelize');

const pass = process.env.PASS || "root";
const user = process.env.USER || "root";

const sequelize = new Sequelize('reserve_app', user, pass, {
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