import React from "react";
import PersonAddAltIcon from "@mui/icons-material/PersonAddAlt";
const userProfile = () => {
  return (
    <>
      <div className="container-fluid my-auto gradient-form">
        <div className="row justify-content-center align-items-center min-vh-100">
          <div className="card d-flex justify-content-center align-items-center w-50">
            <div className="card-body d-flex flex-column">
              <div className="text-center">
                <PersonAddAltIcon sx={{ fontSize: 90 }} />
                <h4 className="mt-1 mb-5 pb-1">Add User Profile</h4>
              </div>

              <p>
                Tap Continue and create new profile to proceed with the
                inspection.{" "}
              </p>

              <div className="mb-4">
                <label htmlFor="form1">Email address</label>
                <input id="form1" type="email" className="form-control" />
              </div>

              <div className="mb-4">
                <label htmlFor="form2">Password</label>
                <input id="form2" type="password" className="form-control" />
              </div>

              <div className="text-center pt-1 mb-5 pb-1">
                <button className="mb-4 w-100 gradient-custom-2 btn btn-primary">
                  Sign in
                </button>
                <a className="text-muted" href="#!">
                  Forgot password?
                </a>
              </div>

              <div className="d-flex flex-row align-items-center justify-content-center pb-4 mb-4">
                <p className="mb-0">Don't have an account?</p>
                <button className="mx-2 btn btn-outline-danger">Sign up</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default userProfile;
