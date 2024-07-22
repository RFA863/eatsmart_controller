import { DataTypes } from "sequelize";

class MenuModel {
    constructor(Server) {
        const table = Server.model.db.define(

            "menu",
            {
                id: {
                    type: DataTypes.INTEGER,
                    allowNull: false,
                    primaryKey: true,
                    autoIncrement: true,
                },

                nama: {
                    type: DataTypes.STRING(100),
                    allowNull: false,
                },

                kalori: {
                    type: DataTypes.INTEGER(5),
                    allowNull: false,
                },

                detail: {
                    type: DataTypes.TEXT,
                    allowNull: false,
                },

                gambar: {
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
                tableName: "menu",
                timestamps: false,
            }

        );

        this.table = table;

    }
}

export default MenuModel;