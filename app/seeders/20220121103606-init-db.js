'use strict';
const db = require("../models/index.mjs")

const Role = db.Role 

const up = async (queryInterface, Sequelize) => {
    
  await  queryInterface.bulkInsert(
    'Roles', 
    Role.Roles.forEach((element,index,array) => {
      array[index] = { name: element }
    })
    // [{ name: 'name' }],
  );

  await  queryInterface.bulkInsert(
    'Users', 
    [
      {
        firstName: 'John',
        lastName: 'Doe',
        email: 'admin@example.com'
      }
    ]
  );
}

const down = async (queryInterface, Sequelize) => {
  /**
   * Add commands to revert seed here.
   *
   * Example:
   * await queryInterface.bulkDelete('People', null, {});
   */
  await queryInterface.bulkDelete('Roles', null, {});
  await queryInterface.bulkDelete('Users', null, {});
}

module.exports = { up, down };
