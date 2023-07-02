import mongoose from "mongoose";
import User from "../models/User.js";
import jwt from "jsonwebtoken"

export const getUser = async (req, res) => {
    try {
        const user = await User.findById(req.params.id);
        res.status(200).json(user);
    console.log("kirekhar aesfalsdfj")
    }
    catch (error) {
        res.status(404).json({ message: error.message });
    }
}

export const getUserFriends = async (req, res) => {
    try {
       console.log("kirekhar")
        const {id} = req.params;
        const user = await User.findById(id);
        const friends = await Promise.all(
            user.friends.map((id) => { User.findById(id) })
        );// mige inja chonke chanbar database ro call mikonim az promise estefade mikonim
        const formatter = friends.map(({ _id, firstName, lastName, occupation, location, picturePath }) => { return { _id, firstName, lastName, occupation, location, picturePath } });
        res.status(200).json(formatter);
    }
    catch (error) { res.status(404).json({ message: error.message }) }
}

export const addRemoveFriend = async (req, res) => {
    try {
        const { id, friendId } = req.params;
        const user = user.findById(id);
        const friend = user.findById(friendId);
        if (user.friends.includes(friendId)) {
            user.friends.filter((id) => { id !== friendId; });
        }
        else {
            user.friends.push(friendId);
            friend.friends.push(id);
        }
        user.save();
        friend.save();
        const friends = Promise.all(
            user.friends.map((id)=>{User.findById(id)})
        )
        const formatter = user.map(({ _id, firstName, lastName, occupation, location, picturePath }) => { return { _id, firstName, lastName, occupation, location, picturePath } });
        res.status(200).json(formatter);
    }
    catch (err) {
        res.status(404).res({ message: err.message });
    }
}

