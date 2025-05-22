'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Bookings', {
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
      reservationId: {
        type: Sequelize.UUID,
        allowNull: true,
        references: {
          model: 'Reservations',
          key: 'id'
        },
        onUpdate: 'CASCADE',
        onDelete: 'SET NULL'
      },
      roomId: {
        type: Sequelize.UUID,
        allowNull: false,
        references: {
          model: 'Rooms',
          key: 'id'
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE'
      },
      checkInDate: {
        type: Sequelize.DATE,
        allowNull: true
      },
      checkOutDate: {
        type: Sequelize.DATE,
        allowNull: true
      },
      price: {
        type: Sequelize.DECIMAL(10, 2),
        allowNull: false,
        validate: {
          isDecimal: true,
          min: 0
        }
      },
      //paymentStatus: {
        //type: Sequelize.ENUM('pending', 'paid', 'failed', 'refunded', 'partial'),
        //allowNull: false,
        //defaultValue: 'pending'
      //},
      status: {
  type: Sequelize.ENUM('confirmed','checked_in', 'checked_out', 'canceled'),
  allowNull: false,
  defaultValue: 'confirmed'
},
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
    await queryInterface.dropTable('Bookings');
  }
};