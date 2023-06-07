import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
// reset password API call
import { setNewPassword } from "../utils/APICalls/ResetPasswordAPICalls";
// extract token from params
import { useParams } from "react-router-dom";

export default function NewPassword() {
  const navigate = useNavigate();
  const [password, setPassword] = useState("");
  // extract token from params
  const { token } = useParams();

  const setNewPasswordForm = (e) => {
    e.preventDefault();

    // try to reset password
    setNewPassword(password, token, navigate);
  };

  return (
    <div className="mt-8">
      <div className="card auth-card input-field">
        <h2 className="brand-logo">Snapz</h2>
        <form onSubmit={setNewPasswordForm}>
          {/* put state variables in inputs */}
          <input
            type="text"
            placeholder="Enter A New Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <button
            className="btn waves-effect waves-light #448aff blue darken-1"
            type="submit"
            name="action"
          >
            Set New Password
          </button>
        </form>
      </div>
    </div>
  );
}
