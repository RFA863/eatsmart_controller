import { DataTypes } from "sequelize";

class RekomendasiModel {
    constructor(Server) {
        const table = Server.model.db.define(

            "rekomendasi",
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

                menu_id: {
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
                tableName: "rekomendasi",
                timestamps: false,
            }

        );

        this.table = table;

    }
}

export default RekomendasiModel;