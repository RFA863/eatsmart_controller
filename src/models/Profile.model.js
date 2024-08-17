import types from "mime/types/standard.js";
import { DataTypes } from "sequelize";

class ProfileModel {
    constructor(Server) {
        const table = Server.model.db.define(

            "profile",
            {
                id: {
                    type: DataTypes.INTEGER,
                    allowNull: false,
                    primaryKey: true,
                    autoIncrement: true,
                },

                user_id: {
                    type: DataTypes.INTEGER,
                    allowNull: false,
                },

                tanggal_lahir: {
                    type: DataTypes.DATE,
                    allowNull: false
                },

                usia: {
                    type: DataTypes.INTEGER(3),
                    allowNull: false,
                },

                tinggi: {
                    type: DataTypes.INTEGER(3),
                    allowNull: false,
                },

                berat: {
                    type: DataTypes.INTEGER(3),
                    allowNull: false,
                },

                jeniskelamin: {
                    type: DataTypes.BOOLEAN,
                    allowNull: false,
                },

                ibm: {
                    type: DataTypes.STRING,
                    allowNull: false,
                },

                bmr: {
                    type: DataTypes.INTEGER,
                    allowNull: false,
                },

                total_kalori: {
                    type: DataTypes.INTEGER,
                    allowNull: false,
                },

                aktivitas_id: {
                    type: DataTypes.INTEGER,
                    allowNull: false
                },

                tujuan_diet_id: {
                    type: DataTypes.INTEGER,
                    allowNull: false
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
                tableName: "profile",
                timestamps: false,
            }

        );

        this.table = table;

    }
}

export default ProfileModel;