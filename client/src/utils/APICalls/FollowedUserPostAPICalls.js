// ALL POSTS
const retrieveAllFollowedPosts = (setPostsData) => {
  fetch("/followedposts", {
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
export { retrieveAllFollowedPosts }
