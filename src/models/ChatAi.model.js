import { DataTypes } from "sequelize";

class ChatAiModel {
    constructor(Server) {
        const table = Server.model.db.define(

            "chat_ai",
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


                user_message: {
                    type: DataTypes.TEXT,
                    allowNull: false,
                },

                bot_response: {
                    type: DataTypes.TEXT,
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
                tableName: "chat_ai",
                timestamps: false,
            }

        );

        this.table = table;

    }
}

export default ChatAiModel;