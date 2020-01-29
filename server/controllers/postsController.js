
//Get Posts Calls

async function allPosts(req, res) {
  const db = req.app.get("db");
  const posts = await db.posts.getAllPosts();

  res.status(200).json(posts)
}

async function postById(req, res) {
  const post_id= req.params.post_id;
  const db = req.app.get("db");

  const posts = await db.posts.getPostsById(post_id)
console.log("postController, getting post by ID",post_id)
  res.status(200).json(posts);
}

async function allPostsByCategoryName(req, res) {
  const category_name = req.params.category_name;
  const db = req.app.get("db");

  const posts = await db.posts.getAllPostsByCategoryName(category_name)

  res.status(200).json(posts);
}
async function getAllPostsByUserId(req, res) {
  const user_id= req.params.user_id
  const db = req.app.get("db");

  const postsUser = await db.posts.getAllPostsForUser(user_id)
console.log(user_id,"<- User ID. Firing in Posts Controller -> allPostsByUserId")
  res.status(200).json(postsUser);
}

async function getRandomPosts(req, res) {
  const amount= req.params.amount;
  const db = req.app.get("db");

  const randposts = await db.posts.getRandomPosts(amount)
console.log("postController, getting random posts amount:", amount)
  res.status(200).json(randposts);
}



// Add/Edit Post Calls

async function addPost(req, res) {
  const { category_name, pet_name, img_url} = req.body;
  const user_id = req.session.user.user_id;
  

  const db = req.app.get("db");

  const addedPost = await db.posts.addPost([category_name, pet_name, img_url, user_id]);
  console.log(addedPost)
  res.status(200).json(addedPost);
}

async function addPostCount(req, res) {
  const user_id = req.session.user.user_id;
  const db = req.app.get("db");

  const postIncrement = await db.posts.addPostCount(user_id);
  res.status(200).json(postIncrement);
  console.log("Post Count incremented in post controller", postIncrement)
}



async function editPost(req, res) {
  const { pet_name } = req.body;
  const post_id = +req.params.post_id;
  const user_id = req.session.user.user_id;

  const db = req.app.get("db");

  const editedPost = await db.posts.editPost([
    pet_name,
    post_id,
    user_id,
  ])

  console.log(editedPost)
  res.status(200).json(editedPost);
}

async function deletePost(req, res) {
  const post_id = +req.params.post_id;
  const user_id = req.session.user.user_id;
  const db = req.app.get("db");
console.log("Deleting Post in postsController")
  const updatedPosts = await db.posts.deletePost([post_id, user_id])

  res.status(200).json(updatedPosts);
}

module.exports = {
  allPosts,
  allPostsByCategoryName,
  getAllPostsByUserId,
  postById,
  getRandomPosts,
  addPost,
  editPost,
  deletePost,
  addPostCount
}