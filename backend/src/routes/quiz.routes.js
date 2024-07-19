import { Router } from "express";
import { verifyJWT } from "../middleware/auth.middleware.js";
import {
    createQuiz,
    getUserQuiz,
    getQuiz,
    getPastQuiz,
} from "../controller/quiz.controller.js";

const router = Router();

router.route("/create").post(verifyJWT, createQuiz);

router.route("/getUserQuiz").get(verifyJWT, getUserQuiz);

router.route("/find").post(verifyJWT, getQuiz);

router.route("/history").get(verifyJWT, getPastQuiz);

export default router;
