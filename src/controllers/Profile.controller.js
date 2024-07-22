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

    async input(req, res) {

        const schemaValidate = this.Ajv.compile(this.ProfileValidator.inputProfile)
        if (!schemaValidate(req.body))
            return res.status(400).json(this.ResponsePreset.resErr(
                "400", schemaValidate.errors[0].message, "validator", schemaValidate.errors[0]
            ));

        const { userId } = req.middlewares.authorization;
        const data = req.body;

        const inputDataSrv = await this.ProfileService.input(data, userId);

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
}

export default ProfileController;