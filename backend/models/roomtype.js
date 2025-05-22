'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class RoomType extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here

      RoomType.hasMany(models.Room, {
        foreignKey: 'roomTypeId',
        as: 'rooms'
      });
    }
  }
  RoomType.init({
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
    name: {
      type: DataTypes.STRING(100),
      allowNull: false,
      unique: true,
      validate: {
        len: [3, 100]
      }
    },
    description: {
      type: DataTypes.STRING(255),
      allowNull: true,
      validate: {
        len: [0, 255]
      }
    },
    maxOccupancy: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        isInt: true,
        min: 1
      }
    },
    basePrice: {
      type: DataTypes.DECIMAL(10, 2),
      allowNull: false,
      validate: {
        isDecimal: true,
        min: 0
      }
    },
    amenities: {
      type: DataTypes.JSON,
      allowNull: true
    },
    deletedAt: {
      type: DataTypes.DATE,
      allowNull: true,
    },
  }, {
    sequelize,
    modelName: 'RoomType',
    timestamps: true,
    paranoid: true,
  });
  return RoomType;
};