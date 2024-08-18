import ChatAiController from "../controllers/ChatAi.controller.js";
import AuthorizationMiddleware from "../middlewares/Authorization.middleware.js";

class ChatAiRoute {
    constructor(Server) {
        this.Server = Server;
        this.API = this.Server.API;
        this.routePrefix = "/chat";
        this.ChatAiController = new ChatAiController(this.Server);
        this.AuthorizationMiddleware = new AuthorizationMiddleware(this.Server);
        this.route();
    }

    route() {
        this.API.post(this.routePrefix + "/input", this.AuthorizationMiddleware.check(),
            (req, res) => this.ChatAiController.inputMessage(req, res));
    }
}

export default ChatAiRoute;