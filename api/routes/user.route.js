import express from 'express';
import { 
    addUser,
    deleteUser,
    getAllUsers,
    getUser 
} from '../controllers/user.controller.js';

const router = express.Router();

router.post("/", addUser);
router.get("/:id", getUser);
router.get("/", getAllUsers);
router.delete("/:id", deleteUser);

export default router;