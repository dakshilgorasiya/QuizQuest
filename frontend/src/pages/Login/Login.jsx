import React, { useState } from "react";
import { Input, Button } from "../../components";
import { useDispatch } from "react-redux";
import { login } from "../../store/reducer";
import { SERVER } from "../../constants";
import { useNavigate, Link } from "react-router-dom";
import Cookie from "js-cookie";

function Login() {
    const navigate = useNavigate();

    const [email, setEmail] = useState("");

    const [password, setPassword] = useState("");

    const [error, setError] = useState("");

    const [loading, setLoading] = useState(false);

    const handleEmailChange = (e) => {
        setEmail(e.target.value);
    };

    const handlePasswordChange = (e) => {
        setPassword(e.target.value);
    };

    const dispatch = useDispatch();

    const handleSubmit = (e) => {
        e.preventDefault();
        setError("");
        setLoading(true);

        if (!email) {
            setError("Email is required");
            setLoading(false);
            return;
        }

        if (!password) {
            setError("Password is required");
            setLoading(false);
            return;
        }

        fetch(`${SERVER}/user/login`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json", // Set the content type to JSON
            },

            body: JSON.stringify({ email, password }),
        })
            .then((res) => res.json())
            .then((res) => {
                if (res.statusCode === 200) {
                    setLoading(false);
                    dispatch(login(res.data));
                    Cookie.set("accessToken", res.data.accessToken, { expires: 1 });
                    Cookie.set("refreshToken", res.data.refreshToken, { expires: 7 });

                    const url = localStorage.getItem("url");

                    if (url) {
                        localStorage.removeItem("url");
                        navigate(url);
                        return;
                    }

                    navigate("/");
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

    return (
        <div className="w-full flex justify-center h-screen items-center bg-blue-500">
            <div className="flex flex-col items-center justify-center border-solid border-black bg-white border-2 w-[300px] py-14 px-4 rounded-2xl">
                <h1 className="text-3xl font-semibold mb-4">Login</h1>
                <Input
                    type="email"
                    label="Email"
                    placeholder="Enter your email"
                    className="mb-4"
                    value={email}
                    onChange={handleEmailChange}
                    disabled={loading}
                />
                <Input
                    type="password"
                    label="Password"
                    placeholder="Enter your password"
                    className="mb-4"
                    value={password}
                    onChange={handlePasswordChange}
                    disabled={loading}
                />
                {loading && <p>Loading...</p>}
                {!loading && (
                    <Button className="w-auto mt-8" onClick={handleSubmit}>
                        Login
                    </Button>
                )}
                <p className="text-red-500 block mt-5">{error}</p>
                <p>
                    Don't have an account?{" "}
                    <Link
                        to="/register"
                        className="text-blue-500 underline-offset-2 underline"
                    >
                        Register here
                    </Link>
                </p>
            </div>
        </div>
    );
}

export default Login;
