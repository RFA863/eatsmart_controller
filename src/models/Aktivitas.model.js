import { DataTypes } from "sequelize";

class AktivitasModel {
    constructor(Server) {
        const table = Server.model.db.define(

            "aktivitas",
            {
                id: {
                    type: DataTypes.INTEGER,
                    allowNull: false,
                    primaryKey: true,
                    autoIncrement: true,
                },

                aktivitas: {
                    type: DataTypes.STRING,
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
                tableName: "aktivitas",
                timestamps: false,
            }

        );

        this.table = table;

    }
}

export default AktivitasModel;