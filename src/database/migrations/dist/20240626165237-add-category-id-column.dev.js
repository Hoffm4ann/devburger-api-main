"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  up: function up(queryInterface, Sequelize) {
    return regeneratorRuntime.async(function up$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            _context.next = 2;
            return regeneratorRuntime.awrap(queryInterface.addColumn("products", "category_id", {
              type: Sequelize.INTEGER,
              references: {
                model: "categories",
                key: "id"
              },
              onUpdate: "CASCADE",
              onDelete: "SET NULL",
              allowNull: true
            }));

          case 2:
          case "end":
            return _context.stop();
        }
      }
    });
  },
  down: function down(queryInterface) {
    return regeneratorRuntime.async(function down$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            _context2.next = 2;
            return regeneratorRuntime.awrap(queryInterface.removeColumn("products", "category_id"));

          case 2:
          case "end":
            return _context2.stop();
        }
      }
    });
  }
};