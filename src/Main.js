//Library
import 'dotenv/config';
import fs from "fs-extra";
import Express from "express";

//Function
import SendLogs from "./helpers/Logger.helper.js";
import HandlerModel from "./models/Handler.model.js";
import HandlerRoute from './routes/Handler.route.js';
import HandlerMiddleware from "./middlewares/Handler.middleware.js";


class Server {
    constructor() {
        this.FS = fs;
        this.env = process.env;
        this.SendLogs = SendLogs;

        this.init();
    }

    async init() {

        const serverDataPath = "/server_data";
        const resourceFolder = "/src/resources";

        if (!this.FS.existsSync(process.cwd() + serverDataPath)) {
            this.SendLogs("Initiate Server Data...");
            this.FS.mkdirSync(process.cwd() + serverDataPath);
            this.FS.copySync(
                process.cwd() + resourceFolder,
                process.cwd() + serverDataPath
            );
        }

        this.model = new HandlerModel(this);
        const isModelConnected = await this.model.connect();
        if (isModelConnected === -1) return;

        this.run();
    }

    async run() {
        this.API = Express();
        new HandlerMiddleware(this);
        new HandlerRoute(this);

        this.API.listen(this.env.PORT, this.env.HOST, () =>
            this.SendLogs("Server listening on Port : " + this.env.PORT))

        this.API.get("/", (req, res) => res.status(200).send("Server listening on Port : " + this.env.PORT));

    }
}

new Server();