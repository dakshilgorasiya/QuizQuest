import React from "react";

function Question({
    question,
    serialNo,
    option,
    answer = null,
    userAnswer = null,
    onChange,
    className = "",
    id,
}) {
    return (
        <div
            className={`flex flex-col shadow-lg  p-1 rounded-2xl m-4 ${className}`}
        >
            <h1 className="text-lg font-semibold p-2 px-4">
                {serialNo}. {question}
            </h1>
            <div className="flex flex-col p-2">
                {option.map((opt, index) => (
                    <label
                        key={index}
                        className={`flex items-center space-x-2  p-1 px-2 ${
                            answer !== null && answer === index
                                ? "bg-green-100"
                                : ""
                        }
                        ${
                            userAnswer === null &&
                            answer !== null &&
                            answer === index
                                ? "bg-gray-500"
                                : ""
                        }
                        ${
                            userAnswer !== null &&
                            userAnswer === index &&
                            userAnswer !== answer
                                ? "bg-red-100"
                                : ""
                        }
                        
                        `}
                    >
                        <input
                            type="radio"
                            name={id}
                            value={index}
                            onChange={onChange}
                            disabled={answer !== null}
                        />
                        <span>{opt}</span>
                    </label>
                ))}
            </div>
        </div>
    );
}

export default Question;
