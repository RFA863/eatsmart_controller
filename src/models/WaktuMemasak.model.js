import { DataTypes } from "sequelize";

class WaktuMemasakModel {
    constructor(Server) {
        const table = Server.model.db.define(

            "waktu_memasak",
            {
                id: {
                    type: DataTypes.INTEGER,
                    allowNull: false,
                    primaryKey: true,
                    autoIncrement: true,
                },

                waktu: {
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
                tableName: "waktu_memasak",
                timestamps: false,
            }

        );

        this.table = table;

    }
}

export default WaktuMemasakModel;