import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import User from "../models/User.js";

export const register = async (req, res) => {
    try {
        const {
            firstName,
            lastName,
            email,
            password,
            picturePath,
            friends,
            location,
            occupation,
        } = req.body; //getting the vairbales from frontend

        const salt = await bcrypt.genSalt(10);
        const passwordHash = await bcrypt.hash(password, salt);

        const newUser = new User( //populating the new user data 
            {
                firstName,
                lastName,
                email,
                password: passwordHash,
                picturePath,
                friends,
                location,
                occupation,
                viewdProfile: Math.floor(Math.random() * 100),
                impressions: Math.floor(Math.random() * 100),
            });
        var savedUser = await newUser.save(); //save the new user
        savedUser = savedUser.toJSON();
        delete savedUser.password;
        console.log(savedUser);
        res.status(201).json(savedUser);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

// login
export const login = async (req, res) => {
    try {
        const { email, password } = req.body;
        console.log(email);
        const user = await User.findOne({ email: email })
        if (!user) return res.status(400).json({ msg: "User does not exist. " });
      
        const match = await bcrypt.compare(password, user.password);
        if (!match) return res.status(400).json({ message: "Password does not match" });
        const token = jwt.sign({ id: user._id }, process.env.JWT_secret_key);
        delete user.password;
        res.status(200).json({token, user});
    }
    catch (error) {
        res.status(500).json({ error: error.message })
    }
} 
