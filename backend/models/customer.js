'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Customer extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here

      Customer.hasMany(models.Booking, {
        foreignKey: 'customerId',
        as: 'bookings'
      });
      Customer.hasMany(models.Reservation, {
        foreignKey: 'customerId',
        as: 'reservations'
      });
      //Customer.belongsTo(models.Tenant, {
        //foreignKey: 'tenantId',
        //as: 'tenant'
      //});
     
    }
  }
  Customer.init({
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
    firstName: {
      type: DataTypes.STRING(100),
      allowNull: false,
    },
    lastName: {
      type: DataTypes.STRING(100),
      allowNull: false,
    },
    email: {
      type: DataTypes.STRING(100),
      allowNull: false,
      unique: true,
      validate: {
        isEmail: true,
        len: [5, 100]
      }
    },
    phoneNumber: {
      type: DataTypes.STRING(20),
      allowNull: true,
      validate: {
        len: [0, 20]
      }
    },
    address: {
      type: DataTypes.STRING(255),
      allowNull: true,
      validate: {
        len: [0, 255]
      }
    },
    dateOfBirth: {
      type: DataTypes.DATE,
      allowNull: true
    },
    gender: {
      type: DataTypes.ENUM('male', 'female', 'other'),
      allowNull: true,
    },
    status: {
      type: DataTypes.ENUM('active', 'inactive', 'banned', 'blacklisted'),
      allowNull: false,
      defaultValue: 'active',
      validate: {
        isIn: [['active', 'inactive', 'banned', 'blacklisted']]
      }
    },
    deletedAt: {
      type: DataTypes.DATE,
      allowNull: true
    },
  }, {
    sequelize,
    modelName: 'Customer',
    timestamps: true,
    paranoid: true,
  });
  return Customer;
};