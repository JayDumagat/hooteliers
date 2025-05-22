'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Reservations', {
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
      customerId: {
        type: Sequelize.UUID,
        allowNull: false,
        references: {
          model: 'Customers',
          key: 'id'
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE'
      },
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
      checkInDate: {
        type: Sequelize.DATE,
        allowNull: false
      },
      checkOutDate: {
        type: Sequelize.DATE,
        allowNull: false
      },
      status: {
        type: Sequelize.ENUM('pending', 'confirmed', 'canceled', 'expired', 'completed'),
        allowNull: false,
        defaultValue: 'pending'
      },
      totalPrice: {
        type: Sequelize.DECIMAL(10, 2),
        allowNull: false,
        validate: {
          isDecimal: true,
          min: 0
        }
      },
      //depositAmount: {
        //type: Sequelize.DECIMAL(10, 2),
        //allowNull: true,
        //validate: {
          //isDecimal: true,
         // min: 0
        //}
      //},
      //depositPaid: {
        //type: Sequelize.BOOLEAN,
        //allowNull: false,
        //defaultValue: false
      //},
      //paymentId: {
        //type: Sequelize.UUID,
        //allowNull: true,
        //references: {
          //model: 'Payments',
          //key: 'id'
        //},
        //onUpdate: 'CASCADE',
        //onDelete: 'SET NULL'
      //},
      notes: {
        type: Sequelize.TEXT,
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
    await queryInterface.dropTable('Reservations');
  }
};