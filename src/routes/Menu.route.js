import MenuController from "../controllers/Menu.controller.js";

class MenuRoute {
    constructor(Server) {
        this.Server = Server;
        this.API = this.Server.API;
        this.routePrefix = "/menu";
        this.MenuController = new MenuController(this.Server);

        this.route();
    }

    route() {
        this.API.get(this.routePrefix + "/get", (req, res) => this.MenuController.getData(req, res));
    }

}

export default MenuRoute;