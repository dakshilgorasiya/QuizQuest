import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { User } from "../models/user.model.js";

const generateAccessAndRefreshToken = async (userId) => {
    try {
        const user = await User.findById(userId);
        const accessToken = await user.generateAccessToken();
        const refreshToken = await user.generateRefreshToken();

        user.refreshToken = refreshToken;
        await user.save({
            validateBeforeSave: false,
        });

        return { accessToken, refreshToken };
    } catch (error) {
        throw new ApiError(500, "Token generation failed", error);
    }
};

const registerUser = asyncHandler(async (req, res) => {
    // get user details from frontend
    // validation - not empty
    // check if user already exists: username, email
    // create user object - create entry in db
    // remove password and refreshtoken field from response
    // check for user creation
    // return response

    const { userName, email, password } = req.body;

    if (!userName || !email || !password) {
        return res
            .status(400)
            .json(new ApiResponse(400, {}, "All fields are required"));
    }

    const existedUserName = await User.findOne({
        userName: userName.toLowerCase(),
    });

    if (existedUserName) {
        return res
            .status(400)
            .json(new ApiResponse(400, {}, "Username already exists"));
    }

    const existedEmail = await User.findOne({ email: email.toLowerCase() });

    if (existedEmail) {
        return res
            .status(400)
            .json(new ApiResponse(400, {}, "Email already exists"));
    }

    const user = await User.create({
        userName: userName.toLowerCase(),
        email: email.toLowerCase(),
        password,
    });

    const createdUser = await User.findById(user._id).select(
        "-password -refreshToken"
    );

    if (!createdUser) {
        return res
            .status(500)
            .json(new ApiResponse(500, {}, "User creation failed"));
    }

    return res
        .status(200)
        .json(new ApiResponse(200, createdUser, "User created successfully"));
});

const loginUser = asyncHandler(async (req, res) => {
    // get user details from frontend
    // validation - not empty
    // find the user
    // password check
    // give new access and refresh token
    // send cookie

    const { email, password } = req.body;

    if (!email || !password) {
        return res
            .status(400)
            .json(new ApiResponse(400, {}, "All fields are required"));
    }

    const user = await User.findOne({ email });

    if (!user) {
        return res.status(404).json(new ApiResponse(404, {}, "User not found"));
    }

    const isPasswordValid = await user.isPasswordCorrect(password);

    if (!isPasswordValid) {
        return res
            .status(401)
            .json(new ApiResponse(401, {}, "Invalid password"));
    }

    const { accessToken, refreshToken } = await generateAccessAndRefreshToken(
        user._id
    );

    user.refreshToken = refreshToken;

    await user.save({
        validateBeforeSave: false,
    });

    const loggedInUser = await User.findById(user._id).select(
        "-password -refreshToken"
    );

    const option = {
        httpOnly: true,
        secure: true,
    }

    return res
        .status(200)
        .cookie("accessToken", accessToken, option)
        .cookie("refreshToken", refreshToken, option)
        .json(
            new ApiResponse(
                200,
                {
                    user: loggedInUser,
                    accessToken,
                    refreshToken,
                },
                "User logged in successfully"
            )
        );
});

const logoutUser = asyncHandler(async (req, res) => {
    // get user from request
    // remove refresh token from database
    // clear cookies

    await User.findByIdAndUpdate(
        req.user._id,
        {
            $unset: {
                refreshToken: 1,
            },
        },
        {
            new: true,
        }
    );

    const option = {
        httpOnly: true,
        secure: true,
    }

    return res
        .status(200)
        .clearCookie("accessToken", option)
        .clearCookie("refreshToken", option)
        .json(new ApiResponse(200, {}, "User logged out successfully"));
});

const getCurrentUser = asyncHandler(async (req, res) => {
    return res.status(200).json(
        new ApiResponse(
            200,
            {
                user: req.user,
            },
            "User details fetched successfully"
        )
    );
});

export { registerUser, loginUser, logoutUser, getCurrentUser };
