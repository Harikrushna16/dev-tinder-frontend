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

  if (!feed || feed.length === 0)
    return <div className="text-center">No feed available</div>;

  return (
    feed && (
      <div className="flex flex-col items-center justify-center pt-5">
        <UserCard user={feed[0]} />
      </div>
    )
  );
};

export default Feed;
