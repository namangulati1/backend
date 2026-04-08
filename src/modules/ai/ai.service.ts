import { Injectable } from '@nestjs/common';
import { GoogleGenAI, ThinkingLevel } from '@google/genai';

@Injectable()
export class AiService {
  private ai: GoogleGenAI;

  constructor() {
    this.ai = new GoogleGenAI({
      apiKey: process.env.GEMINI_API_KEY,
    });
  }

  async analyzeLog(log: string): Promise<any> {
    const prompt = `
        You are a senior backend engineer with 10+ years of experience.

Analyze the log strictly and return structured JSON.

Rules:
- Be precise
- Do not hallucinate
- If unsure, say "UNKNOWN"

Log:
${log}

Output format:
{
  "errorType": "DATABASE | AUTH | NETWORK | UNKNOWN",
  "rootCause": "...",
  "suggestion": "...",
  "severity": "low | medium | high"
}
`;

    const config = {
      thinkingConfig: {
        thinkingLevel: ThinkingLevel.HIGH,
      },
    };
    const model = 'gemma-4-26b-a4b-it';
    const contents = [
      {
        role: 'user' as const,
        parts: [
          {
            text: prompt,
          },
        ],
      },
    ];
    const response = await this.ai.models.generateContentStream({
      model,
      config,
      contents,
    });

    let result = '';
    for await (const chunk of response) {
      if (chunk.text) {
        result += chunk.text;
      }
    }
    return result;
  }
}
