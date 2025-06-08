"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Bot = void 0;
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
class Bot {
    GetMessage(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const apiKey = process.env.API;
            const prompt = req.body.messages;
            if (!prompt) {
                res.status(404).json({ message: "Envie alguma mensagem!", success: false, });
                return;
            }
            fetch("https://api.openai.com/v1/chat/completions", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${apiKey}`
                },
                body: JSON.stringify({
                    model: "gpt-3.5-turbo",
                    messages: prompt,
                })
            })
                .then(response => response.json())
                .then(data => {
                var _a, _b;
                res.status(200).json({
                    message: (_b = (_a = data === null || data === void 0 ? void 0 : data.choices[0]) === null || _a === void 0 ? void 0 : _a.message) === null || _b === void 0 ? void 0 : _b.content,
                    details: data
                });
            })
                .catch(error => {
                res.status(500).json({ error });
            });
        });
    }
}
exports.Bot = Bot;
