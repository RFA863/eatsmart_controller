import { DataTypes } from "sequelize";

class PreferensiDietModel {
    constructor(Server) {
        const table = Server.model.db.define(

            "preferensi_diet",
            {
                id: {
                    type: DataTypes.INTEGER,
                    allowNull: false,
                    primaryKey: true,
                    autoIncrement: true,
                },

                preferensi: {
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
                tableName: "preferensi_diet",
                timestamps: false,
            }

        );

        this.table = table;

    }
}

export default PreferensiDietModel;