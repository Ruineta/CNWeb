import express from 'express';
import studentRoutes from './studentRoutes.js';
const router = express.Router();

// Bài 1
router.use('/students', studentRoutes);
export default router;