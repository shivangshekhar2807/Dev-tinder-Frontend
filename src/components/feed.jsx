import React, { useEffect } from 'react'

import axios from 'axios'
import { BASE_URL } from '../utils/constant'
import { useDispatch, useSelector } from 'react-redux'
import { addFeed } from '../utils/feedSlice'
import UserFeedCard from './UserFeedCard'

const Feed = () => {

  const dispatch = useDispatch();
  const feedData = useSelector((state) => state.feed)
  const refresh = useSelector((state) => state.refresh);


   const fetchFeed = async () => {
     if (feedData && !refresh) {
       return;
     }
     try {
       const res = await axios.get(BASE_URL + "/feed", {
         withCredentials: true,
       });
       console.log("feed res", res);

       dispatch(addFeed(res.data));
     } catch (err) {
       console.log(err);
     }
   };
 
  useEffect(() => {
   
    fetchFeed();
  }, []);


  useEffect(() => {
     fetchFeed();
  },[refresh])

  


  return (
    <div className="flex flex-col items-center justify-center my-10 text-center">
      {feedData && feedData.length > 0 ? (
        <UserFeedCard feedData={feedData} />
      ) : (
        <div>
          <span className="text-6xl opacity-50">😔</span>
          <h2 className="text-2xl font-semibold text-gray-600 mt-4">
            No new user present
          </h2>
          <p className="text-gray-500 mt-2 text-lg">Please come back later</p>
        </div>
      )}
    </div>
  );
}
export default Feed