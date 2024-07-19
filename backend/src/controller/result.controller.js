import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { Quiz } from "../models/quiz.model.js";
import { Result } from "../models/result.model.js";
import { Question } from "../models/question.model.js";

const submitQuiz = asyncHandler(async (req, res) => {
    // get quiz by id
    // get answers from request
    // get correct answers
    // calculate score
    // return response

    try {
        const quiz = await Quiz.findById(req.body.id);

        if (!quiz) {
            return res
                .status(404)
                .json(new ApiResponse(404, {}, "Quiz not found"));
        }

        const isAlreadySubmitted = await Result.findOne({
            student: req.user._id,
            quiz: quiz._id,
        });

        if (isAlreadySubmitted) {
            return res
                .status(400)
                .json(
                    new ApiResponse(400, {}, "You already submitted this quiz")
                );
        }

        const { answers, questionId } = req.body;

        if (!answers || !questionId) {
            return res
                .status(400)
                .json(
                    new ApiResponse(
                        400,
                        {},
                        "Answers and questionId is required"
                    )
                );
        }

        let score = 0;

        for (let i in questionId) {
            const question = await Question.findById(questionId[i]);
            if (question.answer === answers[i]) {
                score++;
            }
        }

        const result = await Result.create({
            student: req.user._id,
            quiz: quiz._id,
            mark: score,
            userAns: answers,
            question: questionId,
        });

        return res
            .status(200)
            .json(new ApiResponse(200, result, `Your score is ${score}`));
    } catch (error) {
        console.log(error);
    }
});

const getResultOfAllStudent = asyncHandler(async (req, res) => {
    const quiz = await Quiz.findById(req.body.id);

    if (!quiz) {
        return res.status(404).json(new ApiResponse(404, {}, "Quiz not found"));
    }

    if (quiz.owner.toString() !== req.user._id.toString()) {
        return res
            .status(403)
            .json(new ApiResponse(403, {}, "You are not owner of this quiz"));
    }

    const result = await Result.aggregate([
        {
            $match: {
                quiz: quiz._id,
            },
        },
        {
            $lookup: {
                from: "users",
                localField: "student",
                foreignField: "_id",
                as: "student",
                pipeline: [
                    {
                        $project: {
                            userName: 1,
                            email: 1,
                        },
                    },
                ],
            },
        },
        {
            $unwind: "$student",
        },
    ]);

    const correctAnswer = await Question.aggregate([
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

    const totalStudent = result.length;

    const completeResponse = {
        totalStudent,
        result,
        correctAnswer,
    };

    return res
        .status(200)
        .json(new ApiResponse(200, completeResponse, "Result"));
});

export { submitQuiz, getResultOfAllStudent };
