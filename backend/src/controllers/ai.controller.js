import { parseResume, analyzeJobDescription, evaluateCandidateMatch } from '../utils/ai';
import { AppError } from '../utils/AppError';
export const testParseResume = async (req, res, next) => {
    try {
        const { text } = req.body;
        if (!text) {
            return next(new AppError('Please provide text in the body to parse.', 400));
        }
        const parsedData = await parseResume(text);
        res.status(200).json({
            status: 'success',
            data: parsedData
        });
    }
    catch (error) {
        next(new AppError(`AI Parsing Error: ${error.message}`, 500));
    }
};
export const testAnalyzeJob = async (req, res, next) => {
    try {
        const { text } = req.body;
        if (!text) {
            return next(new AppError('Please provide job text in the body to analyze.', 400));
        }
        const analyzedData = await analyzeJobDescription(text);
        res.status(200).json({
            status: 'success',
            data: analyzedData
        });
    }
    catch (error) {
        next(new AppError(`AI Parsing Error: ${error.message}`, 500));
    }
};
export const testMatchCandidate = async (req, res, next) => {
    try {
        const { resumeData, jobText } = req.body;
        if (!resumeData || !jobText) {
            return next(new AppError('Please provide resumeData and jobText in the body.', 400));
        }
        const matchData = await evaluateCandidateMatch(resumeData, jobText);
        res.status(200).json({
            status: 'success',
            data: matchData
        });
    }
    catch (error) {
        next(new AppError(`AI Match Error: ${error.message}`, 500));
    }
};
//# sourceMappingURL=ai.controller.js.map