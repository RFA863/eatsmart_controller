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