class ProfileValidator {
    inputProfile = {
        type: "object",
        properties: {

            tanggal_lahir: {
                type: "string",
                maxLength: 100,
                minLength: 1,
                nullable: false,
            },

            tinggi: {
                type: "number",
                maximum: 999,
                minimum: 1,
                nullable: false,
            },

            berat: {
                type: "number",
                maximum: 999,
                minimum: 1,
                nullable: false,
            },

            jeniskelamin: {
                type: "boolean",
                nullable: false,
            },
        },
        required: ["tanggal_lahir", "tinggi", "berat", "jeniskelamin"],
        additionalProperties: false,
    };
}

export default ProfileValidator;