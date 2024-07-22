import mime from 'mime';
import path from 'path';

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

    async getGambar(gambarName) {

        const getGambarMenu = await this.MenuModel.findOne({
            where: {
                gambar: gambarName
            }
        });

        if (getGambarMenu === null) return -1;

        const imgPath = path.join(process.cwd(), "server_data", "img", "menu", getGambarMenu.dataValues.gambar);

        if (!this.Server.FS.existsSync(imgPath)) {
            return -1;
        }

        const mimeType = mime.getType(imgPath);  // Mendapatkan MIME type dari file gambar
        return { imgPath, mimeType };
    }
}

export default MenuService;