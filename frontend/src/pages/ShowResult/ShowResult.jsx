import React, { useEffect, useState } from "react";
import { SERVER } from "../../constants";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { Question } from "../../components";
import { useNavigate } from "react-router-dom";
import Cookie from "js-cookie";

function ShowResult() {
    const id = useParams().id;

    const navigate = useNavigate();

    const accessToken = Cookie.get("accessToken");

    const [totalStudent, setTotalStudent] = useState(0);

    const [result, setResult] = useState();

    const [question, setQuestion] = useState();

    const [error, setError] = useState("");

    useEffect(() => {
        if (!accessToken) {
            if (localStorage.getItem("url")) {
                localStorage.removeItem("url");
            }
            localStorage.setItem("url", `/show-result/${id}`);
            alert("Kindly login to view result");
            navigate("/login");
        }
    }, []);

    useEffect(() => {
        setError("");
        fetch(`${SERVER}/result/all`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${accessToken}`,
            },
            body: JSON.stringify({
                id,
            }),
        })
            .then((res) => res.json())
            .then((res) => {
                if (res.statusCode === 403) {
                    setError("You are not authorized to view this page");
                    return;
                }
                if (res.statusCode === 401) {
                    setError("You are not logged in");
                    return;
                }
                setTotalStudent(res?.data?.totalStudent);
                setResult(res?.data?.result);
                setQuestion(res?.data?.correctAnswer);
            })
            .catch((err) => {
                setError("Some error occured please try again later");
                console.log(err);
            });
    }, []);

    const handleCopy = () => {
        navigator.clipboard.writeText(`http://localhost:5173/quiz/${id}`);
    };

    if (error) {
        return (
            <div className="flex">
                <div className="w-full m-5 bg-red-200 shadow-lg rounded-xl p-2">
                    <p align="center">{error}</p>
                </div>
            </div>
        );
    }

    return (
        <div className="bg-blue-300">
            {error && (
                <div className="flex">
                    <div className="w-full m-5 bg-red-200 shadow-lg rounded-xl p-2">
                        <p align="center">{error}</p>
                    </div>
                </div>
            )}

            <div className="flex">
                <div className="w-full bg-white rounded-xl flex flex-col m-5 p-2">
                    <div className="w-full p-1">Share link</div>
                    <div className="flex flex-row  border-solid border-2 border-blue-300 rounded-xl">
                        <div className="w-full shadow">
                            <input
                                type="text"
                                className="w-full shadow-lg rounded-xl p-2"
                                disabled
                                value={`http://localhost:5173/quiz/${id}`}
                            />
                        </div>
                        <div>
                            <button
                                className="bg-blue-500 text-white px-4 py-2 rounded-xl hover:bg-blue-600"
                                onClick={handleCopy}
                            >
                                Copy
                            </button>
                        </div>
                    </div>
                </div>
            </div>

            <div className="w-full box-border flex flex-col">
                {question &&
                    question.map((question, index) => {
                        return (
                            <Question
                                key={index}
                                serialNo={index + 1}
                                question={question.question}
                                option={question.option}
                                answer={question.answer}
                                className="bg-white"
                            />
                        );
                    })}
            </div>

            <div className="flex">
                <div className="w-full m-5 bg-white shadow-lg rounded-xl p-2">
                    <p align="center">Total Student: {totalStudent}</p>
                </div>
            </div>

            <div className="flex">
                <div className="w-full m-5 bg-white shadow-lg rounded-xl p-2">
                    <table className="w-full">
                        <thead>
                            <tr>
                                <th className="w-10">Student</th>
                                <th>Score</th>
                                {question &&
                                    question.map((question, index) => {
                                        return (
                                            <th key={index}>
                                                {index + 1},({question.answer})
                                            </th>
                                        );
                                    })}
                            </tr>
                        </thead>
                        <tbody>
                            {result &&
                                result.map((student, index) => {
                                    return (
                                        <tr
                                            key={index}
                                            className={`${
                                                index % 2
                                                    ? "bg-white"
                                                    : "bg-gray-200"
                                            }`}
                                        >
                                            <td align="center">
                                                {student?.student?.userName}
                                            </td>
                                            <td align="center">
                                                {student?.mark}
                                            </td>
                                            {student?.userAns?.map(
                                                (ans, index) => {
                                                    return (
                                                        <td
                                                            align="center"
                                                            key={index}
                                                        >
                                                            {ans}
                                                        </td>
                                                    );
                                                }
                                            )}
                                        </tr>
                                    );
                                })}
                        </tbody>
                    </table>
                </div>
            </div>

            <div className="flex">
                <div className="w-full mx-5 mb-5 bg-white shadow-lg rounded-xl p-2">
                    <p align="center">NOTE: (x) : x indicate marks</p>
                </div>
            </div>
        </div>
    );
}

export default ShowResult;
