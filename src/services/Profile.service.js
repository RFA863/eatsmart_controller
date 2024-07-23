import moment from 'moment';

import UserModel from "../models/User.model.js";
import ProfileModel from "../models/Profile.model.js";

class ProfileService {
    constructor(Server) {
        this.Server = Server;
        this.API = this.Server.API;
        this.UserModel = new UserModel(this.Server).table;
        this.ProfileModel = new ProfileModel(this.Server).table;
    }

    calculateAge(birthDate) {
        return moment().diff(moment(birthDate, 'YYYY-MM-DD'), 'years');
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

        const getProfile = await this.ProfileModel.findOne({
            where: {
                user_id: userId,
            },
            include: [
                {
                    model: this.UserModel,
                    where: {
                        id: userId
                    }
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
}

export default ProfileService;