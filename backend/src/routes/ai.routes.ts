import { Router } from 'express';
import { testParseResume, testAnalyzeJob, testMatchCandidate } from '../controllers/ai.controller';

const router = Router();

// These routes are unprotected for testing purposes (mocking AI phase)
router.post('/test-resume', testParseResume as any);
router.post('/test-job', testAnalyzeJob as any);
router.post('/test-match', testMatchCandidate as any);

export default router;
