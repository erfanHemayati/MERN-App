import User from "../models/User.js";
import Post from "../models/Post.js";

export const createPost = async (req, res) => {
    try {
        const { userId, description, picturePath } = req.body
        const user = await User.findById(userId);
        const newPost = new Post({
            userId,
            firstName: user.firstName,
            lastName: user.lastName,
            location: user.location,
            description: description,
            userPicturePath: user.picturePath,
            picturePath,
            likes: {},
            comments: []
        })
        await newPost.save();
        const post = await Post.find(); //grabing all the posts
        res.status(201).json(post);//201 status code is for creating something

    } catch (err) {
        res.status(409).json({ message: err.message })//where there is a conflict
    }
}

export const getFeedPosts = async (req, res) => {
    try {
        const post = await Post.findById();//getting all the posts
        res.status(200).json(post);
    } catch (err) {
        res.status(404).json({ message: err.message })
    }
}

export const getUserPosts = async (req, res) => {
    try {
        const { pid } = req.params;
        const posts = Post.findById(pid) // nemidonam in chijori chanta post barmigardone, ya aslan yedone barmigardone
        res.status(200).json(posts)
    } catch (err) {
        res.status(404).json({ message: err.message })
    }
}

export const likeposts = async (req, res) => {
    try {
        const { pid } = req.params; //getting the post ID
       const {userId} = req.body; //getting the userId of whom is logged in 
      
        const post = await Post.findById(pid); //finding the post
       
        const isliked = post.likes.get(userId); //checking if the post was liked before
        console.log(isliked)

        if (isliked) {
            post.likes.delete(userId);
        }
        else {
            post.likes.set(userId, true);
        }
        const updatesPost = await Post.findByIdAndUpdate(pid, { likes: post.likes }, { new: true });//updating the front end by sending back json
        res.status(200).json(updatesPost);
    } catch (err) {
        res.status(404).json({ message: err.message })
    }

}