const {User, sequelize} = require('../models');

const insertUser = async (email, username, password, roleId, status) => {
  const transaction = await sequelize.transaction();

    try {
        const user = await User.create(
        { email, username, password, roleId, status },
        { transaction }
        );
    
        await transaction.commit();
        return user;
    } catch (error) {
        await transaction.rollback();
        throw error;
    }
};

const findAllUsers = async () => {
    const transaction = await sequelize.transaction();
    
    try {
        const users = await User.findAll({
        where: { status: 'active' },
        transaction,
        });
    
        await transaction.commit();
        return users;
    } catch (error) {
        await transaction.rollback();
        throw error;
    }
    }


const findUserById = async (id) => {
    const transaction = await sequelize.transaction();
    
    try {
        const user = await User.findOne({
        where: { id, status: 'active' },
        transaction,
        });
    
        await transaction.commit();
        return user;
    } catch (error) {
        await transaction.rollback();
        throw error;
    }
}

const findUserByUsername = async (username) => {
    const transaction = await sequelize.transaction();
    
    try {
        const user = await User.findOne({
        where: { username, status: 'active' },
        transaction,
        });
    
        await transaction.commit();
        return user;
    } catch (error) {
        await transaction.rollback();
        throw error;
    }
}

const updateUser = async (id, email, username, password, roleId, status) => {
    const transaction = await sequelize.transaction();
    
    try {
        const user = await User.update(
        { email, username, password, roleId, status },
        { where: { id }, transaction }
        );
    
        await transaction.commit();
        return user;
    } catch (error) {
        await transaction.rollback();
        throw error;
    }
}

const deleteUser = async (id) => {
    const transaction = await sequelize.transaction();
    
    try {
        const user = await User.destroy({
        where: { id },
        transaction,
        });
    
        await transaction.commit();
        return user;
    } catch (error) {
        await transaction.rollback();
        throw error;
    }
}

const findUserByEmail = async (email) => {
    const transaction = await sequelize.transaction();
    
    try {
        const user = await User.findOne({
        where: { email, status: 'active' },
        transaction,
        });
    
        await transaction.commit();
        return user;
    } catch (error) {
        await transaction.rollback();
        throw error;
    }
}

module.exports = {
  insertUser,
  findAllUsers,
  findUserById,
  updateUser,
  deleteUser,
  findUserByEmail,
    findUserByUsername,
};
