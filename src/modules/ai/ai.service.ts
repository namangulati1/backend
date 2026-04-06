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
    const response = await fetch('http://localhost:11434/api/generate', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        model: 'gemma4:latest',
        prompt: prompt,
        stream: false,
      }),
    });

    const data = await response.json();
    return data.response;
  }
}
