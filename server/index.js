require("dotenv").config();
const express = require("express");
const massive = require("massive");
const session = require("express-session");



//Server assignment deconstruction
const app = express();


// Controllers
const ac = require("./controllers/authController")
const pc = require("./controllers/postsController")
const rc = require("./controllers/ratingsController")
const sc = require('./controllers/s3Controller')


// Destructuring private data from .env
const { SERVER_PORT, SESSION_SECRET, CONNECTION_STRING } = process.env;


// Middleware
const auth = require('./middleware/authMiddleware');
app.use(express.static(__dirname + '/../public'))
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
const { user, registerUser, loginUser, logoutUser, getCurrentUser } = ac;
const { allRatings, addRating, editRating, allRatingsByUserId} = rc
const { allPosts, getAllPostsByUserId, addPostCount, addPost, editPost, deletePost, allPostsByCategoryName, postById, getRandomPosts } = pc;

// Auth Endpoints
app.get("/auth/user", user); //Works
app.get("/auth/user/:user_id", getCurrentUser); //Works, excludes password hash
app.post("/auth/register", registerUser); //Works, catches duplicates
app.post("/auth/login", loginUser); // Works
app.get("/auth/logout", logoutUser); //Works

// Posts Endpoints
// Editing post COUNT: singular api/post. Editing full POST: plural api/posts
// NOTE: /api/randposts and /api/userposts for those pulls.
app.get("/api/posts",  allPosts); // Works -- auth.usersOnly,
app.get("/api/post/:post_id",  postById) //Works
app.put("/api/count/:user_id", addPostCount) //Works in postman
app.get("/api/randposts/:amount",  getRandomPosts) //Works
app.get("/api/posts/:category_name", allPostsByCategoryName) //Works
app.get("/api/userposts/:user_id", getAllPostsByUserId) // Working Postman
app.post("/api/posts",  addPost); //Works 
app.put("/api/posts/:post_id",  editPost); //Works, allows edit pet name
app.delete("/api/posts/:post_id",  deletePost); //Works

// Ratings Endpoints
app.get("/api/ratings",  allRatings);  //Works
app.get("/api/ratings/:user_id",  allRatingsByUserId) //Works
app.post("/api/ratings/:post_id",  addRating); //Works, but will allow user to rate multiple times
app.put("/api/ratings/:post_id",  editRating) //Works

// S3 Endpoint
app.get('/api/media/sign-s3', sc.getSigned)
app.get('/api/media/detectlabel', sc.doTheThing)

app.listen(SERVER_PORT, () => {
  console.log(`LOFI RADIO STATION #: ${SERVER_PORT}`)
})
