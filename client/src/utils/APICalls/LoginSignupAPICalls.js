// import materialize to handle error
import M from "materialize-css";

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