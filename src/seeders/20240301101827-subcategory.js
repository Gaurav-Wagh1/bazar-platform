"use strict";
const {Op} = require('sequelize');

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert(
      "Subcategories",
      [
        {
          name: "Laptop",
          description:"All laptops with various varieties",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          name: "Computer",
          description:"All computers and related equipments",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          name: "Mobiles",
          description:"All mobiles like android, apple, etc with varieties",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ],
      {}
    );
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete("Subcategories", {
      [Op.or]: [{ name: "Laptop" }, { name: "Computer" },{ name: "Mobiles" }],
    });
  },
};
