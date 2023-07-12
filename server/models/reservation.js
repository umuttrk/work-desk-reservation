// const {  DataTypes } = require('sequelize');


// const sequelize = require('../utils/dbConnection').sequelize


// const Reservation = sequelize.define("Reservation", {
//     reservation_id: {
//         type: DataTypes.INTEGER,
//         primaryKey: true,
//         autoIncrement: true,
//         allowNull: false
//     },
//     desk_id: {
//         type: DataTypes.INTEGER,
//         allowNull: false,

//     },
//     start_date: {
//         type: DataTypes.DATE,
//         allowNull: false,
//     },
//     end_date: {
//         type: DataTypes.DATE,
//         allowNull: false,
//     },
//     reserved_by:{
//         type: DataTypes.STRING,
//         allowNull: false
//     }
// });


// sequelize.sync()
//     .then(() => {
//         console.log('Veritabanı senkronizasyonu tamamlandı.');
//     })
//     .catch((error) => {
//         console.error('Veritabanı senkronizasyonu sırasında hata oluştu:', error);
//     });

// module.exports = {
//     Reservation
// };
