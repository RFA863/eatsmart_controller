import { Sequelize } from "sequelize";

class Handler {
    constructor(Server) {
        this.Server = Server;
    }

    async connect() {
        this.Server.SendLogs("Connecting to database...");
        try {
            this.db = new Sequelize({
                host: this.Server.env.DB_HOST,
                port: this.Server.env.DB_PORT,
                username: this.Server.env.DB_USERNAME,
                password: this.Server.env.DB_PASSWORD,
                database: this.Server.env.DB_DATABASE,
                dialect: this.Server.env.DB_DIALECT,
                logging: this.Server.env.DB_LOGGING === "false" ? false : true,
            });
            await this.db.authenticate();
        } catch (err) {
            this.Server.SendLogs(err);
            return -1;
        }

        this.Server.SendLogs("Database Connected");

        return this.db;
    }
}

export default Handler;


