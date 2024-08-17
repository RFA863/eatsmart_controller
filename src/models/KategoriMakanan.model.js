import { DataTypes } from "sequelize";

class KategoriMakananModel {
    constructor(Server) {
        const table = Server.model.db.define(

            "kategori_makanan",
            {
                id: {
                    type: DataTypes.INTEGER,
                    allowNull: false,
                    primaryKey: true,
                    autoIncrement: true,
                },

                kategori: {
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
                tableName: "kategori_makanan",
                timestamps: false,
            }

        );

        this.table = table;

    }
}

export default KategoriMakananModel;