import { Router } from 'express';
import { getHealth, dbHealth } from '../controllers/health.controller';

const router = Router();

router.get('/', getHealth);
router.get('/db', dbHealth);

export default router;
