import React, { useEffect, useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { logout } from "../../store/reducer";
import Button from "../Button";
import { SERVER } from "../../constants";
import Cookie from "js-cookie";

export default function Header() {
    const [status, setStatus] = useState(
        Cookie.get("accessToken") ? true : false
    );

    const user = useSelector((state) => state.user);

    const dispatch = useDispatch();

    const accessToken = Cookie.get("accessToken");

    useEffect(() => {
        if (accessToken) {
            setStatus(true);
        } else {
            setStatus(false);
        }
    }, [user]);

    const handleLogout = (e) => {
        e.preventDefault();

        fetch(`${SERVER}/user/logout`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${accessToken}`,
            },
            body: JSON.stringify({ accessToken }),
        })
            .then((res) => res.json())
            .then((data) => {
                console.log(data);
                dispatch(logout());
                Cookie.remove("accessToken");
                Cookie.remove("refreshToken");
                setStatus(false);
            })
            .catch((err) => {
                console.log(err);
            });
    };

    return (
        <nav className="bg-white shadow-lg">
            <div className="container mx-auto px-4">
                <div className="flex flex-col justify-between items-center py-4">
                    <div className="flex flex-row justify-between w-full">
                        <div className="text-lg font-bold text-gray-700">
                            QuizQuest
                        </div>
                        <div className="">
                            {!status && (
                                <Link
                                    to="/login"
                                    className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600"
                                >
                                    Login
                                </Link>
                            )}
                            {status && (
                                <Button
                                    onClick={handleLogout}
                                    className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600"
                                >
                                    Logout
                                </Button>
                            )}
                        </div>
                    </div>
                    <div className="flex my-2 sm:block justify-center items-center sm:absolute">
                        <Link
                            to="/"
                            className="text-gray-700 hover:text-gray-900 mx-4"
                        >
                            Home
                        </Link>
                        <Link
                            to="/create-quiz"
                            className="text-gray-700 hover:text-gray-900 mx-4"
                        >
                            Create Quiz
                        </Link>
                        <Link
                            to="/take-quiz"
                            className="text-gray-700 hover:text-gray-900 mx-4"
                        >
                            Take Quiz
                        </Link>
                        <Link
                            to="/user-quiz"
                            className="text-gray-700 hover:text-gray-900 mx-4"
                        >
                            Results
                        </Link>
                        <Link
                            to="/past-quiz"
                            className="text-gray-700 hover:text-gray-900 mx-4"
                        >
                            History
                        </Link>
                    </div>
                </div>
            </div>
        </nav>
    );
}
