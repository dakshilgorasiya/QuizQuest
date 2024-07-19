import React from "react";
import { Input } from "../components";

function InputQuestion({
    questionValue,
    onChangeQuestion,
    optionValue,
    onChangeOptionA,
    onChangeOptionB,
    onChangeOptionC,
    onChangeOptionD,
    onChangeAnswer,
    className = "",
    serialNo,
}) {
    return (
        <div
            className={`flex flex-col shadow-lg rounded-2xl ${className}`}
        >
            <div className="w-full flex">
                <div className="mt-1 w-2 m-3">
                    <h1 className="inline">{serialNo}.</h1>
                </div>
                <div className="w-full mr-2">
                    <Input
                        onChange={onChangeQuestion}
                        value={questionValue}
                        placeHolder="Enter question"
                    />
                </div>
            </div>
            <div className="flex flex-col p-2 ml-7 mr-1">
                <div className="w-full flex m-1">
                    <div className="mt-1 w-3 mr-3">
                        <Input
                            type="radio"
                            name={serialNo}
                            value={0}
                            onChange={onChangeAnswer}
                            className="focus:ring-0"
                        />
                    </div>
                    <div className="w-full">
                        <Input
                            onChange={onChangeOptionA}
                            value={optionValue[0]}
                            placeHolder="Option A"
                            className=""
                        />
                    </div>
                </div>
                <div className="w-full flex m-1">
                    <div className="mt-1 w-3 mr-3">
                        <Input
                            type="radio"
                            name={serialNo}
                            value={1}
                            onChange={onChangeAnswer}
                            className="focus:ring-0"
                        />
                    </div>
                    <div className="w-full">
                        <Input
                            onChange={onChangeOptionB}
                            value={optionValue[1]}
                            placeHolder="Option B"
                            className=""
                        />
                    </div>
                </div>
                <div className="w-full flex m-1">
                    <div className="mt-1 w-3 mr-3">
                        <Input
                            type="radio"
                            name={serialNo}
                            value={2}
                            onChange={onChangeAnswer}
                            className="focus:ring-0"
                        />
                    </div>
                    <div className="w-full">
                        <Input
                            onChange={onChangeOptionC}
                            value={optionValue[2]}
                            placeHolder="Option C"
                            className=""
                        />
                    </div>
                </div>
                <div className="w-full flex m-1">
                    <div className="mt-1 w-3 mr-3">
                        <Input
                            type="radio"
                            name={serialNo}
                            value={3}
                            onChange={onChangeAnswer}
                            className="focus:ring-0"
                        />
                    </div>
                    <div className="w-full">
                        <Input
                            onChange={onChangeOptionD}
                            value={optionValue[3]}
                            placeHolder="Option D"
                            className=""
                        />
                    </div>
                </div>
            </div>
        </div>
    );
}

export default InputQuestion;
