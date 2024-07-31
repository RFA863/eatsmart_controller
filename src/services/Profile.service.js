import moment from 'moment';

import UserModel from "../models/User.model.js";
import ProfileModel from "../models/Profile.model.js";
import AktifitasModel from "../models/Aktivitas.model.js";
import TujuanDietModel from '../models/TujuanDiet.model.js';
import BahanMakananModel from '../models/BahanMakanan.model.js';
import LevelMemasakModel from '../models/LevelMemasak.model.js';
import WaktuMemasakModel from "../models/WaktuMemasak.model.js";
import PreferensiDietModel from '../models/PreferensiDiet.model.js';
import BahanMakananDetailModel from '../models/BahanMakananDetail.model.js';
import PreferensiDietDetailModel from "../models/PreferensiDietDetail.model.js";

class ProfileService {
    constructor(Server) {
        this.Server = Server;
        this.API = this.Server.API;
        this.UserModel = new UserModel(this.Server).table;
        this.ProfileModel = new ProfileModel(this.Server).table;
        this.AktifitasModel = new AktifitasModel(this.Server).table;
        this.TujuanDietModel = new TujuanDietModel(this.Server).table;
        this.BahanMakananModel = new BahanMakananModel(this.Server).table;
        this.LevelMemasakModel = new LevelMemasakModel(this.Server).table;
        this.WaktuMemasakModel = new WaktuMemasakModel(this.Server).table;
        this.PreferensiDietModel = new PreferensiDietModel(this.Server).table;
        this.BahanMakananDetailModel = new BahanMakananDetailModel(this.Server).table;
        this.PreferensiDietDetailModel = new PreferensiDietDetailModel(this.Server).table;
    }

    calculateAge(birthDate) {
        return moment().diff(moment(birthDate, 'YYYY-MM-DD'), 'years');
    }

    async getAktifitas() {
        const getAktifitasModel = await this.AktifitasModel.findAll();

        return getAktifitasModel;
    }

    async inputData(data, userId) {

        const getProfile = await this.ProfileModel.findOne({
            where: {
                user_id: userId,
            }
        })

        if (getProfile !== null) return -1;

        const umur = this.calculateAge(data.tanggal_lahir);

        let ibmKategori = "";

        const countIbm = data.berat / ((data.tinggi / 100) * (data.tinggi / 100));

        if (countIbm < 18.5) {
            ibmKategori = "Kurus"
        } else if (countIbm >= 18.5 && countIbm < 25) {
            ibmKategori = "Normal"
        } else if (countIbm >= 25 && countIbm < 30) {
            ibmKategori = "Gemuk"
        } else {
            ibmKategori = "Obesitas"
        }

        const inputProfile = await this.ProfileModel.create({
            user_id: userId,
            tanggal_lahir: data.tanggal_lahir,
            usia: umur,
            tinggi: data.tinggi,
            berat: data.berat,
            jeniskelamin: data.jeniskelamin,
            ibm: ibmKategori,
            aktivitas_id: data.aktivitas_id,
            created_at: new Date(),
            updated_at: new Date(),
        });

        return inputProfile;
    }

    async getDataById(userId) {

        this.UserModel.hasOne(this.ProfileModel, {
            foreignKey: "user_id"
        });
        this.ProfileModel.belongsTo(this.UserModel, {
            foreignKey: "user_id"
        });

        this.AktifitasModel.hasMany(this.ProfileModel, {
            foreignKey: "aktivitas_id"
        });
        this.ProfileModel.belongsTo(this.AktifitasModel, {
            foreignKey: "aktivitas_id"
        });

        const getProfile = await this.ProfileModel.findOne({
            where: {
                user_id: userId,
            },
            include: [
                {
                    model: this.UserModel,

                },
                {
                    model: this.AktifitasModel,

                }
            ]
        });

        if (getProfile === null) return -1;

        return getProfile;
    }

    async updateData(data, userId) {

        const getProfile = await this.ProfileModel.findOne({
            where: {
                user_id: userId,
            }
        });

        if (getProfile === null) return -1;

        const umur = this.calculateAge(data.tanggal_lahir);

        let ibmKategori = "";

        const countIbm = data.berat / ((data.tinggi / 100) * (data.tinggi / 100));

        if (countIbm < 18.5) {
            ibmKategori = "Kurus"
        } else if (countIbm >= 18.5 && countIbm < 25) {
            ibmKategori = "Normal"
        } else if (countIbm >= 25 && countIbm < 30) {
            ibmKategori = "Gemuk"
        } else {
            ibmKategori = "Obesitas"
        }

        const updateProfile = await this.ProfileModel.update({
            tanggal_lahir: data.tanggal_lahir,
            usia: umur,
            tinggi: data.tinggi,
            berat: data.berat,
            jeniskelamin: data.jeniskelamin,
            ibm: ibmKategori,
            aktivitas_id: data.aktivitas_id,
            updated_at: new Date(),
        }, {
            where: {
                user_id: userId
            }
        });



        return updateProfile;

    }

    async getTujuanDiet() {
        const getTujuanDietModel = await this.TujuanDietModel.findAll();

        return getTujuanDietModel;
    }

