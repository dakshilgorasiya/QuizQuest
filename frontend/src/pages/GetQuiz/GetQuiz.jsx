import React, { useState, useEffect } from "react";
import { Button, Question } from "../../components";
import { useParams } from "react-router-dom";
import { SERVER } from "../../constants";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import Cookie from "js-cookie";

function GetQuiz() {
    const id = useParams().id;

    const navigate = useNavigate();

    const [quiz, setQuiz] = useState([]);

    const [title, setTitle] = useState("");

    const [owner, setOwner] = useState("");

    const [score, setScore] = useState(null);

    const accessToken = Cookie.get("accessToken");

    const [answers, setAnswers] = useState(null);

    const [error, setError] = useState("");

    const handleAnswerChange = (e) => {
        const { name, value } = e.target;
        const newAnswers = [...answers];
        const index = newAnswers.findIndex((ans) => ans.id === name);
        newAnswers[index].answer = value;
        setAnswers(newAnswers);
    };

    useEffect(() => {
        if (!accessToken) {
            if (localStorage.getItem("url")) {
                localStorage.removeItem("url");
            }
            localStorage.setItem("url", `/quiz/${id}`);
            alert("Kindly login to view quiz");
            navigate("/login");
        }
    }, []);

    const handleSubmit = () => {
        console.log(answers);

        setError("");

        const answer = answers.map((ans) => parseInt(ans.answer));

        const questionId = answers.map((ans) => ans.id);

        if (answer.includes(null)) {
            setError("Please answer all the questions");
            return;
        }

        if (answer.length !== quiz.length) {
            setError("Please answer all the questions");
            return;
        }

        if (questionId.length !== quiz.length) {
            setError("Some error occured please try again later");
            return;
        }

        fetch(`${SERVER}/result/submit`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${accessToken}`,
            },
            body: JSON.stringify({
                id,
                answers: answer,
                questionId,
            }),
        })
            .then((res) => res.json())
            .then((res) => {
                console.log(res);
                if (res.statusCode === 200) {
                    setScore(res.data.score);
                } else {
                    setError(res.message);
                }
            })
            .catch((err) => {
                console.log(err);
            });
    };

    useEffect(() => {
        fetch(`${SERVER}/quiz/find`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${accessToken}`,
            },
            body: JSON.stringify({ id }),
        })
            .then((res) => res.json())
            .then((res) => {
                if (res.statusCode === 200) {
                    setQuiz(res?.data?.quizQuestion);
                    setTitle(res?.data?.title);
                    setOwner(res?.data?.owner?.userName);
                    setScore(res?.data?.score || null);
                    if (!answers) {
                        setAnswers(
                            res?.data?.quizQuestion.map((question) => ({
                                id: question._id,
                                answer: null,
                            }))
                        );
                    }
                } else {
                    setError(res.message);
                }
            })
            .catch((err) => {
                console.log(err);
            });
    }, [handleSubmit]);

    return (
        <div className="w-full box-border flex flex-col bg-blue-300">
            <div className="flex justify-between bg-white box-border m-4 p-2 rounded-xl">
                <div className="w-auto pl-2 text-2xl">Title: {title}</div>
                <div className="w-auto pr-2 text-lg">created by {owner}</div>
            </div>
            {score !== null && (
                <div className="flex justify-center bg-red-200 box-border m-4 mt-0 p-2 rounded-xl">
                    <h3>You have already given this quiz |&nbsp;</h3>
                    <h3>Score: {score}</h3>
                </div>
            )}
            {quiz &&
                quiz?.map((question, index) => (
                    <Question
                        key={index}
                        question={question.question}
                        serialNo={index + 1}
                        option={question.option}
                        answer={question.answer}
                        userAnswer={question?.userAnswer}
                        onChange={handleAnswerChange}
                        className="bg-white"
                        id={question._id}
                    />
                ))}

            {error && (
                <div className="flex justify-center bg-white box-border m-4 p-2 rounded-xl">
                    <p className="text-red-500 text-lg">{error}</p>
                </div>
            )}

            {score === null && (
                <div className="flex w-full justify-center">
                    <Button
                        className="m-4 w-[100px]"
                        bgColor="bg-white"
                        textColor="text-black"
                        onClick={handleSubmit}
                    >
                        Submit
                    </Button>
                </div>
            )}
        </div>
    );
}

export default GetQuiz;
