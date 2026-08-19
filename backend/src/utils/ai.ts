import Groq from 'groq-sdk';
import { pipeline, env } from '@xenova/transformers';

env.useBrowserCache = false;

let embeddingPipeline: any = null;
export async function getEmbeddingPipeline() {
  if (!embeddingPipeline) {
    embeddingPipeline = await pipeline('feature-extraction', 'Xenova/all-MiniLM-L6-v2');
  }
  return embeddingPipeline;
}

export async function generateEmbedding(text: string): Promise<number[]> {
  try {
    const extractor = await getEmbeddingPipeline();
    const output = await extractor(text, { pooling: 'mean', normalize: true });
    return Array.from(output.data) as number[];
  } catch (error) {
    console.error("Error generating embedding:", error);
    throw error;
  }
}

let groqClient: Groq;
const getAi = () => {
  if (!groqClient) {
    groqClient = new Groq({ apiKey: process.env.GROQ_API_KEY });
  }
  return groqClient;
};
const model = 'openai/gpt-oss-120b';

export async function parseResume(pdfText: string) {
  const response = await getAi().chat.completions.create({
    model,
    messages: [
      {
        role: "system",
        content: `You are an expert resume parser. Extract the information strictly as valid JSON matching this schema: { "skills": string[], "experience": [{ "role": string, "company": string, "duration": string, "summary": string }], "education": [{ "degree": string, "institution": string, "year": string }] }. Output only valid JSON without any markdown code blocks, backticks, or extra text.`
      },
      {
        role: "user",
        content: pdfText
      }
    ],
    temperature: 0.2,
    response_format: { type: "json_object" }
  });

  const content = response.choices[0]?.message?.content;
  if (!content) {
    throw new Error("Failed to parse resume text.");
  }
  return JSON.parse(content);
}

export async function analyzeJobDescription(jobText: string) {
  const response = await getAi().chat.completions.create({
    model,
    messages: [
      {
        role: "system",
        content: `You are an expert technical recruiter. Analyze the job description and extract key requirements as valid JSON matching this schema: { "coreRequirements": string[], "niceToHaves": string[], "roleSummary": string }. Output only valid JSON without any markdown code blocks or extra text.`
      },
      {
        role: "user",
        content: jobText
      }
    ],
    temperature: 0.2,
    response_format: { type: "json_object" }
  });

  const content = response.choices[0]?.message?.content;
  if (!content) {
    throw new Error("Failed to analyze job description.");
  }
  return JSON.parse(content);
}

export async function generateEmail(prompt: string, candidateName: string) {
  const response = await getAi().chat.completions.create({
    model,
    messages: [
      {
        role: "system",
        content: `Write a professional email to a candidate named ${candidateName}. Output ONLY the email text without any markdown or conversational filler.`
      },
      {
        role: "user",
        content: prompt
      }
    ],
    temperature: 0.7,
  });

  return response.choices[0]?.message?.content || "";
}

export async function evaluateCandidateMatch(resumeData: any, jobText: string) {
  const response = await getAi().chat.completions.create({
    model,
    messages: [
      {
        role: "system",
        content: `You are an expert HR match evaluator. Compare the candidate resume data against the job description and evaluate their fit. Return valid JSON exactly matching this schema: { "overallScore": number (0-100), "skillScore": number (0-100), "experienceScore": number (0-100), "matchedSkills": string[], "missingSkills": string[], "summary": string (2-3 sentences explaining the fit) }. Output only valid JSON without any markdown or extra text.`
      },
      {
        role: "user",
        content: `Candidate Resume Data:\n${JSON.stringify(resumeData)}\n\nJob Description:\n${jobText}`
      }
    ],
    temperature: 0.2,
    response_format: { type: "json_object" }
  });

  const content = response.choices[0]?.message?.content;
  if (!content) {
    throw new Error("Failed to evaluate candidate match.");
  }
  
  return JSON.parse(content);
}

export async function semanticSearchCandidates(prompt: string, candidatesList: any[]) {
  const response = await getAi().chat.completions.create({
    model,
    messages: [
      {
        role: "system",
        content: `You are an expert HR sourcer. You will receive a list of candidates (in JSON format) and a search query. Your job is to find the candidates that best match the query.
        Return a valid JSON exactly matching this schema: { "matches": [{ "applicationId": string, "score": number (0-100), "reason": string }] }.
        Only include candidates that have a score of 50 or higher. Sort the matches from highest score to lowest.
        Output ONLY valid JSON without any markdown code blocks, backticks, or conversational text.`
      },
      {
        role: "user",
        content: `Search Query: "${prompt}"\n\nCandidates List:\n${JSON.stringify(candidatesList)}`
      }
    ],
    temperature: 0.1,
    response_format: { type: "json_object" }
  });

  const content = response.choices[0]?.message?.content;
  if (!content) {
    throw new Error("Failed to perform semantic search.");
  }

  return JSON.parse(content);
}
