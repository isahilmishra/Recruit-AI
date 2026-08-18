import { Router } from 'express';
import { CandidateController } from '../controllers/candidate.controller';
import { authenticate, authorize } from '../middleware/auth';
import multer from 'multer';

const upload = multer({ storage: multer.memoryStorage() });
const router = Router();

// Only CANDIDATE role can hit these endpoints
router.use(authenticate);
router.use(authorize('CANDIDATE'));

router.post('/resume', upload.single('resumeFile'), CandidateController.uploadResume);
router.get('/jobs', CandidateController.getJobs);
router.post('/evaluate', CandidateController.applyToJob);
router.get('/applications', CandidateController.getApplications);

export default router;
