
import { Configuration, OpenAIApi } from "openai";

export default async function handler(req, res) {
  const { message } = req.body;

  const configuration = new Configuration({
    apiKey: process.env.OPENAI_API_KEY,
  });
  const openai = new OpenAIApi(configuration);

  try {
    const completion = await openai.createChatCompletion({
      model: "gpt-3.5-turbo",
      messages: [
        {
          role: "system",
          content: "You are a helpful assistant for people living in or exploring Istanbul. Answer questions clearly and practically.",
        },
        {
          role: "user",
          content: message,
        },
      ],
    });

    res.status(200).json({ reply: completion.data.choices[0].message.content });
  } catch (error) {
    res.status(500).json({ reply: "Sorry, there was an error processing your request." });
  }
}
