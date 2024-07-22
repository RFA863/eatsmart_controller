//Library
import 'dotenv/config';
import path from "path";
import Express from "express";

//Function
import SendLogs from "./helpers/Logger.helper.js";
import HandlerModel from "./models/Handler.model.js";
import HandlerRoute from './routes/Handler.route.js';
import HandlerMiddleware from "./middlewares/Handler.middleware.js";


class Server {
    constructor() {
        this.Path = path;
        this.env = process.env;
        this.SendLogs = SendLogs;

        this.init();
    }

    async init() {
        this.model = new HandlerModel(this);
        const isModelConnected = await this.model.connect();
        if (isModelConnected === -1) return;

        this.API = Express();
        new HandlerMiddleware(this);
        new HandlerRoute(this);

        this.API.listen(this.env.PORT, this.env.HOST, () =>
            this.SendLogs("Server listening on Port : " + this.env.PORT))



    }
}

new Server();