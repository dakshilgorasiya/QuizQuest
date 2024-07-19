import mongoose from "mongoose";

const questionSchema = new mongoose.Schema(
    {
        question: {
            type: String,
            required: true,
            trim: true,
        },
        option: [
            {
                type: String,
                trim: true,
            },
        ],
        answer: {
            type: Number,
            required: true,
        },
        quiz: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Quiz",
        },
    },
    { timestamps: true }
);

export const Question = mongoose.model("Question", questionSchema);
