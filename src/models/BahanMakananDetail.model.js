import { DataTypes } from "sequelize";

class BahanMakananDetailModel {
    constructor(Server) {
        const table = Server.model.db.define(

            "bahan_makanan_detail",
            {
                id: {
                    type: DataTypes.INTEGER,
                    allowNull: false,
                    primaryKey: true,
                    autoIncrement: true,
                },

                profile_id: {
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
                tableName: "bahan_makanan_detail",
                timestamps: false,
            }

        );

        this.table = table;

    }
}

export default BahanMakananDetailModel;