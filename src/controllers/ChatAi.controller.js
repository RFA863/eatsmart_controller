import Ajv from "ajv";

import ChatAiService from "../services/ChatAi.service.js";
import ChatAiValidator from "../validators/ChatAi.validator.js";
import ResponsePreset from "../helpers/ResponsePreset.helper.js";


class ChatAiController {

    constructor(Server) {
        this.Server = Server;
        this.API = this.Server.API;
        this.Ajv = new Ajv();
        this.ResponsePreset = new ResponsePreset();
        this.ChatAiValidator = new ChatAiValidator();
        this.ChatAiService = new ChatAiService(this.Server);
    }

    async inputMessage(req, res) {

        const schemaValidate = this.Ajv.compile(this.ChatAiValidator.inputMessage)
        if (!schemaValidate(req.body))
            return res.status(400).json(this.ResponsePreset.resErr(
                "400", schemaValidate.errors[0].message, "validator", schemaValidate.errors[0]
            ));

        const { userId } = req.middlewares.authorization;
        const data = req.body

        const inputMessageSrv = await this.ChatAiService.inputMessage(data, userId);

        if (inputMessageSrv === -1)
            return res.status(404).json(this.ResponsePreset.resErr(
                404, "User Not Found", "Service", { code: -1 }
            ));

        if (inputMessageSrv === -2)
            return res.status(400).json(this.ResponsePreset.resErr(
                400, "Bad Request", "Service", { code: -2 }
            ));

        res.status(200).json(this.ResponsePreset.resOK("Ok", inputMessageSrv));
    }

    async messageNoAuth(req, res) {
        const schemaValidate = this.Ajv.compile(this.ChatAiValidator.inputMessage)
        if (!schemaValidate(req.body))
            return res.status(400).json(this.ResponsePreset.resErr(
                "400", schemaValidate.errors[0].message, "validator", schemaValidate.errors[0]
            ));

        const data = req.body

        const messageNoAuthSrv = await this.ChatAiService.messageNoAuth(data);

        if (messageNoAuthSrv === -2)
            return res.status(400).json(this.ResponsePreset.resErr(
                400, "Bad Request", "Service", { code: -2 }
            ));

        res.status(200).json(this.ResponsePreset.resOK("Ok", messageNoAuthSrv));
    }
}

export default ChatAiController;