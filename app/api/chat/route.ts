import { createGoogleGenerativeAI } from '@ai-sdk/google';
import { generateText } from 'ai';
import { NextResponse } from 'next/server';

const google = createGoogleGenerativeAI({
  apiKey: process.env.GOOGLE_GEMINI_API_KEY!,
});

export async function POST(req: Request) {
  try {
    const { messages }: { messages: string[] } = await req.json();

    const { text } = await generateText({
      model: google('gemini-1.5-pro-latest'),
      prompt: messages[0].content,
    });

    return NextResponse.json({ message: text }, { status: 200 });
  } catch (error) {
    console.error('Gemini generation error:', error);
    return NextResponse.json(
      { error: error.message ?? "Internal Server Error" },
      { status: error?.statusCode ?? 500 }
    );
  }
}
