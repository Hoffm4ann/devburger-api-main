/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.addColumn("Category", "path", {
      type: Sequelize.STRING,
    });
  },

  async down(queryInterface) {
    await queryInterface.dropTable("Category", "path");
  },
};
