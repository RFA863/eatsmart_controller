import { DataTypes } from "sequelize";

class BahanMakananModel {
    constructor(Server) {
        const table = Server.model.db.define(

            "bahan_makanan",
            {
                id: {
                    type: DataTypes.INTEGER,
                    allowNull: false,
                    primaryKey: true,
                    autoIncrement: true,
                },

                bahan: {
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
                tableName: "bahan_makanan",
                timestamps: false,
            }

        );

        this.table = table;

    }
}

export default BahanMakananModel;