import Sequelize, { Model } from "sequelize";
import bcrypt from "bcrypt";

class User extends Model {
    static init(sequelize) {
        super.init(
            {
                name: Sequelize.STRING,
                email: Sequelize.STRING,
                password: Sequelize.VIRTUAL,
                password_hash: Sequelize.STRING,
                admin: Sequelize.BOOLEAN,
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
                tableName: 'Users', // Define o nome da tabela com letras maiúsculas
                freezeTableName: true, // Garante que o nome da tabela não seja pluralizado
            },
        );

        this.addHook("beforeSave", async (user) => {
            if (user.password) {
                user.password_hash = await bcrypt.hash(user.password, 10);
            }
        });

        return this;
    }

    async checkPassword(password) {
        return bcrypt.compare(password, this.password_hash);
    }
}

export default User;
