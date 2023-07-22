const { DataTypes } = require('sequelize');

const sequelize = require('../utils/dbConnection').sequelize

const DeskGroup = sequelize.define("Desk_group", {
    desk_group_id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false
    },
    floor_id: {
        type: DataTypes.INTEGER,
        allowNull: false,

    },
    position_x: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    desk_size: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },

    position_y: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    rotation: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    owner: {
        type: DataTypes.STRING,
        allowNull: false
    },
    createdAt: {
        type: DataTypes.DATE,
        defaultValue: sequelize.literal('NOW()')
    },
    updatedAt: {
        type: DataTypes.DATE,
        defaultValue: sequelize.literal('NOW()')
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
        type: DataTypes.DATEONLY,
        allowNull: false,
    },
    end_date: {
        type: DataTypes.DATEONLY,
        allowNull: false,
    },
    reserved_by: {
        type: DataTypes.STRING,
        allowNull: false
    }, createdAt: {
        type: DataTypes.DATE,
        defaultValue: sequelize.literal('NOW()')
    },
    updatedAt: {
        type: DataTypes.DATE,
        defaultValue: sequelize.literal('NOW()')
    }
});

const Desk = sequelize.define("Desk", {
    desk_id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false
    },
    order_in_desk_group: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    desk_group_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    createdAt: {
        type: DataTypes.DATE,
        defaultValue: sequelize.literal('NOW()')
    },
    updatedAt: {
        type: DataTypes.DATE,
        defaultValue: sequelize.literal('NOW()')
    }

})
const Floor = sequelize.define("Floor", {

    floor_id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false
    },
    floor_number: {
        type: DataTypes.INTEGER,
        allowNull: false,
        unique: true//buraya bak

    }, createdAt: {
        type: DataTypes.DATE,
        defaultValue: sequelize.literal('NOW()')
    },
    updatedAt: {
        type: DataTypes.DATE,
        defaultValue: sequelize.literal('NOW()')
    }


})

Floor.hasMany(DeskGroup, { foreignKey: 'floor_id' })
DeskGroup.belongsTo(Floor, { foreignKey: 'floor_id' });


DeskGroup.hasMany(Desk, { foreignKey: 'desk_group_id', onDelete: 'CASCADE' })
Desk.belongsTo(DeskGroup, { foreignKey: 'desk_group_id' })


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
    DeskGroup,
    Reservation,
    Floor,
    Desk
};