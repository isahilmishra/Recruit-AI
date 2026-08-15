import { GoogleGenAI, Type, Schema } from '@google/genai';

let aiClient: GoogleGenAI;
const getAi = () => {
  if (!aiClient) aiClient = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });
  return aiClient;
};
const model = 'gemini-1.5-flash';

const resumeSchema: Schema = {
  type: Type.OBJECT,
  properties: {
    skills: {
      type: Type.ARRAY,
      items: { type: Type.STRING },
      description: "List of technical and soft skills extracted from the resume.",
    },
    experience: {
      type: Type.ARRAY,
      items: {
        type: Type.OBJECT,
        properties: {
          role: { type: Type.STRING },
          company: { type: Type.STRING },
          duration: { type: Type.STRING },
          summary: { type: Type.STRING },
        },
        required: ["role", "company", "duration", "summary"],
      },
      description: "List of past work experiences.",
    },
    education: {
      type: Type.ARRAY,
      items: {
        type: Type.OBJECT,
        properties: {
          degree: { type: Type.STRING },
          institution: { type: Type.STRING },
          year: { type: Type.STRING },
        },
        required: ["degree", "institution", "year"],
      },
      description: "List of educational degrees.",
    },
  },
  required: ["skills", "experience", "education"],
};

export async function parseResume(pdfText: string) {
  const response = await getAi().models.generateContent({
    model,
    contents: `Extract the resume information strictly from the following text and return it as valid JSON matching this schema: { skills: string[], experience: { role: string, company: string, duration: string, summary: string }[], education: { degree: string, institution: string, year: string }[] }.\n\nText:\n${pdfText}`,
    config: {
      temperature: 0.2,
    },
  });

  if (!response.text) {
    throw new Error("Failed to parse resume text.");
  }
  
  // Clean markdown backticks if any
  const cleanedText = response.text.replace(/```json/gi, '').replace(/```/gi, '').trim();
  return JSON.parse(cleanedText);
}

const jobSchema: Schema = {
  type: Type.OBJECT,
  properties: {
    coreRequirements: {
      type: Type.ARRAY,
      items: { type: Type.STRING },
      description: "Absolute must-have requirements for the job.",
    },
    niceToHaves: {
      type: Type.ARRAY,
      items: { type: Type.STRING },
      description: "Optional but preferred skills or qualifications.",
    },
    roleSummary: {
      type: Type.STRING,
      description: "A 1-2 sentence summary of the role.",
    }
  },
  required: ["coreRequirements", "niceToHaves", "roleSummary"],
};

export async function analyzeJobDescription(jobText: string) {
  const response = await getAi().models.generateContent({
    model,
    contents: `Analyze the following job description and extract the key requirements as valid JSON matching this schema: { coreRequirements: string[], niceToHaves: string[], roleSummary: string }.\n\nText:\n${jobText}`,
    config: {
      temperature: 0.2,
    },
  });

  if (!response.text) {
    throw new Error("Failed to analyze job description.");
  }
  const cleanedText = response.text.replace(/```json/gi, '').replace(/```/gi, '').trim();
  return JSON.parse(cleanedText);
}

export async function generateEmail(prompt: string, candidateName: string) {
  const response = await getAi().models.generateContent({
    model,
    contents: `Write a professional email to a candidate named ${candidateName} based on the following instructions. Output ONLY the email text without any markdown or conversational filler:\n\n${prompt}`,
    config: {
      temperature: 0.7,
    },
  });

  return response.text;
}

export async function evaluateCandidateMatch(resumeData: any, jobText: string) {
  const response = await getAi().models.generateContent({
    model,
    contents: `Compare the following candidate resume data against the job description and evaluate their fit. Return valid JSON exactly matching this schema: { overallScore: number (0-100), skillScore: number (0-100), experienceScore: number (0-100), matchedSkills: string[], missingSkills: string[], summary: string (2-3 sentences explaining the fit) }.\n\nCandidate Resume Data:\n${JSON.stringify(resumeData)}\n\nJob Description:\n${jobText}`,
    config: {
      temperature: 0.2,
    },
  });

  if (!response.text) {
    throw new Error("Failed to evaluate candidate match.");
  }
  
  const cleanedText = response.text.replace(/```json/gi, '').replace(/```/gi, '').trim();
  return JSON.parse(cleanedText);
}
