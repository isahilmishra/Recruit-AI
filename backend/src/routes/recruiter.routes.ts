import { Router } from 'express';
import { RecruiterController } from '../controllers/recruiter.controller';
import { authenticate, authorize } from '../middleware/auth';

const router = Router();

// Only RECRUITER role can hit these endpoints
router.use(authenticate);
router.use(authorize('RECRUITER'));

router.post('/jobs', RecruiterController.createJob);
router.get('/jobs', RecruiterController.getJobs);
router.get('/jobs/:jobId/candidates', RecruiterController.getJobCandidates);
router.get('/applications', RecruiterController.getAllApplications);
router.patch('/applications/:id/status', RecruiterController.updateApplicationStatus);

export default router;
