import bodyParser from "body-parser";
import cors from "cors";
import path from "path";
import helmet from "helmet";
import mongoose from "mongoose";
import { fileURLToPath } from "url";
import dotenv from "dotenv";
import express from "express";
import multer from "multer";
import morgan from "morgan";
import { register } from "./controllers/auth.js";
import authRoutes from "./routes/auth.js";
import userRoutes from "./routes/user.js";
import postRoutes from "./routes/post.js"
import { verifyToken } from "./middleware/auth.js";
import { createPost } from "./controllers/post.js";
// import User from "./models/User.js"
// import Post from "./models/Post.js"
import { users, posts } from "./Data/index.js"

// config
const __filename = fileURLToPath(import.meta.url); //getting the module URL
const __dirname = path.dirname(__filename);

dotenv.config();
const app = express();
app.use(express.json()) //parising incoming requests in JSON
app.use(helmet());
app.use(helmet.crossOriginResourcePolicy({ polciy: "cross-origins" }));
app.use(morgan("common"));
app.use(bodyParser.json({ limit: "30mb", extended: true }));
app.use(bodyParser.urlencoded({ limit: "30mb", extended: true }));
app.use(cors());
app.use("/assets", express.static(path.join(__dirname, "public/assets")));//serving static file``

//accessing the static file through .../assets

//file storage
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, '/public/assets')
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9)
    cb(null, file.fieldname + file.originalname)
  }
})
const upload = multer({ storage: storage })

//Routes with file upload
app.post("/auth/register", upload.single("picture"), register); //upload.single is middlewre that
//will run before running the actaul logic of the endpoint(/auth/register) 
app.post("/posts", verifyToken, upload.single("picture"), createPost) //the picture is the porperty that will be sent from front end
//Routes
app.use("/auth", authRoutes);
app.use("/users", userRoutes);
app.use("/post", postRoutes)

const PORT = process.env.PORT || 8080

mongoose.connect(process.env.mongo_URL, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => app.listen(PORT, () => {
    console.log(`Connected!, Port:${PORT} `)
  }))
  .catch((error) => { console.log(`There was an error connecting to the server: ${error}`) });