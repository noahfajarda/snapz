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