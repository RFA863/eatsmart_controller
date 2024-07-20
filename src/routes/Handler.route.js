import AuthRoute from "./Auth.route.js";

class HandlerRoute {
    constructor(Server) {
        new AuthRoute(Server);
    }
}

export default HandlerRoute;