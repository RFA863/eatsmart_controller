import { DataTypes } from "sequelize";

class WaktuMemasakDetailModel {
    constructor(Server) {
        const table = Server.model.db.define(

            "waktu_memasak_detail",
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

                waktu_memasak_id: {
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
                tableName: "Waktu_memasak_detail",
                timestamps: false,
            }

        );

        this.table = table;

    }
}

export default WaktuMemasakDetailModel;