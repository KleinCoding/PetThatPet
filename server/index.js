require("dotenv").config();
const express = require("express");
const massive = require("massive");
const session = require("express-session");
const app = express();
// Controllers
const ac = require("./controllers/authController")
const pc = require("./controllers/postsController")
// Dotenv
const { SERVER_PORT, SESSION_SECRET, CONNECTION_STRING } = process.env;
// Middleware
const auth = require('./middleware/authMiddleware');
app.use(express.json());

// Session
app.use(session({
  secret: SESSION_SECRET,
  resave: false,
  saveUninitialized: true,
  cookie: {
    maxAge: 1000 * 60 * 60 * 24 * 7
  }
}))

// Database Connection
massive(CONNECTION_STRING).then(db => {
  app.set("db", db);
  console.log("db is connected!")
})

// De-structured controllers
const { user, registerUser, loginUser, logoutUser } = ac;
const { allPosts, addPost, editPost, deletePost, allPostsByCategoryName, postsById } = pc;
// Auth Endpoints
app.get("/auth/user", user); //Works
app.post("/auth/register", registerUser); //Works, catches duplicates
app.post("/auth/login", loginUser); // Works
app.get("/auth/logout", logoutUser); //Works

// Posts Endpoints
app.get("/api/posts", auth.usersOnly, allPosts); // Works
app.get("/api/post/:post_id", auth.usersOnly, postsById) //Works
app.get("/api/posts/:category_name",auth.usersOnly, allPostsByCategoryName) //Works
app.post("/api/posts", auth.usersOnly, addPost); //Works but doesnt add initial img_rating value
app.put("/api/posts/:post_id", auth.usersOnly, editPost); //Works, allows edit img url and pet name
app.delete("/api/posts/:post_id", auth.usersOnly, deletePost); //Works


app.listen(SERVER_PORT, () => {
  console.log(`LOFI RADIO STATION #: ${SERVER_PORT}`)
})
