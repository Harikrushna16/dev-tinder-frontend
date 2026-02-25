import React from "react";
import axios from "axios";
import { useDispatch } from "react-redux";
import { removeFeed } from "../utils/feedSlice";
import { useLocation } from "react-router-dom";

const UserCard = ({ user }) => {
  const { _id, profilePicture, bio, firstName, lastName, age, gender } = user;
  const dispatch = useDispatch();
  const location = useLocation();

  const handleSendRequest = async (status, userId) => {
    try {
      await axios.post(
        `${import.meta.env.VITE_BACKEND_API_URL}/request/send/${status}/${userId}`,
        {},
        { withCredentials: true },
      );
      dispatch(removeFeed(_id));
    } catch (error) {
      console.log(error);
    }
  };

  if (!user) return null;

  return (
    <div className="card bg-neutral w-96 shadow-xl">
      <figure>
        <img
          src={profilePicture}
          className="max-w-80 h-auto object-cover"
          alt="Shoes"
        />
      </figure>
      <div className="card-body">
        <h2 className="card-title">
          {firstName + " " + lastName}, {age}
        </h2>
        <p>{bio}</p>
        <p>{gender}</p>
        {location.pathname !== "/profile" && (
          <div className="card-actions justify-between">
            <button
              className="btn btn-primary"
              onClick={() => handleSendRequest("ignored", _id)}
            >
              Ignore
            </button>
            <button
              className="btn btn-secondary"
              onClick={() => handleSendRequest("interested", _id)}
            >
              Send Request
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default UserCard;
