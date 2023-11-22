import express from 'express'
import multer from 'multer'
import { updateUser, getUsers, getUser } from '../controllers/user.controller.js'
import User from '../models/user.model.js';
import checkAuth from '../utils/checkAuth.js';
import { verifyToken } from '../utils/verifyToken.js';
const router = express.Router()
const upload = multer({
	storage: multer.memoryStorage(),
})
router.get('/all', getUsers)
router.get('/:userId', getUser)
router.patch('/update/:userId',verifyToken,
//  upload.single('profilePhoto'),
  updateUser)
export default router;
