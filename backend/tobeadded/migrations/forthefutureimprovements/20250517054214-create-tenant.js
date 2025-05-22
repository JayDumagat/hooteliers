'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Tenants', {
      id: {
        allowNull: false,
        primaryKey: true,
        type: Sequelize.UUID,
        defaultValue: Sequelize.UUIDV4
      },
      name: {
        type: Sequelize.STRING(100),
        allowNull: false,
        unique: true
      },
      representative: {
        type: Sequelize.STRING(100),
        allowNull: false,
        unique: true
      },
      contactEmail: {
        type: Sequelize.STRING(100),
        allowNull: false,
        unique: true,
        validate: {
          isEmail: true,
          len: [5, 100]
        }
      },
      contactPhone: {
        type: Sequelize.STRING(15),
        allowNull: false,
        unique: true,
        validate: {
          isNumeric: true,
          len: [10, 15]
        }
      },
      businessAddress: {
        type: Sequelize.STRING(255),
        allowNull: false,
        validate: {
          len: [10, 255]
        }
      },
      status: {
        type: Sequelize.ENUM('active', 'inactive', 'suspended', 'pending', 'deleted'), 
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
    await queryInterface.dropTable('Tenants');
  }
};