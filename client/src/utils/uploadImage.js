// inform user post has been created
import M from "materialize-css";
// import dotenv variables
const { REACT_APP_UPLOAD_PRESET, REACT_APP_CLOUD_NAME } = process.env;

// uploads assets to cloudinary.com
// link to view assets = https://console.cloudinary.com/console/c-a93be4c19875cf5fd32251bfff624e/media_library/search?q=

export async function postDetails(asset, type) {
  const data = new FormData();
  data.append("file", asset);
  data.append("upload_preset", REACT_APP_UPLOAD_PRESET);
  data.append("cloud_name", REACT_APP_CLOUD_NAME);
  // specify folder
  data.append("folder", "Instagram-Clone");

  // API ROUTE = https://api.cloudinary.com/v1_1/${REACT_APP_CLOUD_NAME}/image/upload
  // .../video/... == mp4 ONLY
  try {
    const response = await fetch(`https://api.cloudinary.com/v1_1/${REACT_APP_CLOUD_NAME}/${type.toLowerCase()}/upload`, {
      method: "POST",
      body: data,
    })
    // asset POST response data & return the asset URL alone
    const assetData = await response.json();

    // handle error
    if (assetData?.error?.message) {
      // show pop-up
      M.toast({
        html: assetData.error.message,
        classes: "#c62828 red darken-3",
      });
    }
    return assetData.url;
  } catch (err) {
    console.error(err);
  }
};

export async function createPost(state, navigate) {
  try {
    // post data to server
    const response = await fetch("/createpost", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + localStorage.getItem("jwt"),
      },
      body: JSON.stringify({
        // attatch title, body, & imageUul
        title: state.title,
        body: state.body,
        assetUrl: state.assetUrl,
        type: state.type,
      }),
    });
    // retrieve posted data
    const data = await response.json();

    // handle error
    if (data.error) {
      // show pop-up
      M.toast({
        html: data.error,
        classes: "#c62828 red darken-3",
      });
    } else {
      // show pop-up
      M.toast({
        html: "Created Post Successfully",
        classes: "#43a047 green darken-1",
      });
      // navigate to home screen
      navigate("/");
    }
  } catch (err) {
    console.error(err);
  }
}