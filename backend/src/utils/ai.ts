import Groq from 'groq-sdk';

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
