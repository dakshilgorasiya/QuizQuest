import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";

const app = express();

app.use(
  cors({
    origin: process.env.CORS_ORIGIN,
    credentials: true,
  })
);

app.use(
  express.json({
    limit: "16kb",
  })
);

app.use(
  express.urlencoded({
    extended: true,
    limit: "16kb",
  })
);

app.use(express.static("public"));

app.use(cookieParser());

import userRouter from "./routes/user.routes.js";
import quizRouter from "./routes/quiz.routes.js";
import questionRouter from "./routes/question.routes.js";
import resultRouter from "./routes/result.routes.js";

app.use("/api/v1/user", userRouter);

app.use("/api/v1/quiz", quizRouter);

app.use("/api/v1/question", questionRouter);

app.use("/api/v1/result", resultRouter);

app.use("/test", (req, res) => {
  res.send("Test route");
});

export { app };
