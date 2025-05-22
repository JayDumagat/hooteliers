'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Customers', {
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
      firstName: {
        type: Sequelize.STRING(100),
        allowNull: false,
        validate: {
          len: [1, 100]
        }
      },
      lastName: {
        type: Sequelize.STRING(100),
        allowNull: false,
        validate: {
          len: [1, 100]
        }
      },
      email: {
        type: Sequelize.STRING(100),
        allowNull: false,
        unique: true,
        validate: {
          isEmail: true,
          len: [5, 100]
        }
      },
      phoneNumber: {
        type: Sequelize.STRING(20),
        allowNull: true,
        validate: {
          len: [0, 20]
        }
      },
      address: {
        type: Sequelize.STRING(255),
        allowNull: true,
        validate: {
          len: [0, 255]
        }
      },
      dateOfBirth: {
        type: Sequelize.DATE,
        allowNull: true
      },
      gender: {
        type: Sequelize.ENUM('male', 'female', 'other'),
        allowNull: true
      },
      status: {
        type: Sequelize.ENUM('active', 'inactive', 'banned', 'blacklisted'),
        allowNull: false,
        defaultValue: 'active'
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
    await queryInterface.dropTable('Customers');
  }
};