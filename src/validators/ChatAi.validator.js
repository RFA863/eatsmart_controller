class ChatAiValidator {

    inputMessage = {
        type: "object",
        properties: {

            user_message: {
                type: "string",
                minLength: 1,
                nullable: false,
            },


        },
        required: ["user_message"],
        additionalProperties: false,
    }

}

export default ChatAiValidator;