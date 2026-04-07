import { Injectable } from '@nestjs/common';

@Injectable()
export class AiService {
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
    const apiKey = process.env.GEMINI_API_KEY || '';
    const response = await fetch(`${process.env.GEMINI_API_URL}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'X-goog-api-key': apiKey,
      },
      body: JSON.stringify({
        contents: [
          {
            parts: [
              {
                text: prompt,
              },
            ],
          },
        ],
      }),
    });

    const data = await response.json();
    return data.candidates?.[0]?.content?.parts?.[0]?.text;
  }
}
