import { Request, Response } from "express";
import dotenv from "dotenv";
dotenv.config();
export class Bot {
  async GetMessage(req: Request, res: Response) {
    const apiKey = process.env.API;

    const prompt = req.body.messages;
    if (!prompt) {
      res.status(404).json({ message: "Envie alguma mensagem!", success: false, })
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
        messages:prompt,
      })
    })
      .then(response => response.json())
      .then(data => {
        res.status(200).json({
          message:data?.choices[0]?.message?.content,
          details:data
        })
      })
      .catch(error => {
        res.status(500).json({error})
      });
  }
}