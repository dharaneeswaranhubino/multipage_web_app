import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import type { RootState } from "../app/store";
import { logout } from "../features/auth/authSlice";
import { useNavigate } from "react-router-dom";

const Profile = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const user = useSelector((state: RootState) => state.auth.user);

  const [editMode, setEditMode] = useState(false);
  const [name, setName] = useState(user?.name || "");

  //Not logged in handling (professional way)
  if (!user) {
    return (
      <div className="text-center mt-5">
        <h3>Please login to view profile</h3>
        <button
          className="btn btn-dark mt-3"
          onClick={() => navigate("/login")}
        >
          Go to Login
        </button>
      </div>
    );
  }

  const handleLogout = () => {
    dispatch(logout());
    navigate("/login");
  };

  const handleSave = () => {
    const updatedUser = { ...user, name };

    localStorage.setItem("loggedUser", JSON.stringify(updatedUser));

    alert("Profile Updated!!!");
    setEditMode(false);
    window.location.reload(); // simple refresh for now
  };

  return (
    <div className="col-md-5 mx-auto mt-4">
      <div className="card shadow p-4 text-center">

        <div style={{ fontSize: "60px" }}>👤</div>

        {editMode ? (
          <input
            className="form-control mb-3"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        ) : (
          <h3>{user.name}</h3>
        )}

        <p className="text-muted">{user.email}</p>

        {editMode ? (
          <button
            className="btn btn-success mb-2"
            onClick={handleSave}
          >
            Save
          </button>
        ) : (
          <button
            className="btn btn-primary mb-2"
            onClick={() => setEditMode(true)}
          >
            Edit Profile
          </button>
        )}

        <button className="btn btn-danger" onClick={handleLogout}>
          Logout
        </button>
      </div>
    </div>
  );
};

export default Profile;