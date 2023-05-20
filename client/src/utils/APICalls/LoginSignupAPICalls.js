// import materialize to handle error
import M from "materialize-css";
const { REACT_APP_UPLOAD_PRESET, REACT_APP_CLOUD_NAME } = process.env;

export const attemptLogin = (state, User, navigate) => {
  // submit signup data to DB
  fetch("/login", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      password: state.password,
      email: state.email,
    }),
  })
    .then((res) => res.json())
    // contains 'user info' & 'token'
    .then((data) => {
      // handle error
      if (data.error) {
        // show pop-up
        M.toast({
          html: data.error,
          classes: "#c62828 red darken-3",
        });
      } else {
        // set local storage items for 'jwt' & user data
        localStorage.setItem("jwt", data.token);
        localStorage.setItem("user", JSON.stringify(data.user));

        // dispatch user data
        User.dispatch({ type: "USER", payload: data.user });

        // show pop-up
        M.toast({
          html: "Successfully Signed in",
          classes: "#43a047 green darken-1",
        });
        // navigate to home screen
        navigate("/");
      }
    })
    .catch((err) => console.log(err));
}

export const attemptSignup = async (state, navigate) => {
  try {
    // submit signup data to DB
    const signupData = await fetch("/signup", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name: state.name,
        email: state.email,
        password: state.password,
        profilePicURL: state.profilePicURL,
      }),
    });
    const signupResponse = await signupData.json();
    // handle error
    if (signupResponse.error) {
      // show pop-up
      M.toast({
        html: signupResponse.error,
        classes: "#c62828 red darken-3",
      });
    } else {
      // show pop-up
      M.toast({
        html: signupResponse.message,
        classes: "#43a047 green darken-1",
      });
      // navigate back to login
      navigate("/login");
    }
  } catch (err) {
    console.log(err);
  }
}

export const postProfilePic = async (pic) => {
  const data = new FormData();
  data.append("file", pic);
  data.append("upload_preset", REACT_APP_UPLOAD_PRESET);
  data.append("cloud_name", REACT_APP_CLOUD_NAME);
  // specify folder
  data.append("folder", "Instagram-Clone/profile-Pics");

  try {
    const response = await fetch(
      `https://api.cloudinary.com/v1_1/${REACT_APP_CLOUD_NAME}/image/upload`,
      {
        method: "POST",
        body: data,
      }
    );
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
