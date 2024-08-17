import MenuController from "../controllers/Menu.controller.js";
import AuthorizationMiddleware from "../middlewares/Authorization.middleware.js";

class MenuRoute {
    constructor(Server) {
        this.Server = Server;
        this.API = this.Server.API;
        this.routePrefix = "/menu";
        this.MenuController = new MenuController(this.Server);
        this.AuthorizationMiddleware = new AuthorizationMiddleware(this.Server);

        this.route();
    }

    route() {
        this.API.get(this.routePrefix + "/get", this.AuthorizationMiddleware.check(),
            (req, res) => this.MenuController.getData(req, res));

        this.API.get(this.routePrefix + "/public/img/:gambar", (req, res) => this.MenuController.getGambar(req, res));
    }

}

export default MenuRoute;