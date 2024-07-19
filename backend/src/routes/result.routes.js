import { Router } from "express";
import { verifyJWT } from "../middleware/auth.middleware.js";
import {
    submitQuiz, getResultOfAllStudent
} from "../controller/result.controller.js";

const router = Router();

router.route("/submit").post(verifyJWT, submitQuiz);

router.route("/all").post(verifyJWT, getResultOfAllStudent);

export default router;