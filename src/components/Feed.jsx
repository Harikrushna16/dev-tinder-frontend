import axios from "axios";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { addFeed } from "../utils/feedSlice";
import { useSelector } from "react-redux";
import UserCard from "./userCard";

const Feed = () => {
  const feed = useSelector((store) => store.feed.feed);
  const dispatch = useDispatch();
  const getFeed = async () => {
    try {
      const response = await axios.get(
        `${import.meta.env.VITE_BACKEND_API_URL}/user/feed`,
        {
          withCredentials: true,
        },
      );
      dispatch(addFeed(response?.data?.feedData));
    } catch (error) {
      console.log(error?.response?.data?.message || error.message);
    }
  };

  useEffect(() => {
    getFeed();
  }, []);

  if (!feed) return <div className="text-center">No feed available</div>;

  return (
    <div className="flex flex-col items-center justify-center pt-5">
      {feed.map((user) => (
        <UserCard key={user?._id} user={user} />
      ))}
    </div>
  );
};

export default Feed;
