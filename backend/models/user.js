'use strict';
const {
  Model
} = require('sequelize');
const bcrypt = require('bcryptjs');
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      //User.belongsTo(models.Tenant, {
        //foreignKey: 'tenantId',
        //as: 'tenant'
      //});
      User.belongsTo(models.Role, {
        foreignKey: 'roleId',
        as: 'role'
      });

    }
  }
  User.init({
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
    email: {
      type: DataTypes.STRING(100),
      allowNull: false,
      unique: true,
      validate: {
        isEmail: true,
        len: [5, 100]
      }
    },
    username: {
      type: DataTypes.STRING(100),
      allowNull: false,
      unique: true,
      validate: {
        len: [5, 100]
      }
    },
    password: {
      type: DataTypes.STRING(255),
      allowNull: false,
      validate: {
        len: [8, 255]
      }
    },
    firstName: {
      type: DataTypes.STRING(100),
      allowNull: true,
      validate: {
        len: [1, 100]
      }
    },
    lastName: {
      type: DataTypes.STRING(100),
      allowNull: true,
      validate: {
        len: [1, 100]
      }
    },
    roleId: {
      type: DataTypes.UUID,
      allowNull: true,
      references: {
        model: 'Roles',
        key: 'id'
      },
      onUpdate: 'CASCADE',
      onDelete: 'SET NULL'
    },
    status: {
      type: DataTypes.ENUM('active', 'inactive', 'suspended', 'pending', 'deleted'),
      allowNull: false,
      defaultValue: 'active',
      validate: {
        isIn: [['active', 'inactive', 'suspended', 'pending', 'deleted']]
      }
    },
    last_login: {
      type: DataTypes.DATE,
      allowNull: true
    },
    deletedAt: {
      type: DataTypes.DATE,
      allowNull: true
    },
  }, {
    sequelize,
    modelName: 'User',
    timestamps: true,
    paranoid: true,
    hooks: {
      beforeCreate: async (user) => {
        if (user.changed('password')) {
          const salt = await bcrypt.genSalt(10);
          user.password = await bcrypt.hash(user.password, salt);
        }
      },
      beforeUpdate: async (user) => {
        if (user.changed('password')) {
          const salt = await bcrypt.genSalt(10);
          user.password = await bcrypt.hash(user.password, salt);
        }
      }
    }
  },
  {
    defaultScope: {
      attributes: { exclude: ['password', 'deletedAt'] }
    },
    scopes: {
      withPassword: {
        attributes: { include: ['password'] }
      },
      withDeleted: {
        paranoid: false
      }
    }
  });
  User.prototype.validPassword = async function (password) {
    return await bcrypt.compare(password, this.password);
  };
  
  return User;
};