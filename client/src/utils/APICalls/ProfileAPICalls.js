import M from "materialize-css";
const { REACT_APP_UPLOAD_PRESET, REACT_APP_CLOUD_NAME } = process.env;


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

export const uploadNewProfilePic = async (pic, setUrl, state, dispatch) => {
  const data = new FormData();
  data.append("file", pic);
  data.append("upload_preset", REACT_APP_UPLOAD_PRESET);
  data.append("cloud_name", REACT_APP_CLOUD_NAME);
  // specify folder
  data.append("folder", "Instagram-Clone/profile-Pics");
  // API ROUTE = https://api.cloudinary.com/v1_1/${REACT_APP_CLOUD_NAME}/image/upload
  // .../video/... == mp4 ONLY
  try {
    const changedImageResponse = await fetch(
      `https://api.cloudinary.com/v1_1/${REACT_APP_CLOUD_NAME}/image/upload`,
      {
        method: "POST",
        body: data,
      }
    );
    // asset POST changedImageResponse data & return the asset URL alone
    const assetData = await changedImageResponse.json();
    // handle error
    if (assetData?.error?.message) {
      // show pop-up
      M.toast({
        html: assetData.error.message,
        classes: "#c62828 red darken-3",
      });
    }
    // set url & update local storage with url
    setUrl(assetData.url);
    localStorage.setItem(
      "user",
      JSON.stringify({ ...state, profilePicURL: assetData.url })
    );

    const updateProfilePic = await fetch("updatepic", {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + localStorage.getItem("jwt"),
      },
      body: JSON.stringify({
        profilePicURL: assetData.url,
      }),
    })
    await updateProfilePic.json()

    // also update context state variable
    dispatch({ type: "UPDATEPROFILEPIC", payload: assetData.url });
  } catch (err) {
    console.error(err);
  }
};