import Ajv from "ajv"

import AuthService from "../services/Auth.service.js";
import AuthValidator from "../validators/Auth.validator.js";
import ResponsePreset from "../helpers/ResponsePreset.helper.js";


class AuthController {
    constructor(Server) {
        this.Server = Server;
        this.API = this.Server.API;
        this.Ajv = new Ajv();

        this.AuthValidator = new AuthValidator();
        this.ResponsePreset = new ResponsePreset();
        this.AuthService = new AuthService(this.Server);
    }

    async register(req, res) {
        const schemaValidate = this.Ajv.compile(this.AuthValidator.register)
        if (!schemaValidate(req.body))
            return res.status(400).json(this.ResponsePreset.resErr(
                "400", schemaValidate.errors[0].message, "validator", schemaValidate.errors[0]
            ));

        const data = req.body;

        const regisSrv = await this.AuthService.register(data);

        res.status(200).json(this.ResponsePreset.resOK("Ok", regisSrv));
    }

    async login(req, res) {
        const data = req.body;

        const loginSrv = await this.AuthService.login(data);

        if (loginSrv === -1)
            return res.status(404).json(this.ResponsePreset.resErr(
                "404", "Username or Email is wrong", "service", { code: -1 }
            ));

        if (loginSrv === -2)
            return res.status(404).json(this.ResponsePreset.resErr(
                "404", "Password is wrong", "service", { code: -2 }
            ));

        res.status(200).json(this.ResponsePreset.resOK("Ok", loginSrv));
    }
}

export default AuthController;