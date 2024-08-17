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

                protein: {
                    type: DataTypes.INTEGER(5),
                    allowNull: false,
                },

                lemak: {
                    type: DataTypes.INTEGER(5),
                    allowNull: false,
                },

                karbohidrat: {
                    type: DataTypes.INTEGER(5),
                    allowNull: false,
                },

                deskripsi: {
                    type: DataTypes.TEXT,
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

                kategori_makanan_id: {
                    type: DataTypes.INTEGER,
                    allowNull: false,
                },

                bahan_makanan_id: {
                    type: DataTypes.INTEGER,
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