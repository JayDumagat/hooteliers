'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Booking extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here

      Booking.belongsTo(models.Customer, {
        foreignKey: 'customerId',
        as: 'customer'
      });
      Booking.belongsTo(models.Room, {
        foreignKey: 'roomId',
        as: 'room'
      });
      Booking.belongsTo(models.Reservation, {
        foreignKey: 'reservationId',
        as: 'reservation'
      });
      //Booking.belongsTo(models.Tenant, {
        //foreignKey: 'tenantId',
        //as: 'tenant'
      //});

      
    }
  }
  Booking.init({
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
    reservationId: {
      type: DataTypes.UUID,
      allowNull: true,
      references: {
        model: 'Reservations',
        key: 'id'
      },
      onUpdate: 'CASCADE',
      onDelete: 'SET NULL'
    },
    roomId: {
      type: DataTypes.UUID,
      allowNull: false,
      references: {
        model: 'Rooms',
        key: 'id'
      },
      onUpdate: 'CASCADE',
      onDelete: 'CASCADE'
    },
    checkInDate: {
      type: DataTypes.DATE,
      allowNull: true
    },
    checkOutDate: {
      type: DataTypes.DATE,
      allowNull: true
    },
    price: {
      type: DataTypes.DECIMAL(10, 2),
      allowNull: false,
      validate: {
        isDecimal: true,
        min: 0
      }
    },
    //paymentStatus: {
      //type: DataTypes.ENUM('pending', 'paid', 'failed', 'refunded'),
      //allowNull: false,
      //defaultValue: 'pending'
    //},
    status: {
      type: DataTypes.ENUM('confirmed', 'checked_in', 'checked_out', 'cancelled'),
      allowNull: false,
      defaultValue: 'confirmed',
      validate: {
        isIn: [['confirmed', 'checked_in', 'checked_out', 'cancelled']]
      }
    },
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
    modelName: 'Booking',
    timestamps: true,
    paranoid: true,
  });
  return Booking;
};