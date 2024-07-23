import { DataTypes } from "sequelize";

class PreferensiDietDetailModel {
    constructor(Server) {
        const table = Server.model.db.define(

            "preferensi_diet_detail",
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

                preferensi_diet_id: {
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
                tableName: "preferensi_diet_detail",
                timestamps: false,
            }

        );

        this.table = table;

    }
}

export default PreferensiDietDetailModel;