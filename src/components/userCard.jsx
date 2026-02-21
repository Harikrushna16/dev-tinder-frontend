import React from "react";

const UserCard = ({ user }) => {
  const { profilePicture, bio, firstName, lastName, age, gender } = user;
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
        <div className="card-actions justify-between">
          <button className="btn btn-primary">Ignore</button>
          <button className="btn btn-secondary">Send Request</button>
        </div>
      </div>
    </div>
  );
};

export default UserCard;
