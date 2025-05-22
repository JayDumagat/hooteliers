'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('RoomTypes', {
      id: {
        allowNull: false,
        primaryKey: true,
        type: Sequelize.UUID,
        defaultValue: Sequelize.UUIDV4
      },
      //tenantId: {
        //type: Sequelize.UUID,
        //allowNull: false,
        //references: {
          //model: 'Tenants',
          //key: 'id'
        //},
        //onUpdate: 'CASCADE',
        //onDelete: 'CASCADE'
      //},
      name: {
        type: Sequelize.STRING(100),
        allowNull: false,
        unique: true,
        validate: {
          len: [3, 100]
        }
      },
      description: {
        type: Sequelize.STRING(255),
        allowNull: true,
        validate: {
          len: [0, 255]
        }
      },
      maxOccupancy: {
        type: Sequelize.INTEGER,
        allowNull: false,
        validate: {
          isInt: true,
          min: 1
        }
      },
      basePrice: {
        type: Sequelize.DECIMAL(10, 2),
        allowNull: false,
        validate: {
          isDecimal: true,
          min: 0
        }
      },
      amenities: {
        type: Sequelize.JSON,
        allowNull: true
      },
      deletedAt: {
        type: Sequelize.DATE,
        allowNull: true
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('RoomTypes');
  }
};