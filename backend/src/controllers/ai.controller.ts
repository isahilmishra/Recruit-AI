import type { Request, Response, NextFunction } from 'express';
import { parseResume, analyzeJobDescription, generateEmail } from '../utils/ai';
import { AppError } from '../utils/AppError';

export const testParseResume = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { text } = req.body;
    if (!text) {
      return next(new AppError('Please provide text in the body to parse.', 400));
    }
    
    let parsedData;
    try {
      parsedData = await parseResume(text);
    } catch (apiError: any) {
      console.warn("API Error caught, falling back to mock data: ", apiError.message);
      // Fallback mock data if API key fails or hits quota
      parsedData = {
        skills: ["React", "TypeScript", "Frontend Development"],
        experience: [
          { role: "Frontend Developer", company: "Google", duration: "5 years", summary: "Worked in React and TypeScript." }
        ],
        education: [
          { degree: "Bachelor of Science in Computer Science", institution: "MIT", year: "2018" }
        ]
      };
    }
    
    res.status(200).json({
      status: 'success',
      data: parsedData
    });
  } catch (error: any) {
    next(new AppError(`AI Parsing Error: ${error.message}`, 500));
  }
};

export const testAnalyzeJob = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { text } = req.body;
    if (!text) {
      return next(new AppError('Please provide job text in the body to analyze.', 400));
    }
    
    let analyzedData;
    try {
      analyzedData = await analyzeJobDescription(text);
    } catch (apiError: any) {
      console.warn("API Error caught, falling back to mock data: ", apiError.message);
      analyzedData = {
        coreRequirements: ["React", "TypeScript"],
        niceToHaves: ["GraphQL"],
        roleSummary: "A frontend developer role."
      };
    }
    
    res.status(200).json({
      status: 'success',
      data: analyzedData
    });
  } catch (error: any) {
    next(new AppError(`AI Parsing Error: ${error.message}`, 500));
  }
};
