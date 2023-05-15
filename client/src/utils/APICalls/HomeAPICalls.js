// ALL POSTS
const retrieveAllPosts = (setPostsData) => {
  fetch("/allposts", {
    headers: {
      Authorization: "Bearer " + localStorage.getItem("jwt"),
    },
  })
    .then((res) => res.json())
    .then((result) => {
      // check if user data is valid
      if (!("error" in result) && result.length !== 0) {
        // latest go on top
        result.posts.reverse();
      }

      setPostsData(result.posts);
    });
}

// INDIVIDUAL POST
const likePost = async (postId, setLikeCount, setUserLiked) => {
  try {
    // fetch call to '/like' route to like a post
    const likeData = await fetch("/like", {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + localStorage.getItem("jwt"),
      },
      body: JSON.stringify({
        postId,
      }),
    });
    const likeResponse = await likeData.json();

    // set like count to length of likes array & set userLiked to 'true'
    setLikeCount(likeResponse.likes.length);
    setUserLiked(true);
  } catch (err) {
    console.error(err);
  }
};

const unlikePost = async (postId, setLikeCount, setUserLiked) => {
  try {
    // fetch call to '/unlike' route to like a post
    const unlikeData = await fetch("/unlike", {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + localStorage.getItem("jwt"),
      },
      body: JSON.stringify({
        postId,
      }),
    });
    const unlikeResponse = await unlikeData.json();

    // set like count to length of likes array & set userLiked to 'false'
    setLikeCount(unlikeResponse.likes.length);
    setUserLiked(false);
  } catch (err) {
    console.error(err);
  }
};

const commentOnPost = async (text, postId, setComments) => {
  try {
    // comment API call
    const commentData = await fetch("/comment", {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + localStorage.getItem("jwt"),
      },
      body: JSON.stringify({
        postId,
        text,
      }),
    });
    const commentResponse = await commentData.json();
    // set comments to comments
    setComments(commentResponse.comments);
  } catch (err) {
    console.error(err);
  }
};

export { retrieveAllPosts, likePost, unlikePost, commentOnPost }
