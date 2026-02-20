import axios from "axios";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { addFeed } from "../utils/feedSlice";
import { useSelector } from "react-redux";

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
    <div className="flex flex-col items-center justify-center">
      {feed.map((user) => {
        console.log(user);
        return (
          <div key={user?._id} className="card w-96 bg-neutral shadow-xl">
            <div className="card-body">
              <h2 className="card-title">{user?.firstName}</h2>
              <div className="card-actions justify-end">
                <button className="btn btn-primary">Like</button>
                <button className="btn btn-secondary">Dislike</button>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default Feed;
