'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Room extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      //Room.belongsTo(models.Tenant, {
        //foreignKey: 'tenantId',
        //as: 'tenant'
      //});

      Room.belongsTo(models.RoomType, {
        foreignKey: 'roomTypeId',
        as: 'roomType'
      });

      Room.hasMany(models.Booking, {
        foreignKey: 'roomId',
        as: 'bookings'
      });

      Room.hasMany(models.Device, {
        foreignKey: 'roomId',
        as: 'devices'
      });

      Room.hasMany(models.Card, {
        foreignKey: 'roomId',
        as: 'cards'
      });
    }
  }
  Room.init({
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
    roomNumber: {
      type: DataTypes.STRING(20),
      allowNull: false,
    },
    floor: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        isInt: true,
        min: 0
      }
    },
    status: {
      type: DataTypes.ENUM('available', 'occupied', 'maintenance', 'reserved'),
      allowNull: false,
      defaultValue: 'available',
      validate: {
        isIn: [['available', 'occupied', 'maintenance', 'reserved']]
      }
    },
    deletedAt: {
      type: DataTypes.DATE,
      allowNull: true,
    },
  }, {
    sequelize,
    modelName: 'Room',
    timestamps: true,
    paranoid: true,
  });
  return Room;
};