import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

import UserModel from "../models/User.model.js";
import { Op } from "sequelize";

class AuthService {
    constructor(Server) {
        this.Server = Server;
        this.API = this.Server.API;

        this.UserModel = new UserModel(this.Server).table;
    }

    generateToken(userId) {
        return jwt.sign({ userId }, this.Server.env.SECRET_KEY, {
            expiresIn: this.Server.env.TOKEN_EXPIRED,
        });
    }

    async register(data) {

        const hashedPassword = await bcrypt.hash(data.password, 10);

        const regisUser = await this.UserModel.create({
            username: data.username,
            email: data.email,
            password: hashedPassword,
            created_at: new Date(),
            updated_at: new Date(),
        });

        return regisUser;
    }

    async login(data) {

        const getUser = await this.UserModel.findOne({
            where: {
                [Op.or]: [
                    { email: data.username },
                    { username: data.username }
                ]
            }
        });

        if (getUser === null) return -1;

        const checkPassword = await bcrypt.compare(data.password, getUser.password,);

        if (checkPassword === false) return -2;

        const token = this.generateToken(getUser.id);

        return { getUser, token };
    }
}

export default AuthService;