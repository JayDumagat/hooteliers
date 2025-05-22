'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Users', {
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
      email: {
        type: Sequelize.STRING(100),
        allowNull: false,
        unique: true,
        validate: {
          isEmail: true,
          len: [5, 100]
        }
      },
      username : {
        type: Sequelize.STRING(100),
        allowNull: false,
        unique: true,
        validate: {
          len: [3, 100]
        }
      },
      password: {
        type: Sequelize.STRING(255),
        allowNull: false,
        validate: {
          len: [8, 255]
        }
      },
      firstName: {
        type: Sequelize.STRING(100),
        allowNull: true,
        validate: {
          len: [1, 100]
        }
      },
      lastName: {
        type: Sequelize.STRING(100),
        allowNull: true,
        validate: {
          len: [1, 100]
        }
      },
      roleId: {
        type: Sequelize.UUID,
        allowNull: true,
        references: {
          model: 'Roles',
          key: 'id'
        },
        onUpdate: 'CASCADE',
        onDelete: 'SET NULL'
      },
      status: {
        type: Sequelize.ENUM('active', 'inactive', 'suspended', 'pending', 'deleted'), 
        allowNull: false,
        defaultValue: 'active'
      },
      last_login: {
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
    await queryInterface.dropTable('Users');
  }
};