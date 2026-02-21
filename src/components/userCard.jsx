import React from 'react'

const userCard = ({ user }) => {
    const { profilePicture, bio, firstName, lastName } = user;
    return (
        <div className="card bg-neutral w-96 shadow-xl">
            <figure>
                <img
                    src={profilePicture}
                    alt="Shoes" />
            </figure>
            <div className="card-body">
                <h2 className="card-title">{firstName + " " + lastName}</h2>
                <p>{bio}</p>
                <div className="card-actions justify-between">
                    <button className="btn btn-primary">Ignore</button>
                    <button className="btn btn-secondary">Send Request</button>
                </div>
            </div>
        </div>
    )
}

export default userCard