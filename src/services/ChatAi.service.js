import OpenAI from "openai";
import { GoogleGenerativeAI } from "@google/generative-ai";

import ChatAiModel from "../models/ChatAi.model.js";
import ProfileModel from "../models/Profile.model.js";

class ChatAiService {
    constructor(Server) {
        this.Server = Server;
        this.API = this.Server.API;
        this.openai = new OpenAI({
            apiKey: this.Server.env.OPENAI_API_KEY, // Pastikan Anda memiliki API key yang valid
        });

        this.genAI = new GoogleGenerativeAI(this.Server.env.GEMINI_API_KEY,);
        this.model = this.genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
        this.ChatAiModel = new ChatAiModel(this.Server).table;
        this.ProfileModel = new ProfileModel(this.Server).table;
    }

    async inputMessage(data, userId) {

        const getProfileModel = await this.ProfileModel.findOne({
            where: {
                user_id: userId
            }
        });

        if (getProfileModel === null) return -1;

        const prompt = "Anda adalah seorang yang ahli dibidang, kesehatan, gizi, nutrisi dan diet. Tolong jawab lah pertanyaan-pertanyaan dibawah ini yang berkaitan dengan bidang yang anda kuasai tersebut. dan jika ada yang bertanya di luar bidang yang anda kuasai tolong untuk tidak di jawab. berikut adalah pertanyaan-pertanyaan tersebut :" + data.user_message;

        const result = await this.model.generateContent(prompt);
        const response = await result.response;
        const text = response.text();

        // const completion = await this.openai.chat.completions.create({
        //     model: "gpt-3.5-turbo",
        //     messages: [
        //         {
        //             role: "system",
        //             content: "You are a highly experienced and knowledgeable expert in the field of health, particularly in nutrition, diet, and healthy living. You provide accurate, evidence-based advice on topics related to dietary practices, nutrition, wellness, and healthy lifestyle choices. Your expertise includes creating balanced meal plans, understanding the nutritional needs of different individuals, offering advice on weight management, and promoting overall well-being. You will only answer questions related to health, nutrition, diet, and healthy living, and will politely decline to respond to inquiries outside of these topics."
        //         },
        //         {
        //             role: "user",
        //             content: data.user_message,
        //         },
        //     ],
        // });

        // if (!completion.choices[0].message) return -2;
        if (!text) return -2;

        await this.ChatAiModel.create({
            profile_id: getProfileModel.dataValues.id,
            user_message: data.user_message,
            // bot_response: completion.choices[0].message,
            bot_response: text,
            created_at: new Date(),
            updated_at: new Date(),
        });

        // const bot_response = completion.choices[0].message;
        const bot_response = text;

        return bot_response;
    }

    async messageNoAuth(data) {
        try {
            const prompt = "Anda adalah seorang yang ahli dibidang, kesehatan, gizi, nutrisi dan diet. Tolong jawab lah pertanyaan-pertanyaan dibawah ini yang berkaitan dengan bidang yang anda kuasai tersebut. dan jika ada yang bertanya di luar bidang yang anda kuasai tolong untuk tidak di jawab. berikut adalah pertanyaan-pertanyaan tersebut :" + data.user_message;

            const result = await this.model.generateContent(prompt);
            const response = await result.response;
            const text = await response.text();

            if (!text) return -2;

            const bot_response = text;

            return bot_response;

        } catch (error) {
            // Tangani atau lempar kembali error ke controller
            // console.error('Error in messageNoAuth Service:', error);
            throw new Error('ServiceError: ' + error.message);
        }
    }
}

export default ChatAiService;