import mongoose from "mongoose";

const quizSchema = new mongoose.Schema(
    {
        owner: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
        },
        title: {
            type: String,
            required: true,
            trim: true,
        },
    },
    { timestamps: true }
);

export const Quiz = mongoose.model("Quiz", quizSchema);
