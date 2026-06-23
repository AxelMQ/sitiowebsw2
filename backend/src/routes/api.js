import { Router } from 'express';
import { chatHandler, healthHandler } from '../controllers/chatController.js';
import { sendEmailHandler } from '../controllers/emailController.js';

const router = Router();

router.post('/chat', chatHandler);
router.get('/health', healthHandler);
router.post('/send-email', sendEmailHandler);

export default router;
