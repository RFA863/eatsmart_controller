import Ajv from "ajv";

import ProfileService from "../services/Profile.service.js";
import ResponsePreset from "../helpers/ResponsePreset.helper.js";
import ProfileValidator from "../validators/Profile.validator.js";

class ProfileController {
    constructor(Server) {
        this.Server = Server;
        this.API = this.Server.API;
        this.Ajv = new Ajv();
        this.ResponsePreset = new ResponsePreset();
        this.ProfileValidator = new ProfileValidator();
        this.ProfileService = new ProfileService(this.Server);
    }

    async getAktivitas(req, res) {
        const getAktifitasSrv = await this.ProfileService.getAktifitas();

        res.status(200).json(this.ResponsePreset.resOK("Ok", getAktifitasSrv));
    }

    async input(req, res) {

        const schemaValidate = this.Ajv.compile(this.ProfileValidator.inputProfile)
        if (!schemaValidate(req.body))
            return res.status(400).json(this.ResponsePreset.resErr(
                "400", schemaValidate.errors[0].message, "validator", schemaValidate.errors[0]
            ));

        const { userId } = req.middlewares.authorization;
        const data = req.body;

        const inputDataSrv = await this.ProfileService.inputData(data, userId);

        if (inputDataSrv === -1)
            return res.status(409).json(this.ResponsePreset.resErr(
                409, "Profile already exists", "service", { code: -1 }
            ));

        res.status(200).json(this.ResponsePreset.resOK("Ok", inputDataSrv));
    }

    async get(req, res) {
        const { userId } = req.middlewares.authorization;

        const getDataByIdSrv = await this.ProfileService.getDataById(userId);

        if (getDataByIdSrv === -1)
            return res.status(404).json(this.ResponsePreset.resErr(
                404, "Profile not found", "Service", { code: -1 }
            ));

        res.status(200).json(this.ResponsePreset.resOK("Ok", getDataByIdSrv));
    }

    async update(req, res) {

        const schemaValidate = this.Ajv.compile(this.ProfileValidator.inputProfile)
        if (!schemaValidate(req.body))
            return res.status(400).json(this.ResponsePreset.resErr(
                "400", schemaValidate.errors[0].message, "validator", schemaValidate.errors[0]
            ));

        const { userId } = req.middlewares.authorization;
        const data = req.body;

        const updateData = await this.ProfileService.updateData(data, userId);

        if (updateData === -1)
            return res.status(404).json(this.ResponsePreset.resErr(
                404, "Profile not found", "service", { code: -1 }
            ));

        res.status(200).json(this.ResponsePreset.resOK("Ok", null));
    }

    async getTujuanDiet(req, res) {
        const getTujuanDietSrv = await this.ProfileService.getTujuanDiet();

        res.status(200).json(this.ResponsePreset.resOK("OK", getTujuanDietSrv));
    }

    async getPreferensiDiet(req, res) {
        const getPreferensiDietSrv = await this.ProfileService.getPreferensiDiet();

        res.status(200).json(this.ResponsePreset.resOK("Ok", getPreferensiDietSrv));
    }

    async inputPreferensiDietDetail(req, res) {

        const schemaValidate = this.Ajv.compile(this.ProfileValidator.inputPreferensi)
        if (!schemaValidate(req.body))
            return res.status(400).json(this.ResponsePreset.resErr(
                "400", schemaValidate.errors[0].message, "validator", schemaValidate.errors[0]
            ));

        const data = req.body;
        const { userId } = req.middlewares.authorization;

        const inputPreferensiDietDetailSrv = await this.ProfileService.inputPreferensiDietDetail(data, userId);

        res.status(200).json(this.ResponsePreset.resOK("Ok", null));
    }

    async getPreferensiDietDetail(req, res) {

        const { userId } = req.middlewares.authorization;

        const getPreferensiDietDetailSrv = await this.ProfileService.getPreferensiDietDetail(userId);

        if (getPreferensiDietDetailSrv === -1)
            return res.status(404).json(this.ResponsePreset.resErr(
                404, "User Not Found", "Service", { code: -1 }
            ));

        res.status(200).json(this.ResponsePreset.resOK("Ok", getPreferensiDietDetailSrv));
    }

