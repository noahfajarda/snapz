export const retrieveUserProfilePosts = async (userId, setUserProfile) => {
  // retrieve user data & their posts
  const userProfileData = await fetch(`/user/${userId}`, {
    headers: {
      Authorization: "Bearer " + localStorage.getItem("jwt"),
    },
  })
  const data = await userProfileData.json()
  setUserProfile(data)
}

export const followUser = async (userId, dispatch, setUserProfile, setShowFollow) => {
  const followResponse = await fetch("/follow", {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      Authorization: "Bearer " + localStorage.getItem("jwt"),
    },
    body: JSON.stringify({
      followId: userId,
    }),
  });

  let followData = await followResponse.json();
  followData = followData.addFollowingToCurrentUser;
  dispatch({
    type: "UPDATE",
    payload: {
      following: followData.following,
      followers: followData.followers,
    },
  });
  localStorage.setItem("user", JSON.stringify(followData));
  setUserProfile((prev) => {
    return {
      ...prev,
      oneUser: {
        ...prev.oneUser,
        followers: [...prev.oneUser.followers, followData._id],
      },
    };
  });
  setShowFollow(true);
};

export const unfollowUser = async (userId, dispatch, setUserProfile, setShowFollow) => {
  const unfollowResponse = await fetch("/unfollow", {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      Authorization: "Bearer " + localStorage.getItem("jwt"),
    },
    body: JSON.stringify({
      unfollowId: userId,
    }),
  });

  let followData = await unfollowResponse.json();
  followData = followData.removeFollowingFromCurrentUser;
  dispatch({
    type: "UPDATE",
    payload: {
      following: followData.following,
      followers: followData.followers,
    },
  });
  localStorage.setItem("user", JSON.stringify(followData));
  setUserProfile((prev) => {
    const newFollower = prev.oneUser.followers.filter(
      (item) => item !== followData._id
    );
    return {
      ...prev,
      oneUser: {
        ...prev.oneUser,
        followers: newFollower,
      },
    };
  });
  setShowFollow(false);
};