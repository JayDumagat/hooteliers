'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Reservation extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here

      Reservation.belongsTo(models.Customer, {
        foreignKey: 'customerId',
        as: 'customer'
      });

      Reservation.belongsTo(models.RoomType, {
        foreignKey: 'roomTypeId',
        as: 'roomType'
      });

      Reservation.hasMany(models.Booking, {
        foreignKey: 'reservationId',
        as: 'bookings'
      });
    }
  }
  Reservation.init({
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },
    //tenantId: {
      //type: DataTypes.UUID,
      //allowNull: false,
      //references: {
        //model: 'Tenants',
        //key: 'id'
      //},
      //onUpdate: 'CASCADE',
      //onDelete: 'CASCADE'
    //},
    customerId: {
      type: DataTypes.UUID,
      allowNull: false,
      references: {
        model: 'Customers',
        key: 'id'
      },
      onUpdate: 'CASCADE',
      onDelete: 'CASCADE'
    },
    roomTypeId: {
      type: DataTypes.UUID,
      allowNull: false,
      references: {
        model: 'RoomTypes',
        key: 'id'
      },
      onUpdate: 'CASCADE',
      onDelete: 'CASCADE'
    },
    checkInDate: {
      type: DataTypes.DATE,
      allowNull: false
    },
    checkOutDate: {
      type: DataTypes.DATE,
      allowNull: false
    },
    status: {
      type: DataTypes.ENUM('pending', 'confirmed', 'canceled', 'expired', 'completed'),
      allowNull: false,
      defaultValue: 'pending',
      validate: {
        isIn: [['pending', 'confirmed', 'canceled', 'expired', 'completed']]
      }
    },
    totalPrice: {
      type: DataTypes.DECIMAL(10, 2),
      allowNull: false,
      validate: {
        isDecimal: true,
        min: 0
      }
    },
    //depositAmount: {
      //type: DataTypes.DECIMAL(10, 2),
      //allowNull: true,
      //validate: {
        //isDecimal: true,
        //min: 0
      //}
    //},
    //depositPaid: {
      //type: DataTypes.BOOLEAN,
      //allowNull: false,
      //defaultValue: false
    //}
    //paymentId: {
      //type: DataTypes.UUID,
      //allowNull: true,
      //references: {
        //model: 'Payments',
        //key: 'id'
      //},
      //onUpdate: 'CASCADE',
      //onDelete: 'SET NULL'
    //},
    notes: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    deletedAt: {
      type: DataTypes.DATE,
      allowNull: true
    },
  }, {
    sequelize,
    modelName: 'Reservation',
    timestamps: true,
    paranoid: true,
  });
  return Reservation;
};