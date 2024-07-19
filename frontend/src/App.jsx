import "./App.css";
import React, { useState } from "react";

function App() {
    return (
        <>
            <div className="min-h-screen bg-gray-100">
                <header className="bg-blue-500 text-white py-20">
                    <div className="container mx-auto px-4 text-center">
                        <h1 className="text-4xl font-bold mb-4">
                            Welcome to Quiz App
                        </h1>
                        <p className="text-xl mb-8">
                            Create, take, and manage quizzes with ease
                        </p>
                        <a
                            href="#"
                            className="bg-white text-blue-500 px-6 py-3 rounded-md hover:bg-gray-200"
                        >
                            Get Started
                        </a>
                    </div>
                </header>

                <section className="container mx-auto px-4 py-16">
                    <h2 className="text-3xl font-bold text-gray-700 text-center mb-12">
                        Features
                    </h2>
                    <div className="flex flex-wrap justify-center">
                        <div className="w-full sm:w-1/2 lg:w-1/3 p-4">
                            <div className="bg-white shadow-lg rounded-lg p-6">
                                <h3 className="text-xl font-semibold text-gray-800 mb-4">
                                    Create Quizzes
                                </h3>
                                <p className="text-gray-600">
                                    Easily create quizzes with multiple choice
                                    questions, and set correct answers.
                                </p>
                            </div>
                        </div>
                        <div className="w-full sm:w-1/2 lg:w-1/3 p-4">
                            <div className="bg-white shadow-lg rounded-lg p-6">
                                <h3 className="text-xl font-semibold text-gray-800 mb-4">
                                    Take Quizzes
                                </h3>
                                <p className="text-gray-600">
                                    Students can take quizzes and get instant
                                    feedback on their performance.
                                </p>
                            </div>
                        </div>
                        <div className="w-full sm:w-1/2 lg:w-1/3 p-4">
                            <div className="bg-white shadow-lg rounded-lg p-6">
                                <h3 className="text-xl font-semibold text-gray-800 mb-4">
                                    View Results
                                </h3>
                                <p className="text-gray-600">
                                    Teachers can view detailed results and
                                    analytics of student performance.
                                </p>
                            </div>
                        </div>
                    </div>
                </section>
            </div>
        </>
    );
}

export default App;
