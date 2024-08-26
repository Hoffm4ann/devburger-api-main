import Sequelize, { Model } from "sequelize";

class Category extends Model {
    static init(sequelize) {
        super.init(
            {
                name: Sequelize.STRING,
                path: Sequelize.STRING,
                url: {
                    type: Sequelize.VIRTUAL,
                    get() {
                        return `http://localhost:3001/category-file/${this.path}`;
                    },
                },
                createdAt: {
                    type: Sequelize.DATE,
                    field: 'createdAt', // Mapeia para a coluna 'createdAt'
                },
                updatedAt: {
                    type: Sequelize.DATE,
                    field: 'updatedAt', // Mapeia para a coluna 'updatedAt'
                },
            },
            {
                sequelize,
                tableName: 'Category', // Define o nome da tabela com letras maiúsculas
                freezeTableName: true, // Garante que o nome da tabela não seja pluralizado
            },
        );
        return this;
    }
}

export default Category;
