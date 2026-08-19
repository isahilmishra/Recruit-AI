import { describe, it, expect, vi, beforeEach } from 'vitest';
import { parseResume, analyzeJobDescription, generateEmail, evaluateCandidateMatch, semanticSearchCandidates } from '../../src/utils/ai';

const mockCreate = vi.fn();

// Mock Groq SDK
vi.mock('groq-sdk', () => {
  return {
    default: class Groq {
      chat = {
        completions: {
          create: mockCreate
        }
      }
    }
  };
});

// Mock xenova transformers to prevent actual model loading during simple AI tests
vi.mock('@xenova/transformers', () => ({
  env: { useBrowserCache: false },
  pipeline: vi.fn()
}));

describe('AI Utilities', () => {
  beforeEach(() => {
    vi.clearAllMocks();
    process.env.GROQ_API_KEY = 'mock-key';
  });

  describe('parseResume', () => {
    it('should successfully parse a resume and return structured JSON', async () => {
      const mockParsedResume = {
        skills: ['React', 'Node.js'],
        experience: [{ role: 'Developer', company: 'Tech Inc', duration: '2 years', summary: 'Did stuff' }],
        education: [{ degree: 'BSc', institution: 'University', year: '2020' }]
      };

      mockCreate.mockResolvedValue({
        choices: [{ message: { content: JSON.stringify(mockParsedResume) } }]
      });

      const result = await parseResume('Raw resume text');
      expect(result).toEqual(mockParsedResume);
      expect(mockCreate).toHaveBeenCalledTimes(1);
    });

    it('should throw an error if Groq response is empty', async () => {
      mockCreate.mockResolvedValue({
        choices: [{ message: { content: null } }]
      });

      await expect(parseResume('Text')).rejects.toThrow('Failed to parse resume text');
    });

    it('should bubble up JSON parsing errors if Groq hallucinates invalid JSON', async () => {
      mockCreate.mockResolvedValue({
        choices: [{ message: { content: 'This is not JSON' } }]
      });

      await expect(parseResume('Text')).rejects.toThrow(SyntaxError);
    });
  });

  describe('evaluateCandidateMatch', () => {
    it('should calculate semantic and skill scores based on AI evaluation', async () => {
      const mockEvaluation = {
        overallScore: 85,
        skillScore: 90,
        experienceScore: 80,
        matchedSkills: ['React'],
        missingSkills: ['PostgreSQL'],
        summary: 'Good match.'
      };

      mockCreate.mockResolvedValue({
        choices: [{ message: { content: JSON.stringify(mockEvaluation) } }]
      });

      const result = await evaluateCandidateMatch({ skills: ['React'] }, 'Need React and PostgreSQL');
      expect(result).toEqual(mockEvaluation);
      expect(result.overallScore).toBe(85);
    });
  });

  describe('generateEmail', () => {
    it('should generate an email string', async () => {
      mockCreate.mockResolvedValue({
        choices: [{ message: { content: 'Dear Candidate, you are hired.' } }]
      });

      const result = await generateEmail('Send offer', 'John Doe');
      expect(result).toBe('Dear Candidate, you are hired.');
    });
  });
});
