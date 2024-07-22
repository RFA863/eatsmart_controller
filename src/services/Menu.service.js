import MenuModel from "../models/Menu.model.js";

class MenuService {
    constructor(Server) {
        this.Server = Server;
        this.API = this.Server.API;
        this.MenuModel = new MenuModel(this.Server).table;
    }

    async getData() {
        const getMenu = await this.MenuModel.findAll();

        for (let i in getMenu) {

            getMenu[i].dataValues.gambar_path = this.Server.env.HOSTNAME + "/menu/public/img/" + getMenu[i].dataValues.gambar;
        }

        return getMenu;
    }
}

export default MenuService;