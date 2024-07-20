class ResponsePreset {
    resOK(message, data) {
        return {
            status: 200,
            message,
            data: data || null
        };
    }


    resErr(status, message, type, data) {
        return {
            status,
            message,
            err: {
                type,
                data: data || null
            }
        };
    }
}

export default ResponsePreset;