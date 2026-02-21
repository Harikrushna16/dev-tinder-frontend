import React, { useState, useEffect } from 'react'
import { useDispatch } from 'react-redux';
import axios from 'axios';
import { addUser } from '../utils/userSlice';
import UserCard from './userCard';

const UpdateProfile = ({ user }) => {
    const [profile, setProfile] = useState({
        firstName: user?.firstName || "",
        lastName: user?.lastName || "",
        bio: user?.bio || "",
        age: user?.age || "",
        gender: user?.gender || "",
        profilePicture: user?.profilePicture || "",
    });
    const [error, setError] = useState("");
    const dispatch = useDispatch();

    useEffect(() => {
        if (user) {
            setProfile({
                firstName: user.firstName || "",
                lastName: user.lastName || "",
                bio: user.bio || "",
                age: user.age || "",
                gender: user.gender || "",
                profilePicture: user.profilePicture || "",
            });
        }
    }, [user]);


    const handleUpdateProfile = async () => {
        try {
            const response = await axios.patch(
                `${import.meta.env.VITE_BACKEND_API_URL}/profile/update`,
                profile,
                { withCredentials: true },
            );
            console.log(response.data.data);
            dispatch(addUser(response.data.data));
        } catch (error) {
            setError(error?.response?.data?.message || error.message);
        }
    };

    return (
        <div className="flex items-center justify-center gap-5 min-h-[calc(100vh-132px)]">
            <fieldset className="fieldset bg-base-300 border-base-300 rounded-box w-md border p-4">
                <h1 className="text-2xl font-bold mb-5">Update Profile</h1>

                <label className="label">First Name</label>
                <input
                    type="text"
                    className="input w-full"
                    placeholder="First Name"
                    value={profile.firstName}
                    onChange={(e) => setProfile({ ...profile, firstName: e.target.value })}
                />

                <label className="label">Last Name</label>
                <input
                    type="text"
                    className="input w-full"
                    placeholder="Last Name"
                    value={profile.lastName}
                    onChange={(e) => setProfile({ ...profile, lastName: e.target.value })}
                />

                <label className="label">Age</label>
                <input
                    type="number"
                    className="input w-full"
                    placeholder="Age"
                    value={profile.age}
                    onChange={(e) => setProfile({ ...profile, age: e.target.value })}
                />

                <label className="label">Bio</label>
                <input
                    type="text"
                    className="input w-full"
                    placeholder="Bio"
                    value={profile.bio}
                    onChange={(e) => setProfile({ ...profile, bio: e.target.value })}
                />

                <label className="label">Gender</label>
                <input
                    type="text"
                    className="input w-full"
                    placeholder="Gender"
                    value={profile.gender}
                    onChange={(e) => setProfile({ ...profile, gender: e.target.value })}
                />

                <label className="label">Profile Picture</label>
                <input
                    type="url"
                    className="input w-full"
                    placeholder="Profile Picture"
                    value={profile.profilePicture}
                    onChange={(e) => setProfile({ ...profile, profilePicture: e.target.value })}
                />
                {error && <p className="text-red-500 mt-2">{error}</p>}
                <button className="btn btn-neutral mt-5" onClick={handleUpdateProfile}>
                    save profile
                </button>
            </fieldset>
            <UserCard user={profile} />
        </div>
    );
};

export default UpdateProfile