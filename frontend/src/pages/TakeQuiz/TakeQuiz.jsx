import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Input, Button } from "../../components";
import { useSelector } from "react-redux";
import Cookie from "js-cookie";

export default function TakeQuiz() {
    const [url, setUrl] = useState("");

    const accessToken = useSelector((state) => state?.user?.accessToken);

    const handleChangeUrl = (e) => {
        setUrl(e.target.value);
    };

    const navigate = useNavigate();

    const handleStartQuiz = () => {
        const id = url.split("/").pop();

        navigate(`/quiz/${id}`);
    };

    useEffect(() => {
        if (!accessToken) {
            if (localStorage.getItem("url")) {
                localStorage.removeItem("url");
            }
            localStorage.setItem("url", "/take-quiz");
            alert("Kindly login to give quiz");
            navigate("/login");
        }
    }, []);

    return (
        <div className="w-full box-border flex flex-col bg-blue-300">
            <div className="flex justify-between bg-white box-border m-4 p-2 rounded-xl flex-col">
                <div className="m-2">
                    <Input
                        label="Enter Url"
                        placeHolder="http://localhost:5173/quiz/666ac5695a3a07b61f878cc8"
                        value={url}
                        onChange={handleChangeUrl}
                    />
                </div>
                <div className="flex items-center justify-center">
                    <Button className="p-1" onClick={handleStartQuiz}>
                        Start Quiz
                    </Button>
                </div>
            </div>
        </div>
    );
}
