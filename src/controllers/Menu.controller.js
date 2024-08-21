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

        const { userId } = req.middlewares.authorization;

        const getDataSrv = await this.MenuService.getData(userId);

        if (getDataSrv === -1)
            return res.status(404).json(this.ResponsePreset.resErr(
                404, "User Not Found", "Service", { code: -1 }
            ));

        res.status(200).json(this.ResponsePreset.resOK("Ok", getDataSrv));
    }

    async getGambar(req, res) {
        const gambarName = req.params.gambar;

        const getGambarSrv = await this.MenuService.getGambar(gambarName);
        if (getGambarSrv === -1) {
            return res.status(404).send("Gambar tidak ditemukan");
        }

        const { imgPath, mimeType } = getGambarSrv;
        res.setHeader('Content-Type', mimeType);
        res.status(200).sendFile(imgPath);

    }

    async getMenuId(req, res) {
        const menuId = req.params.id;

        const getMenuIdSrv = await this.MenuService.getMenuId(menuId);

        if (getMenuIdSrv === -1)
            return res.status(404).json(this.ResponsePreset.resErr(
                404, "Menu Not Found", "Service", { code: -1 }
            ));

        res.status(200).json(this.ResponsePreset.resOK("Ok", getMenuIdSrv));
    }
}

export default MenuController;