const {Customer, sequelize} = require('../models');

const insertCustomer = async (
  firstName, lastName, email, phoneNumber, address, dateOfBirth, gender, status
) => {
  const transaction = await sequelize.transaction();
  try {
    //check if it exists
    const existingCustomer = await Customer.findOne({
      where: { email },
      transaction,
    });

    if (existingCustomer) {
      console.log("Customer already exists:", existingCustomer);
      return existingCustomer;
    }

    const customer = await Customer.create({
      firstName,
      lastName,
      email,
      phoneNumber,
      address,
      dateOfBirth,
      gender,
      status
    }, { transaction });



    await transaction.commit();
    return customer;
  } catch (error) {
    console.error("insertCustomer error:", error);
    await transaction.rollback();
    throw error;
  }
}

const findAllCustomers = async () => {
  try {
    const customers = await Customer.findAll({
      attributes: ["id", "firstName", "lastName", "email", "phoneNumber", "address", "dateOfBirth", "gender", "status"],
    });
    return customers;
  } catch (error) {
    console.error("findAllCustomers error:", error);
    throw error;
  }
}

const findCustomerById = async (id) => {
  try {
    const customer = await Customer.findByPk(id, {
      attributes: ["id", "firstName", "lastName", "email", "phoneNumber", "address", "dateOfBirth", "gender", "status"],
    });
    return customer;
  } catch (error) {
    console.error("findCustomerById error:", error);
    throw error;
  }
}

const findCustomerByName = async (firstName, lastName) => {
  try {
    const customer = await Customer.findOne({
      where: { firstName, lastName },
      attributes: ["id", "firstName", "lastName", "email", "phoneNumber", "address", "dateOfBirth", "gender", "status"],
    });
    return customer;
  } catch (error) {
    console.error("findCustomerByName error:", error);
    throw error;
  }
}

const updateCustomer = async (id, firstName, lastName, email, phoneNumber, address, dateOfBirth, gender, status) => {
  const transaction = await sequelize.transaction();
  try {
    const customer = await Customer.findByPk(id, { transaction });
    if (!customer) {
      throw new Error("Customer not found");
    }

    customer.firstName = firstName;
    customer.lastName = lastName; 
    customer.email = email;
    customer.phoneNumber = phoneNumber;
    customer.address = address;
    customer.dateOfBirth = dateOfBirth;
    customer.gender = gender;
    customer.status = status;
    await customer.save({ transaction });
    await transaction.commit();
    return customer;
  } catch (error) {
    console.error("updateCustomer error:", error);
    await transaction.rollback();
    throw error;
  }
}

module.exports = {
    insertCustomer,
    findAllCustomers,
    findCustomerById,
    findCustomerByName,
    updateCustomer
}