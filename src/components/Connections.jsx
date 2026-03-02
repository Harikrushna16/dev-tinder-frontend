import { useEffect, useState } from "react";
import axios from "axios";

const Connections = () => {
  const [connections, setConnections] = useState([]);
  const fetchUserConnections = async () => {
    try {
      const response = await axios.get(
        `${import.meta.env.VITE_BACKEND_API_URL}/user/connections`,
        { withCredentials: true },
      );
      setConnections(response.data.formattedConnections);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchUserConnections();
  }, []);

  if (connections.length === 0) {
    return (
      <div className="flex items-center justify-center gap-5 min-h-[calc(100vh-132px)]">
        <h1>No Connections</h1>
      </div>
    );
  }

  return (
    <div className="p-5 min-h-[calc(100vh-132px)]">
      <h1 className="text-3xl font-bold">Connections</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 mt-5">
        {connections.map((connection) => (
          <div
            key={connection._id}
            className="bg-indigo-950 p-5 rounded-lg h-fit flex justify-center items-center gap-5"
          >
            <div className="">
              <img
                src={connection.profilePicture}
                alt="profile"
                className="w-20 h-20 rounded-full object-cover"
              />
            </div>
            <div className="flex justify-center flex-col gap-2">
              <h1 className="text-xl font-bold">
                {connection.firstName + " " + connection.lastName}
              </h1>
              <p className="text-sm">{connection.bio}</p>
              <p className="text-sm">{connection.age}</p>
              <p className="text-sm">{connection.gender}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Connections;
