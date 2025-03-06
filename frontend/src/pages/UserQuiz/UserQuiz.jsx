import React, { useEffect, useState } from "react";
import { SERVER } from "../../constants";
import { useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import Cookie from "js-cookie";

export default function UserQuiz() {
  const accessToken = useSelector((state) => state?.user?.accessToken);

  const [loading, setLoading] = useState(true);

  const [error, setError] = useState("");

  const [quiz, setQuiz] = useState([]);

  const navigate = useNavigate();

  const handleClick = (id) => {
    navigate(`/show-result/:${id}`);
  };

  useEffect(() => {
    if (!accessToken) {
      if (localStorage.getItem("url")) {
        localStorage.removeItem("url");
      }
      localStorage.setItem("url", "/user-quiz");
      alert("Kindly login to view result");
      navigate("/login");
    }
  }, []);

  useEffect(() => {
    setError("");
    setLoading(true);

    fetch(`${SERVER}/quiz/getUserQuiz`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json", // Set the content type to JSON
        Authorization: `Bearer ${accessToken}`,
      },
    })
      .then((res) => res.json())
      .then((res) => {
        if (res.statusCode === 200) {
          setLoading(false);
          setQuiz(res.data);
        } else {
          setLoading(false);
          setError(res.message);
        }
      })
      .catch((err) => {
        setLoading(false);
        console.log(err);
      });
  }, []);

  if (loading) {
    return <h1>Loading...</h1>;
  }

  if (error) {
    return (
      <div className="shadow-lg bg-white rounded-xl m-5 p-3">
        <div className="flex flex-col justify-center items-center p-3">
          <h1>No quiz available</h1>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full flex flex-col bg-blue-300">
      <div className="shadow-l rounded-xl mx-5 m-5 p-3">
        <div className="p-3">
          {quiz.length > 0 ? (
            quiz.map((q, index) => {
              return (
                <Link to={`/show-result/${q._id}`} key={q._id}>
                  <div
                    key={q._id}
                    className="flex flex-row justify-between w-full p-3 shadow-lg rounded-xl bg-white m-3 hover:bg-gray-200 hover:shadow-xl"
                  >
                    <h1 className="text-lg">Title : {q.title}</h1>
                    <h2 className="text-lg">
                      Created At : {new Date(q.createdAt).toLocaleString()}
                    </h2>
                  </div>
                </Link>
              );
            })
          ) : (
            <div className="shadow-lg bg-white rounded-xl m-5 p-3">
              <div className="flex flex-col justify-center items-center p-3">
                <h1>No quiz available</h1>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
