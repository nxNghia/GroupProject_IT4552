import React from "react";
import PropTypes from "prop-types";
import "./style.css";

const UserDetails = ({ userImage, displayName }) => (
    <div className="user-details-container">
        <img alt="user" className="user-image" src={userImage} />
        <p className="user-name">{displayName}</p>
    </div>
);


UserDetails.propTypes = {
    userImage: PropTypes.string,
    displayName: PropTypes.string
};

export default UserDetails;
