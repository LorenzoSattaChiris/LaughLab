import OpenAI from 'openai';
import { OpenAIStream, StreamingTextResponse } from 'ai';

const openai = new OpenAI({
    ...(process.env.OPENAI_KEY && { apiKey: process.env.OPENAI_KEY }),
    ...(process.env.BASE_URL && { baseURL: process.env.BASE_URL }),
});

export const runtime = 'edge';

export async function POST(req: Request) {
    const { messages, temperature = 0.7 } = await req.json();

    const parsedTemperature = parseFloat(temperature);
    const validTemperature = isNaN(parsedTemperature) ? 0.7 : Math.min(Math.max(parsedTemperature, 0), 2);
    
    const response = await openai.chat.completions.create({
        model: 'gpt-3.5-turbo',
        stream: true,
        temperature: validTemperature,
        messages: [
            {
                role: "system",
                content:
                    `You are a professional storyteller who has been hired to write a series of short stories for a new anthology. The stories should be captivating, imaginative, and thought-provoking. They should explore a variety of themes and genres, from science fiction and fantasy to mystery and romance. Each story should be unique and memorable, with compelling characters and unexpected plot twists.`,
            },
            ...messages,
        ],
    });

    const stream = OpenAIStream(response);
    return new StreamingTextResponse(stream);
}