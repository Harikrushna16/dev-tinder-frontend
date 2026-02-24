import React, { useEffect, useState } from "react";
import axios from "axios";

const ConnectionRequests = () => {
  const [connectionRequests, setConnectionRequests] = useState([]);
  const fetchConnectionRequests = async () => {
    try {
      const response = await axios.get(
        `${import.meta.env.VITE_BACKEND_API_URL}/user/requests/received`,
        { withCredentials: true },
      );
      setConnectionRequests(response.data.requests);
      console.log(response.data.requests);
    } catch (error) {
      console.log(error);
    }
  };

  const handleAcceptRequest = async (status, requestId) => {
    try {
      await axios.post(
        `${import.meta.env.VITE_BACKEND_API_URL}/request/review/${status}/${requestId}`,
        {},
        { withCredentials: true },
      );
      fetchConnectionRequests();
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchConnectionRequests();
  }, []);

  if (connectionRequests?.length === 0) {
    return (
      <div className="flex items-center justify-center gap-5 min-h-[calc(100vh-132px)]">
        <h1>No Connection Requests</h1>
      </div>
    );
  }

  return (
    <div className="py-10 min-h-[calc(100vh-132px)] w-3/4 mx-auto">
      <h1 className="text-3xl font-bold text-center">Connection Requests</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-10 mt-5">
        {connectionRequests.map((request) => (
          <div
            key={request?.fromUserId?._id}
            className="bg-indigo-950 p-5 rounded-lg h-fit flex justify-between items-center gap-5"
          >
            <div className="min-w-20 min-h-20">
              <img
                src={request?.fromUserId?.profilePicture}
                alt="profile"
                className="w-20 h-20 rounded-full"
              />
            </div>
            <div className="flex justify-center flex-col gap-2">
              <h1 className="text-xl font-bold">
                {request?.fromUserId?.firstName +
                  " " +
                  request?.fromUserId?.lastName}
              </h1>
              <p className="text-sm">{request?.fromUserId?.bio}</p>
              <p className="text-sm">{request?.fromUserId?.age}</p>
              <p className="text-sm">{request?.fromUserId?.gender}</p>
            </div>
            <div className="flex gap-2">
              <button
                className="btn btn-primary"
                onClick={() =>
                  handleAcceptRequest("accepted", request?.fromUserId?._id)
                }
              >
                Accept
              </button>
              <button
                className="btn btn-secondary"
                onClick={() =>
                  handleAcceptRequest("rejected", request?.fromUserId?._id)
                }
              >
                Reject
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ConnectionRequests;
