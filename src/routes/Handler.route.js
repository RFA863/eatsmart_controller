import AuthRoute from "./Auth.route.js";
import ProfileRoute from "./Profile.route.js";

class HandlerRoute {
    constructor(Server) {
        new AuthRoute(Server);
        new ProfileRoute(Server);
    }
}

export default HandlerRoute;