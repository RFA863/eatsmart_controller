import ProfileController from "../controllers/Profile.controller.js";
import AuthorizationMiddleware from "../middlewares/Authorization.middleware.js";

class ProfileRoute {
    constructor(Server) {
        this.Server = Server;
        this.API = this.Server.API;
        this.routePrefix = "/profile";
        this.ProfileController = new ProfileController(this.Server);
        this.AuthorizationMiddleware = new AuthorizationMiddleware(this.Server);

        this.route();
    }

    route() {
        this.API.post(this.routePrefix + "/input", this.AuthorizationMiddleware.check(),
            (req, res) => this.ProfileController.input(req, res)
        );

        this.API.get(this.routePrefix + "/get", this.AuthorizationMiddleware.check(),
            (req, res) => this.ProfileController.get(req, res)
        );

        this.API.put(this.routePrefix + "/update", this.AuthorizationMiddleware.check(),
            (req, res) => this.ProfileController.update(req, res)
        );
    }
}

export default ProfileRoute;