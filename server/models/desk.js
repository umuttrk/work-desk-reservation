const {  DataTypes } = require('sequelize');
//const Reservation=require('./reservation')

const sequelize = require('../utils/dbConnection').sequelize

const Desk = sequelize.define("Desk", {
    desk_id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false
    },
    floor_number: {
        type: DataTypes.INTEGER,
        allowNull: false,

    },
    x_line_order: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    y_line_order: {
        type: DataTypes.INTEGER,
        allowNull: false,
    }
});


const Reservation = sequelize.define("Reservation", {
    reservation_id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false
    },
    desk_id: {
        type: DataTypes.INTEGER,
        allowNull: false,

    },
    start_date: {
        type: DataTypes.DATE,
        allowNull: false,
    },
    end_date: {
        type: DataTypes.DATE,
        allowNull: false,
    },
    reserved_by:{
        type: DataTypes.STRING,
        allowNull: false
    }
});



Desk.hasMany(Reservation, { foreignKey: 'desk_id' });
Reservation.belongsTo(Desk, { foreignKey: 'desk_id' });


sequelize.sync()
    .then(() => {
        console.log('Veritabanı senkronizasyonu tamamlandı.');
    })
    .catch((error) => {
        console.error('Veritabanı senkronizasyonu sırasında hata oluştu:', error);
    });

module.exports = {
   Desk,
   Reservation
};