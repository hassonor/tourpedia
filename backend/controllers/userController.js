import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

import UserModel from "../models/userModel";

export const signUp = async (req, res) => {
    const {email, password, firstName, lastName} = req.body;
    try {
        const existUser = await UserModel.findOne({email});
        if (existUser) {
            return res.status(400).json({message: "User already exists"});
        }
        const hashedPassword = await bcrypt.hash(password, 12);
        const newUser = await UserModel.create({
            email,
            password: hashedPassword,
            name: `${firstName} ${lastName}`
        });
        const token = jwt.sign({
            email: newUser?.email,
            id: newUser?._id
        }, process.env.SECRET_JWT, {expiresIn: process.env.TOKEN_EXPIRES_IN_HOURS});
        res.status(201).json({result: newUser, token});
    } catch (err) {
        res.status(500).json({message: "Something went wrong"});
        console.log(err);
    }
};

export const signIn = async (req, res) => {
    const {email, password} = req.body;
    try {
        const signInUser = await UserModel.findOne({email});

        if (!signInUser) return res.status(400).json({message: "User doesn't exist"});

        const isPasswordCorrect = await bcrypt.compare(password, signInUser?.password);
        if (!isPasswordCorrect) return res.status(401).json({message: "Invalid credentials"});

        const token = jwt.sign({
            email: signInUser?.email,
            id: signInUser?._id
        }, process.env.SECRET_JWT, {expiresIn: process.env.TOKEN_EXPIRES_IN_HOURS});

        res.status(200).json({result: signInUser, token});
    } catch (err) {
        res.status(500).json({message: "Something went wrong"});
        console.log(err);
    }
};