import { DataTypes } from "sequelize";

class UserModel {
    constructor(Server) {
        const table = Server.model.db.define(

            "user",
            {
                id: {
                    type: DataTypes.INTEGER,
                    allowNull: false,
                    primaryKey: true,
                    autoIncrement: true,
                },

                username: {
                    type: DataTypes.STRING(100),
                    allowNull: false,
                },

                email: {
                    type: DataTypes.STRING(100),
                    allowNull: false,
                },

                password: {
                    type: DataTypes.STRING(100),
                    allowNull: false,
                },

                created_at: {
                    type: DataTypes.DATE,
                    allowNull: false,
                },

                updated_at: {
                    type: DataTypes.DATE,
                    allowNull: false,
                },


            },

            {
                tableName: "user",
                timestamps: false,
            }

        );

        this.table = table;

    }
}

export default UserModel;