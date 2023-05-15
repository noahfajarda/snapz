export const retrieveProfilePosts = async (setMyPosts) => {
  // retrieve posts data
  fetch(`myposts`, {
    headers: {
      Authorization: "Bearer " + localStorage.getItem("jwt"),
    },
  })
    .then((res) => res.json())
    .then((result) => {
      // check if user data is valid
      if (!("error" in result) && result.length !== 0) {
        // latest go on top
        result.myposts.reverse();
      }

      // set posts data
      setMyPosts(result.myposts);
    });
}