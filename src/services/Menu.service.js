import mime from 'mime';
import path from 'path';
import { Sequelize, Op } from "sequelize";

import MenuModel from "../models/Menu.model.js";
import ProfileModel from "../models/Profile.model.js";
import RekomendasiModel from '../models/Rekomendasi.model.js';
import BahanMakananModel from '../models/BahanMakanan.model.js';
import BahanMakananDetailModel from '../models/BahanMakananDetail.model.js';

class MenuService {
    constructor(Server) {
        this.Server = Server;
        this.API = this.Server.API;
        this.MenuModel = new MenuModel(this.Server).table;
        this.ProfileModel = new ProfileModel(this.Server).table;
        this.RekomendasiModel = new RekomendasiModel(this.Server).table;
        this.BahanMakananModel = new BahanMakananModel(this.Server).table;
        this.BahanMakananDetailModel = new BahanMakananDetailModel(this.Server).table;
    }

    async getData(userId) {

        const getProfileModel = await this.ProfileModel.findOne({
            where: {
                user_id: userId
            }
        });

        if (getProfileModel === null) return -1;

        this.MenuModel.hasMany(this.RekomendasiModel, {
            foreignKey: "menu_id"
        });


        this.RekomendasiModel.belongsTo(this.MenuModel, {
            foreignKey: "menu_id"
        });


        const getRekomendasiModel = await this.RekomendasiModel.findAll({
            where: {
                profile_id: getProfileModel.dataValues.id
            },
            include: [
                {
                    model: this.MenuModel,
                    attributes: {
                        include: [
                            [Sequelize.fn('CONCAT', this.Server.env.HOSTNAME, '/menu/public/img/', Sequelize.col('gambar')), 'gambar_path']
                        ]
                    }

                }
            ]
        });

        if (getRekomendasiModel.length !== 0) return getRekomendasiModel;

        const getImb = getProfileModel.dataValues.ibm;
        const getProfileBahanMakanan = await this.BahanMakananDetailModel.findAll({
            where: {
                profile_id: getProfileModel.dataValues.id
            }
        });

        const profileBahanMakananId = getProfileBahanMakanan.map((item) => (item.dataValues.bahan_makanan_id));

        let getMenu = null;

        switch (getImb) {
            case "Kurus":
                getMenu = await this.MenuModel.findAll({
                    where: {
                        [Op.and]: [
                            { kalori: { [Op.gte]: 600 } },
                            { bahan_makanan_id: { [Op.in]: profileBahanMakananId } }
                        ]
                    }
                });
                break;

            case "Normal":
                getMenu = await this.MenuModel.findAll({
                    where: {
                        [Op.and]: [
                            { kalori: { [Op.between]: [400, 600] } },
                            { bahan_makanan_id: { [Op.in]: profileBahanMakananId } }
                        ]
                    }
                });
                break;

            case "Gemuk":
            case "Obesitas":
                getMenu = await this.MenuModel.findAll({
                    where: {
                        [Op.and]: [
                            { kalori: { [Op.lte]: 400 } },
                            { bahan_makanan_id: { [Op.in]: profileBahanMakananId } }
                        ]
                    }
                });
                break;
        }

        const menus = getMenu.map((item) => (item.dataValues.id))

        for (const menu of menus) {
            await this.RekomendasiModel.create({
                profile_id: getProfileModel.dataValues.id,
                menu_id: menu,
                created_at: new Date(),
                updated_at: new Date()
            });
        };

        const getRekomendasi = await this.RekomendasiModel.findAll({
            where: {
                profile_id: getProfileModel.dataValues.id
            },
            include: [
                {
                    model: this.MenuModel,
                    attributes: {
                        include: [
                            [Sequelize.fn('CONCAT', this.Server.env.HOSTNAME, '/menu/public/img/', Sequelize.col('gambar')), 'gambar_path']
                        ]
                    }

                }
            ]
        });

        return getRekomendasi;

        // const getMenu = await this.MenuModel.findAll();

        // for (let i in getMenu) {

        //     getMenu[i].dataValues.gambar_path = this.Server.env.HOSTNAME + "/menu/public/img/" + getMenu[i].dataValues.gambar;
        // }

        // return getMenu;
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