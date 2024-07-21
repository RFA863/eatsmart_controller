class ProfileValidator {
    inputProfile = {
        type: "object",
        properties: {

            usia: {
                type: "number",
                maximum: 999,
                minimum: 1,
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
        required: ["usia", "tinggi", "berat", "jeniskelamin"],
        additionalProperties: false,
    };
}

export default ProfileValidator;