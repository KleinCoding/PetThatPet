const bcrypt = require("bcryptjs")

async function user(req, res) {
  if (req.session.user) {
    console.log(req.session.user)
    res.status(200).json(req.session.user)
  }
  else {
    console.log(req.session.user)
    res.status(401).json("No user logged in")
  }
}

async function getCurrentUser(req, res) {
  //Pulls user from users table. This is for the post_count integer value
  const user_id= req.session.user.user_id;
  const db = req.app.get("db");

  const currentUser = await db.auth.getCurrentUser(user_id)
console.log("authController, getting user by ID", user_id)
  res.status(200).json(currentUser);
}


async function registerUser(req, res) {
  const {username, password } = req.body;
  const db = req.app.get("db");

  // Check for the username
  const foundUser = await db.auth.checkForUsername(username)

  // If the user is found, send a msg stating so
  if (foundUser[0]) {
    res.status(401).json("Username is already taken.")
    // Otherwise, hash the password and store the new user into the database
  } else {
    // salt
    const salt = await bcrypt.genSaltSync(10);
    // hash
    const hash = await bcrypt.hashSync(password, salt)
    // store the new user into the database
    const newUser = await db.auth.registerUser([
      username,
      hash
    ])

    // store the new user on session
    req.session.user = {
      user_id: newUser[0].user_id,
      username: newUser[0].username
    }
    console.log(req.session.user);
    res.status(200).json(req.session.user)
  }
}

async function loginUser(req, res) {
  const { username, password } = req.body;
  const db = req.app.get("db");

  // Check if username exists
  const foundUser = await db.auth.checkForUsername(username)

  // If the user is not found, then send a msg back stating incorrect username/password
  if (!foundUser[0]) {
    res.status(400).json("Username or Password is Incorrect.")
    
   
    // Otherwise, authenticate the hashed pw first, and then login the user
  } else {
    const isAuthenticated = bcrypt.compareSync(password, foundUser[0].hash)
    // If the password does not match, send a msg stating so
    if (!isAuthenticated) {
      res.status(403).json("Password is incorrect.")
       
      // Otherwise, store the found user on session
    } else {
      req.session.user = {
        user_id: foundUser[0].user_id,
        username: foundUser[0].username
      }
    }
    console.log("Logged in", req.session.user);
    // Send back an ok with the user on session
    res.status(200).json(req.session.user)
    
  }

}

async function logoutUser(req, res) {
  console.log(req.session.user, "logged out")
  req.session.destroy();
  res.sendStatus(200);
}

module.exports = {
  user,
  registerUser,
  loginUser,
  logoutUser,
  getCurrentUser
}