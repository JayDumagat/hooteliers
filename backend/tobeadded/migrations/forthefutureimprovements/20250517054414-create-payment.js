'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Payments', {
      id: {
        allowNull: false,
        primaryKey: true,
        type: Sequelize.UUID,
        defaultValue: Sequelize.UUIDV4
      },
      tenantId: {
        type: Sequelize.UUID,
        allowNull: false,
        references: {
          model: 'Tenants',
          key: 'id'
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE'
      },
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
      targetType: {
        type: Sequelize.ENUM('reservation', 'booking', 'other'),
        allowNull: false,
        defaultValue: 'other'
      },
      targetId: {
        type: Sequelize.UUID,
        allowNull: false,
      },
      invoiceId: {
        type: Sequelize.UUID,
        allowNull: true,
        references: {
          model: 'Invoices',
          key: 'id'
        },
        onUpdate: 'CASCADE',
        onDelete: 'SET NULL'
      },
      amount: {
        type: Sequelize.DECIMAL(10, 2),
        allowNull: false,
        validate: {
          isDecimal: true,
          min: 0
        }
      },
      paymentMethod: {
        type: Sequelize.ENUM('cash', 'credit_card', 'debit_card', 'bank_transfer', 'e-wallet', 'other'),
        allowNull: false,
        defaultValue: 'cash'
      },
      status: {
        type: Sequelize.ENUM('success', 'failed', 'refunded', 'pending'),
        allowNull: false,
        defaultValue: 'pending'
      },
      referenceNumber: {
        type: Sequelize.STRING(255),
        allowNull: true,
        validate: {
          len: [1, 255]
        }
      },
      paidAt: {
        type: Sequelize.DATE,
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
    await queryInterface.dropTable('Payments');
  }
};