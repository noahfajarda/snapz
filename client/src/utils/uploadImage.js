// inform user post has been created
import M from "materialize-css";
// import dotenv variables
const { REACT_APP_UPLOAD_PRESET, REACT_APP_CLOUD_NAME } = process.env;

// uploads image to cloudinary.com
// link to view images = https://console.cloudinary.com/console/c-a93be4c19875cf5fd32251bfff624e/media_library/search?q=

export async function postDetails(image) {
  const data = new FormData();
  data.append("file", image);
  data.append("upload_preset", REACT_APP_UPLOAD_PRESET);
  data.append("cloud_name", REACT_APP_CLOUD_NAME);
  // specify folder
  data.append("folder", "Instagram-Clone");

  // API ROUTE = https://api.cloudinary.com/v1_1/${REACT_APP_CLOUD_NAME}/image/upload
  // .../video/... == mp4 ONLY
  try {
    const response = await fetch(`https://api.cloudinary.com/v1_1/${REACT_APP_CLOUD_NAME}/image/upload`, {
      method: "POST",
      body: data,
    })
    // image POST response data & return the image URL alone
    const imageData = await response.json();
    return imageData.url;
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
        imageUrl: state.imageUrl,
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