import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { Quiz } from "../models/quiz.model.js";
import { Question } from "../models/question.model.js";
import { Result } from "../models/result.model.js";
import { User } from "../models/user.model.js";

const createQuiz = asyncHandler(async (req, res) => {
    // get title from request
    // get questions from request
    // get correct answers
    // create quiz
    // return response

    const { title, questions, correctAnswers } = req.body;

    if (!title || !questions || !correctAnswers) {
        return res
            .status(400)
            .json(new ApiResponse(400, {}, "All fields are required"));
    }

    const quiz = await Quiz.create({ title, owner: req.user._id });

    for (let i in questions) {
        await Question.create({
            question: questions[i].question,
            option: questions[i].option,
            answer: correctAnswers[i],
            quiz: quiz._id,
        });
    }

    return res
        .status(201)
        .json(new ApiResponse(201, quiz, "Quiz created successfully"));
});

const getUserQuiz = asyncHandler(async (req, res) => {
    // get all quizzes created by the user
    // return response

    const quizzes = await Quiz.find({ owner: req.user._id });

    return res.status(200).json(new ApiResponse(200, quizzes, "User quizzes"));
});

const getQuiz = asyncHandler(async (req, res) => {
    // get quiz by id
    // return response

    const { id } = req.body;

    if (!id) {
        return res
            .status(400)
            .json(new ApiResponse(400, {}, "Quiz id is required"));
    }

    const quiz = await Quiz.findById(req.body.id);

    if (!quiz) {
        res.status(404).json(new ApiResponse(404, {}, "Quiz not found"));
    }

    const result = await Result.find({ quiz: quiz._id, student: req.user._id });

    if (result.length > 0) {
        const quizQuestion = await Question.aggregate([
            {
                $match: { quiz: quiz._id },
            },
            {
                $project: {
                    id: 1,
                    question: 1,
                    option: 1,
                    answer: 1,
                },
            },
        ]);

        const result = await Result.findOne({
            quiz: quiz._id,
            student: req.user._id,
        });

        for (let i in quizQuestion) {
            for (let j in result.question) {
                if (
                    quizQuestion[i]._id.toString() ===
                    result.question[j].toString()
                ) {
                    quizQuestion[i].userAnswer = result.userAns[j];
                }
            }
        }

        const owner = await User.findById(quiz.owner).select("userName");

        let completeResponse = {
            quizQuestion: quizQuestion,
            score: result.mark,
            owner,
            title: quiz.title,
        };

        return res
            .status(200)
            .json(
                new ApiResponse(
                    200,
                    completeResponse,
                    "User already given this quiz"
                )
            );
    } else {
        const quizQuestion = await Question.aggregate([
            {
                $match: { quiz: quiz._id },
            },
            {
                $project: {
                    question: 1,
                    option: 1,
                },
            },
        ]);

        const owner = await User.findById(quiz.owner).select("userName");

        let completeResponse = {
            quizQuestion: quizQuestion,
            score: result.mark,
            owner,
            title: quiz.title,
        };

        return res
            .status(200)
            .json(
                new ApiResponse(
                    200,
                    completeResponse,
                    "User has not given this quiz yet"
                )
            );
    }
});

const getPastQuiz = asyncHandler(async (req, res) => {
    // get all quizzes given by user
    // return response

    const quiz = await User.aggregate([
        {
            $match: { _id: req.user._id },
        },
        {
            $lookup: {
                from: "results",
                localField: "_id",
                foreignField: "student",
                as: "result",
            },
        },
        {
            $unwind: "$result",
        },
        {
            $lookup: {
                from: "quizzes",
                localField: "result.quiz",
                foreignField: "_id",
                as: "quiz",
                pipeline: [
                    {
                        $project: {
                            id: 1,
                            title: 1,
                        },
                    },
                ],
            },
        },
        {
            $unwind: "$quiz",
        },
        {
            $project: {
                quiz: 1,
                mark: "$result.mark",
                createdAt: 1,
            },
        },
    ]);

    return res.status(200).json(new ApiResponse(200, quiz, "Past quiz"));
});

export { createQuiz, getUserQuiz, getQuiz, getPastQuiz };
