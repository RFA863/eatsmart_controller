import { DataTypes } from "sequelize";

class LevelMemasakModel {
    constructor(Server) {
        const table = Server.model.db.define(

            "level_memasak",
            {
                id: {
                    type: DataTypes.INTEGER,
                    allowNull: false,
                    primaryKey: true,
                    autoIncrement: true,
                },

                level: {
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
                tableName: "level_memasak",
                timestamps: false,
            }

        );

        this.table = table;

    }
}

export default LevelMemasakModel;