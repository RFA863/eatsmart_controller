import { DataTypes } from "sequelize";

class ProfileDetailModel {
    constructor(Server) {
        const table = Server.model.db.define(

            "profile_detail",
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

                tujuan_diet_id: {
                    type: DataTypes.INTEGER,
                    allowNull: true,
                },

                level_memasak_id: {
                    type: DataTypes.INTEGER,
                    allowNull: true,
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
                tableName: "profile_detail",
                timestamps: false,
            }

        );

        this.table = table;

    }
}

export default ProfileDetailModel;