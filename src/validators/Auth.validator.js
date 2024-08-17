class AuthValidator {
    register = {
        type: "object",
        properties: {

            username: {
                type: "string",
                maxLength: 100,
                minLength: 1,
                nullable: false,
            },

            email: {
                type: "string",
                maxLength: 100,
                minLength: 1,
                nullable: false,
            },

            password: {
                type: "string",
                maxLength: 100,
                minLength: 1,
                nullable: false,
            },

            confirmPassword: {
                type: "string",
                maxLength: 100,
                minLength: 1,
                nullable: false,
            },


        },

        required: ["username", "email", "password", "confirmPassword"],
        additionalProperties: false,
    };
}

export default AuthValidator;