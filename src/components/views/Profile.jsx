import React, { useContext, useEffect } from "react";
import Button from "react-bootstrap/Button";
import "./Profile.css";
import { MyContext } from "../Context/MyContext";

const Profile = () => {
  const { token, profileEmail, user, handleLogOut } = useContext(MyContext);

  useEffect(() => {
    if (token) {
      profileEmail(token);
    }
  }, [token, profileEmail]);

  return (
    <div className="profile_container">
      <div className="profile">
        <img
          src="https://www.shutterstock.com/image-vector/vector-flat-illustration-grayscale-avatar-600nw-2264922221.jpg"
          alt="Profile Picture"
          className="profile_pic"
        />
        <p>{user?.email ? user.email : "Cargando..."}</p>
        <button className="profile_btn">🖋️Edit Profile</button>
        <ul>Info Contact</ul>
        <ul>Address</ul>
        <ul>Orders</ul>
        <ul>
          <Button onClick={handleLogOut}>Cerrar sesión</Button>
        </ul>
      </div>
      <div className="square d-flex justify-content-center align-items-center">
        <img
          src="https://www2.udec.cl/~joseparra/2.png"
          alt="sitio en construcción"
          className="square_underconstruction"
        />
      </div>
    </div>
  );
};

export default Profile;