    async updatePreferensiDietDetail(req, res) {

        const schemaValidate = this.Ajv.compile(this.ProfileValidator.inputPreferensi)
        if (!schemaValidate(req.body))
            return res.status(400).json(this.ResponsePreset.resErr(
                "400", schemaValidate.errors[0].message, "validator", schemaValidate.errors[0]
            ));

        const data = req.body;
        const { userId } = req.middlewares.authorization;

        const updatePreferensiDietDetailSrv = await this.ProfileService.updatePreferensiDietDetail(data, userId);

        if (updatePreferensiDietDetailSrv === -1)
            return res.status(404).json(this.ResponsePreset.resErr(
                404, "User Not Found", "Service", { code: -1 }
            ));

        res.status(200).json(this.ResponsePreset.resOK("Ok", null));
    }

    async getBahanMakanan(req, res) {
        const getBahanMakananSrv = await this.ProfileService.getBahanMakanan();

        if (getBahanMakananSrv === -1)
            return res.status(404).json(this.ResponsePreset.resErr(
                404, "Data is Emty", "Service", { code: -1 }
            ));

        res.status(200).json(this.ResponsePreset.resOK("Ok", getBahanMakananSrv));
    }

    async inputBahanMakananDetail(req, res) {
        const schemaValidate = this.Ajv.compile(this.ProfileValidator.inputBahanMakanan)
        if (!schemaValidate(req.body))
            return res.status(400).json(this.ResponsePreset.resErr(
                "400", schemaValidate.errors[0].message, "validator", schemaValidate.errors[0]
            ));

        const data = req.body;
        const { userId } = req.middlewares.authorization;

        const inputBahanMakananDetailSrv = await this.ProfileService.inputBahanMakananDetail(data, userId);

        if (inputBahanMakananDetailSrv === -1)
            return res.status(404).json(this.ResponsePreset.resErr(
                404, "User Not Found", "Service", { code: -1 }
            ));

        res.status(200).json(this.ResponsePreset.resOK("Ok", null));
    }

    async getBahanMakananDetail(req, res) {
        const { userId } = req.middlewares.authorization;

        const getBahanMakananDetailSrv = await this.ProfileService.getBahanMakanDetail(userId);

        if (getBahanMakananDetailSrv === -1)
            return res.status(404).json(this.ResponsePreset.resErr(
                404, "User Not Found", "Service", { code: -1 }
            ));

        res.status(200).json(this.ResponsePreset.resOK("Ok", getBahanMakananDetailSrv));
    }

    async updateBahanMakananDetail(req, res) {
        const schemaValidate = this.Ajv.compile(this.ProfileValidator.inputBahanMakanan)
        if (!schemaValidate(req.body))
            return res.status(400).json(this.ResponsePreset.resErr(
                "400", schemaValidate.errors[0].message, "validator", schemaValidate.errors[0]
            ));

        const data = req.body;
        const { userId } = req.middlewares.authorization;

        const updateBahanMakananDetailSrv = await this.ProfileService.updateBahanMakananDetail(data, userId);

        if (updateBahanMakananDetailSrv === -1)
            return res.status(404).json(this.ResponsePreset.resErr(
                404, "User Not Found", "Service", { code: -1 }
            ));

        res.status(200).json(this.ResponsePreset.resOK("Ok", null));
    }

    async getLevelMemasak(req, res) {
        const getLevelMemasakSrv = await this.ProfileService.getLevelMemasak();

        if (getLevelMemasakSrv === -1)
            return res.status(404).json(this.ResponsePreset.resErr(
                404, "Data is Emty", "Service", { code: -1 }
            ));

        res.status(200).json(this.ResponsePreset.resOK("Ok", getLevelMemasakSrv));
    }

    async getWaktuMemasak(req, res) {

        const getWaktuMemasakSrv = await this.ProfileService.getWaktuMemasak();

        if (getWaktuMemasakSrv === -1)
            return res.status(404).json(this.ResponsePreset.resErr(
                404, "Data is Emty", "Service", { code: -1 }
            ));

        res.status(200).json(this.ResponsePreset.resOK("Ok", getWaktuMemasakSrv));
    }
}

export default ProfileController;