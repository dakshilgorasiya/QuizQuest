import mongoose from "mongoose";

const resultSchema = new mongoose.Schema(
    {
        student: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
        },
        quiz: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Quiz",
        },
        mark: {
            type: Number,
            required: true,
        },
        userAns: [
            {
                type: Number,
            },
        ],
        question: [
            {
                type: mongoose.Schema.Types.ObjectId,
                ref: "Question",
            },
        ],
    },
    { timestamps: true }
);

export const Result = mongoose.model("Result", resultSchema);
