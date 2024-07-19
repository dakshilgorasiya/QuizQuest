import React, { useState } from "react";
import { Input, Button } from "../../components";
import { SERVER } from "../../constants";
import { useNavigate, Link } from "react-router-dom";

function Register() {
    const navigate = useNavigate();

    const [email, setEmail] = useState("");

    const [userName, setUserName] = useState("");

    const [password, setPassword] = useState("");

    const [loading, setLoading] = useState(false);

    const [error, setError] = useState("");

    const [success, setSuccess] = useState(false);

    const handleEmailChange = (e) => {
        setEmail(e.target.value);
    };

    const handleUserNameChange = (e) => {
        setUserName(e.target.value);
    };

    const handlePasswordChange = (e) => {
        setPassword(e.target.value);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        setError("");
        setLoading(true);

        if (!email) {
            setError("Email is required");
            setLoading(false);
            return;
        }

        if (!userName) {
            setError("Username is required");
            setLoading(false);
            return;
        }

        if (!password) {
            setError("Password is required");
            setLoading(false);
            return;
        }

        fetch(`${SERVER}/user/register`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json", // Set the content type to JSON
            },
            body: JSON.stringify({ email, userName, password }),
        })
            .then((res) => res.json())
            .then((data) => {
                if (data.statusCode === 200) {
                    setLoading(false);
                    setSuccess(true);
                } else {
                    setLoading(false);
                    setError(data.message);
                }
            })
            .catch((err) => {
                setLoading(false);
                setError("An error occurred. Please try again.");
            });
    };

    return (
        <div className="w-full flex justify-center h-screen items-center bg-blue-500">
            <div className="flex flex-col items-center justify-center border-solid border-black bg-white border-2 w-[400px] py-14 px-4 rounded-2xl">
                <h1 className="text-3xl font-semibold mb-4">Register</h1>
                <Input
                    type="text"
                    label="Username"
                    placeholder="Enter your username"
                    className="mb-4"
                    value={userName}
                    onChange={handleUserNameChange}
                    disabled={loading}
                />
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
                        Register
                    </Button>
                )}
                <p className="text-red-500 block mt-5">{error}</p>
                {success && (
                    <p>
                        Registered successfull{" "}
                        <Link to="/login" className="text-blue-500 underline-offset-2 underline">Click here to login</Link>
                    </p>
                )}
                {
                    !success && (
                        <p>
                            Already have an account?{" "}
                            <Link to="/login" className="text-blue-500 underline-offset-2 underline">Login here</Link>
                        </p>
                    )
                }
            </div>
        </div>
    );
}

export default Register;
