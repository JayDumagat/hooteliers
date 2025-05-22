'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Device extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here

      Device.belongsTo(models.Room, {
        foreignKey: 'roomId',
        as: 'room'
      });
    }
  }
  Device.init({
     id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
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
    nickname: {
      type: DataTypes.STRING(100),
      allowNull: false,
    },
    deviceSerial: {
      type: DataTypes.STRING(100),
      allowNull: false,
    },
    status: {
      type: DataTypes.ENUM('active', 'inactive'),
      allowNull: false,
      defaultValue: 'active',
    },
    deletedAt: {
      type: DataTypes.DATE,
      allowNull: true,
    },


  }, {
    sequelize,
    modelName: 'Device',
    paranoid: true,
    timestamps: true,
  });
  return Device;
};