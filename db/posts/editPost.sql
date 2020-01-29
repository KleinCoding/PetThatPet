UPDATE posts
SET pet_name= $1
WHERE post_id= $2 AND user_id= $3;