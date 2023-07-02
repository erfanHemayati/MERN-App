import mongoose from "mongoose"

const postSchema = new mongoose.Schema({

    userId: {//a refrence to the user who has posted the post 
        type: String,
        require: true,
    },

    firstName: {
        type: String,
        require: true,
    },

    lastName: {
        type: String,
        require: true,
    },

    location: {
        type: String,
    },

    description: {
        type: String,
    },
    picturePath: {
        type: String,
    },
    userPicturePath: {
        type: String,
    },
    likes: { //
        type: Map,
        of: Boolean
    },
    comments: { //
        type: Array,
        default: []
    },
},
{timestamps: true}
);
const Post = mongoose.model("Post",postSchema)
export default Post;