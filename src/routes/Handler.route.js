import AuthRoute from "./Auth.route.js";
import MenuRoute from "./Menu.route.js";
import ChatAiRoute from "./ChatAi.route.js";
import ProfileRoute from "./Profile.route.js";

class HandlerRoute {
    constructor(Server) {
        new AuthRoute(Server);
        new MenuRoute(Server);
        new ChatAiRoute(Server);
        new ProfileRoute(Server);
    }
}

export default HandlerRoute;