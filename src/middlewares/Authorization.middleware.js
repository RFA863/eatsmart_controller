import JWT from "jsonwebtoken";

class Authorization {
    constructor(server) {
        this.server = server;
    }

    check() {
        return (req, res, next) => {
            req.middlewares.authorization = {};
            let token = req.headers["authorization"];

            if (!token || token === "undefined") {
                if (!req.query.token)
                    return res.status(401).json({
                        status: 401,
                        message: "Request Unauthorized",
                        type: "token",
                        data: { code: -1 },
                    });

                token = req.query.token;
            }

            JWT.verify(token, this.server.env.SECRET_KEY, (err, data) => {
                if (err) {
                    if (err.name !== "TokenExpiredError")
                        return res.status(401).json({
                            status: 401,
                            message: "Token Unauthorized",
                            type: "token",
                            data: { code: -1 },
                        });

                    return res.status(401).json({
                        status: 401,
                        message: "Token Expired",
                        type: "token",
                        data: { code: -2 },
                    });
                }

                req.middlewares.authorization = data;
                return next();
            });
        };
    }
}

export default Authorization;