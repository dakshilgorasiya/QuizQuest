import React, { useEffect, useState } from "react";
import { InputQuestion, Input, Button } from "../../components";
import { SERVER, FRONTENDURL } from "../../constants";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import Cookie from "js-cookie";

function CreateQuiz() {
  const accessToken = useSelector((state) => state?.user?.accessToken);

  const navigate = useNavigate();

  const [id, setId] = useState("");

  const [title, setTitle] = useState("");

  const [numberOfQuestions, setNumberOfQuestions] = useState(0);

  const [questions, setQuestions] = useState([]);

  const [options, setOptions] = useState([]);

  const [answer, setAnswer] = useState([]);

  const [error, setError] = useState("");

  const [loading, setLoading] = useState(false);

  const [status, setStatus] = useState(false);

  useEffect(() => {
    if (!accessToken) {
      if (localStorage.getItem("url")) {
        localStorage.removeItem("url");
      }
      localStorage.setItem("url", "/create-quiz");
      alert("Kindly login to create quiz");
      navigate("/login");
    }
  }, [accessToken]);

  const handleNumberOfQuestionsChange = (e) => {
    setNumberOfQuestions(e.target.value);
    let tempQuestions = [];
    let tempOptions = [];
    let tempAnswer = [];
    for (let i = 0; i < e.target.value; i++) {
      tempQuestions.push("");
      tempOptions.push(["", "", "", ""]);
      tempAnswer.push(null);
    }
    setQuestions(tempQuestions);
    setOptions(tempOptions);
    setAnswer(tempAnswer);
  };

  const handleQuestionChange = (e, index) => {
    let temp = [...questions];
    temp[index] = e.target.value;
    setQuestions(temp);
  };

  const handleOptionChange = (e, index, optionIndex) => {
    let temp = [...options];
    temp[index][optionIndex] = e.target.value;
    setOptions(temp);
  };

  const handleAnswerChange = (e, index) => {
    let temp = [...answer];
    temp[index] = e.target.value;
    setAnswer(temp);
  };

  const handleSubmit = (e) => {
    setId("");
    e.preventDefault();
    setError("");
    setStatus(false);

    if (!title) {
      setError("Title is required");
      return;
    }

    for (let i = 0; i < numberOfQuestions; i++) {
      if (!questions[i]) {
        setError(`Question ${i + 1} is required`);
        return;
      }

      for (let j = 0; j < 4; j++) {
        if (!options[i][j]) {
          setError(`Option ${j + 1} of question ${i + 1} is required`);
          return;
        }
      }

      if (answer[i] === null) {
        setError(`Answer of question ${i + 1} is required`);
        return;
      }
    }

    const questionsData = questions.map((question, index) => {
      return {
        question,
        option: options[index],
      };
    });

    const answerData = answer.map((ans) => parseInt(ans));

    console.log(answerData);

    fetch(`${SERVER}/quiz/create`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json", // Set the content type to JSON
        Authorization: `Bearer ${accessToken}`,
      },

      body: JSON.stringify({
        title,
        questions: questionsData,
        correctAnswers: answerData,
      }),
    })
      .then((res) => res.json())
      .then((res) => {
        if (res.statusCode === 201) {
          setLoading(false);
          setStatus(true);
          setId(res.data._id);
        } else {
          setLoading(false);
          setError(res.message);
        }
      })
      .catch((err) => {
        setLoading(false);
        console.log(err);
      });
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(`http://localhost:5173/quiz/${id}`);
  };

  if (status) {
    return (
      <div className="flex">
        <div className="w-full m-5 bg-green-200 shadow-lg rounded-xl p-2">
          <p align="center">Quiz created successfully</p>

          <div className="flex">
            <div className="w-full bg-white rounded-xl flex flex-col m-5 p-2">
              <div className="w-full p-1">Share link</div>
              <div className="flex flex-row  border-solid border-2 border-blue-300 rounded-xl">
                <div className="w-full shadow">
                  <input
                    type="text"
                    className="w-full shadow-lg rounded-xl p-2"
                    disabled
                    value={`${FRONTENDURL}/quiz/${id}`}
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
        </div>
      </div>
    );
  }

  return (
    <div className="w-full flex flex-col bg-blue-300">
      <div className="shadow-lg bg-white rounded-xl mt-5 mx-5 pt-3">
        <div className="flex flex-col justify-center items-center p-3">
          <Input
            label="Quiz Title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeHolder="Enter quiz title"
          />
        </div>
      </div>
      <div className="shadow-lg bg-white rounded-xl mx-5 mt-5 pt-3">
        <div className="flex flex-col justify-center items-center p-3">
          <Input
            label="Number of Questions"
            value={numberOfQuestions}
            onChange={handleNumberOfQuestionsChange}
            placeHolder="Enter number of questions"
            type="number"
          />
        </div>
      </div>
      <div className="mt-5 mx-5 pt-3">
        <div className="flex flex-col justify-center">
          {questions.map((question, index) => (
            <InputQuestion
              key={index}
              serialNo={index + 1}
              questionValue={questions[index]}
              optionValue={options[index]}
              answerValue={answer[index]}
              onChangeQuestion={(e) => handleQuestionChange(e, index)}
              onChangeOptionA={(e) => handleOptionChange(e, index, 0)}
              onChangeOptionB={(e) => handleOptionChange(e, index, 1)}
              onChangeOptionC={(e) => handleOptionChange(e, index, 2)}
              onChangeOptionD={(e) => handleOptionChange(e, index, 3)}
              onChangeAnswer={(e) => handleAnswerChange(e, index)}
              className="bg-white pt-5 mb-5"
            />
          ))}
        </div>
      </div>
      {error && numberOfQuestions && (
        <div className="shadow-lg bg-red-100 rounded-xl mx-5">
          <div className="flex flex-col justify-center items-center p-2">
            <p className="text-lg">{error}</p>
          </div>
        </div>
      )}
      {numberOfQuestions > 0 && !loading && (
        <div className="flex flex-col justify-center items-center mb-5 mt-0">
          <Button
            className="w-auto mt-4 p-2 hover:shadow-xl hover:bg-gray-100"
            bgColor="bg-white"
            textColor="text-black"
            onClick={handleSubmit}
          >
            Create Quiz
          </Button>
        </div>
      )}
      {loading && numberOfQuestions > 0 && (
        <div className="shadow-lg bg-white rounded-xl mx-5 mb-5">
          <div className="flex flex-col justify-center items-center p-2">
            <p>Loading...</p>
          </div>
        </div>
      )}
    </div>
  );
}

export default CreateQuiz;
