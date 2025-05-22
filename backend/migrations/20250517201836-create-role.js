  'use strict';
  /** @type {import('sequelize-cli').Migration} */
  module.exports = {
    async up(queryInterface, Sequelize) {
      await queryInterface.createTable('Roles', {
        id: {
          allowNull: false,
          primaryKey: true,
          type: Sequelize.UUID,
          defaultValue: Sequelize.UUIDV4
        },
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
      await queryInterface.dropTable('Roles');
    }
  };