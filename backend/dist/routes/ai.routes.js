import { Router } from 'express';
import { testParseResume, testAnalyzeJob, testMatchCandidate } from '../controllers/ai.controller';
const router = Router();
// These routes are unprotected for testing purposes (mocking AI phase)
router.post('/test-resume', testParseResume);
router.post('/test-job', testAnalyzeJob);
router.post('/test-match', testMatchCandidate);
export default router;
//# sourceMappingURL=ai.routes.js.map