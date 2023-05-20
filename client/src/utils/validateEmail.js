import M from "materialize-css";

export default function validateEmail(email) {
  // check if email is valid in format
  if (!String(email)
    .toLowerCase()
    .match(
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    )) {
    // display error message
    M.toast({
      html: "Invalid Email!",
      classes: "#c62828 red darken-3",
    });
    return false;
  }
  return true;
};