    async getPreferensiDiet() {
        const getPreferensiDietModel = await this.PreferensiDietModel.findAll();

        return getPreferensiDietModel;
    }

    async inputPreferensiDietDetail(data, userId) {

        const getProfile = await this.ProfileModel.findOne({
            where: {
                user_id: userId,
            }
        });

        const preferenses = data.preferensi_diet_id;

        for (const preferense of preferenses) {
            await this.PreferensiDietDetailModel.create({
                profile_id: getProfile.dataValues.id,
                preferensi_diet_id: preferense,
                created_at: new Date(),
                updated_at: new Date(),
            });
        };

        return;
    }

    async getPreferensiDietDetail(userId) {

        this.ProfileModel.hasMany(this.PreferensiDietDetailModel, {
            foreignKey: "profile_id",
        });
        this.PreferensiDietDetailModel.belongsTo(this.ProfileModel, {
            foreignKey: "profile_id",
        });

        this.PreferensiDietModel.hasMany(this.PreferensiDietDetailModel, {
            foreignKey: "preferensi_diet_id",
        });
        this.PreferensiDietDetailModel.belongsTo(this.PreferensiDietModel, {
            foreignKey: 'preferensi_diet_id',
        });

        const getProfileModel = await this.ProfileModel.findOne({
            where: {
                user_id: userId,
            }
        });

        if (getProfileModel === null) return -1;

        const getPreferensiDietDetailModel = await this.PreferensiDietDetailModel.findAll({
            where: {
                profile_id: getProfileModel.dataValues.id
            }, include: [
                {
                    model: this.ProfileModel,

                },
                {
                    model: this.PreferensiDietModel,

                }
            ]
        });

        return getPreferensiDietDetailModel;
    }

    async updatePreferensiDietDetail(data, userId) {
        const getProfileModel = await this.ProfileModel.findOne({
            where: {
                user_id: userId,
            }
        });

        if (getProfileModel === null) return -1;


        const profileId = getProfileModel.dataValues.id;
        const preferenses = data.preferensi_diet_id;

        await this.PreferensiDietDetailModel.destroy({
            where: {
                profile_id: profileId,
            }
        });

        for (const preferense of preferenses) {

            await this.PreferensiDietDetailModel.create({
                profile_id: profileId,
                preferensi_diet_id: preferense,
                created_at: new Date(),
                updated_at: new Date(),
            });
        }

        return;

    }

    async getBahanMakanan() {
        const getBahanMakananModel = await this.BahanMakananModel.findAll();

        if (getBahanMakananModel.length === 0) return -1;

        return getBahanMakananModel;
    }

    async inputBahanMakananDetail(data, userId) {
        const getProfileModel = await this.ProfileModel.findOne({
            where: {
                user_id: userId,
            }
        });

        if (getProfileModel === null) return -1;

        const materials = data.bahan_makanan_id;

        for (const material of materials) {
            await this.BahanMakananDetailModel.create({
                profile_id: getProfileModel.dataValues.id,
                bahan_makanan_id: material,
                created_at: new Date(),
                updated_at: new Date(),
            });
        };

        return;
    }

    async getBahanMakanDetail(userId) {

        this.ProfileModel.hasMany(this.BahanMakananDetailModel, {
            foreignKey: "profile_id"
        });
        this.BahanMakananDetailModel.belongsTo(this.ProfileModel, {
            foreignKey: "profile_id"
        });

        this.BahanMakananModel.hasMany(this.BahanMakananDetailModel, {
            foreignKey: "bahan_makanan_id"
        });
        this.BahanMakananDetailModel.belongsTo(this.BahanMakananModel, {
            foreignKey: "bahan_makanan_id"
        })

        const getProfileModel = await this.ProfileModel.findOne({
            where: {
                user_id: userId
            }
        });

        if (getProfileModel === null) return -1;

        const getBahanMakananDetailModel = await this.BahanMakananDetailModel.findAll({
            where: {
                profile_id: getProfileModel.dataValues.id
            }, include: [
                { model: this.ProfileModel },
                { model: this.BahanMakananModel }
            ]
        });

        return getBahanMakananDetailModel;
    }

    async updateBahanMakananDetail(data, userId) {

        const getProfileModel = await this.ProfileModel.findOne({
            where: {
                user_id: userId
            }
        });

        if (getProfileModel === null) return -1;

        await this.BahanMakananDetailModel.destroy({
            where: {
                profile_id: getProfileModel.dataValues.id
            }
        });

        const materials = data.bahan_makanan_id;

        for (const material of materials) {
            await this.BahanMakananDetailModel.create({
                profile_id: getProfileModel.dataValues.id,
                bahan_makanan_id: material,
                created_at: new Date(),
                updated_at: new Date(),
            });
        };

        return;
    }

    async getLevelMemasak() {

        const getLevelMemasakModel = await this.LevelMemasakModel.findAll();

        if (getLevelMemasakModel.length === 0) return -1;

        return getLevelMemasakModel;
    }

    async getWaktuMemasak() {

        const getWaktuMemasakModel = await this.WaktuMemasakModel.findAll();

        if (getWaktuMemasakModel.length === 0) return -1;

        return getWaktuMemasakModel;
    }
}

export default ProfileService;