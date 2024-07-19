import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import "./index.css";
import {
    Login,
    Register,
    GetQuiz,
    CreateQuiz,
    ShowResult,
    UserQuiz,
    PastQuiz,
    TakeQuiz,
} from "./pages";
import Layout from "./Layout.jsx";
import { Provider } from "react-redux";
import { store } from "./store/store.js";

const router = createBrowserRouter([
    {
        path: "/",
        element: <Layout />,
        children: [
            {
                path: "",
                element: <App />,
            },
            {
                path: "login",
                element: <Login />,
            },
            {
                path: "register",
                element: <Register />,
            },
            {
                path: "quiz/:id",
                element: <GetQuiz />,
            },
            {
                path: "create-quiz",
                element: <CreateQuiz />,
            },
            {
                path: "show-result/:id",
                element: <ShowResult />,
            },
            {
                path: "user-quiz",
                element: <UserQuiz />,
            },
            {
                path: "past-quiz",
                element: <PastQuiz />,
            },
            {
                path: "take-quiz",
                element: <TakeQuiz />,
            },
        ],
    },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
    <React.StrictMode>
        <Provider store={store}>
            <RouterProvider router={router} />
        </Provider>
    </React.StrictMode>
);
