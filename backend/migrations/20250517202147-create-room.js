'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Rooms', {
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
      roomTypeId: {
        type: Sequelize.UUID,
        allowNull: false,
        references: {
          model: 'RoomTypes',
          key: 'id'
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE'
      },
     roomNumber: {
      type: Sequelize.STRING(20),
      allowNull: false,
     },
     floor: {
      type: Sequelize.INTEGER,
      allowNull: false,
      validate: {
        isInt: true,
        min: 0
      }
     },
     status: {
      type: Sequelize.ENUM('available', 'occupied', 'maintenance', 'reserved'),
      allowNull: false,
      defaultValue: 'available'
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
    await queryInterface.dropTable('Rooms');
  }
};