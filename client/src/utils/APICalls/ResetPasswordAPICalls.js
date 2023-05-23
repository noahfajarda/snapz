import M from "materialize-css";

// function to reset password
export const sendResetEmail = async (email, navigate) => {
  const sendResetEmailData = await fetch("/reset-password", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      email,
    }),
  })
  const sendResetEmailResponse = await sendResetEmailData.json();

  // handle error
  if (sendResetEmailResponse.error) {
    // show pop-up
    M.toast({
      html: sendResetEmailResponse.error,
      classes: "#c62828 red darken-3",
    });
  } else {
    // show pop-up
    M.toast({
      html: sendResetEmailResponse.message,
      classes: "#43a047 green darken-1",
    });
    // navigate back to login
    navigate("/login");
  }
}

// function to reset password
export const setNewPassword = async (password, token, navigate) => {
  const resetPassData = await fetch("/new-password", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      password,
      token
    }),
  })
  const resetPassResponse = await resetPassData.json();

  // handle error
  if (resetPassResponse.error) {
    // show pop-up
    M.toast({
      html: resetPassResponse.error,
      classes: "#c62828 red darken-3",
    });
  } else {
    // show pop-up
    M.toast({
      html: resetPassResponse.message,
      classes: "#43a047 green darken-1",
    });
    // navigate back to login
    navigate("/login");
  }
}