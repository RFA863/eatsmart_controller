import MenuService from "../services/Menu.service.js";
import ResponsePreset from "../helpers/ResponsePreset.helper.js";

class MenuController {
    constructor(Server) {
        this.Server = Server;
        this.API = this.Server.API;
        this.ResponsePreset = new ResponsePreset();
        this.MenuService = new MenuService(this.Server);
    }

    async getData(req, res) {

        const getDataSrv = await this.MenuService.getData();

        res.status(200).json(this.ResponsePreset.resOK("Ok", getDataSrv));
    }
}

export default MenuController;