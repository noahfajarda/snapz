// inform user post has been created
import M from "materialize-css";

// uploads image to cloudinary.com
// link to view images = https://console.cloudinary.com/console/c-a93be4c19875cf5fd32251bfff624e/media_library/search?q=

export async function postDetails(image) {
  const data = new FormData();
  data.append("file", image);
  data.append("upload_preset", "social-media-image-upload");
  data.append("cloud_name", "fajarda1storage");

  // API ROUTE = https://api.cloudinary.com/v1_1/fajarda1storage/image/upload
  try {
    const response = await fetch("https://api.cloudinary.com/v1_1/fajarda1storage/image/upload", {
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