import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

import UserModel from "../models/userModel";

export const signup = async (req, res) => {
    const { email, password, firstName, lastName } = req.body;
    try {
        const existUser = await UserModel.findOne({ email });
        if(existUser) {
            return res.status(400).json({ message: "User already exists" });
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
        }, process.env.SECRET_JWT, { expiresIn: "1h" });
        res.status(201).json({ newUser, token });
    } catch (err) {
        res.status(500).json({ message: "Something went wrong" });
        console.log(err);
    }
};