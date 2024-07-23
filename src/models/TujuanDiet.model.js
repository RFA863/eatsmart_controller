import { DataTypes } from "sequelize";

class TujuanDietModel {
    constructor(Server) {
        const table = Server.model.db.define(

            "tujuan_diet",
            {
                id: {
                    type: DataTypes.INTEGER,
                    allowNull: false,
                    primaryKey: true,
                    autoIncrement: true,
                },

                tujuan: {
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
                tableName: "tujuan_diet",
                timestamps: false,
            }

        );

        this.table = table;

    }
}

export default TujuanDietModel;