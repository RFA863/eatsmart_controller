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

            aktivitas_id: {
                type: "number",
                minimum: 1,
                nullable: false
            }
        },
        required: ["tanggal_lahir", "tinggi", "berat", "jeniskelamin", "aktivitas_id"],
        additionalProperties: false,
    }

    inputPreferensi = {
        type: "object",
        properties: {

            preferensi_diet_id: {
                type: "array",
                minItems: 1,
                items: { type: "number" },
                nullable: false,
            }
        },

        required: ["preferensi_diet_id"],
        additionalProperties: false,
    }
}

export default ProfileValidator;