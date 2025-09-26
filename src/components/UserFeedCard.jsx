import axios from "axios";
import React from "react";
import { BASE_URL } from "../utils/constant";
import { useDispatch } from "react-redux";
import { addRefresh } from "../utils/refreshSlice";

const UserFeedCard = ({ feedData }) => {

    const dispatch = useDispatch();

    const handleSendRequest = async ({status,id}) => {
        if (status == "interested") {
            try {
                const res = await axios.post(
                  BASE_URL + `/request/send/${status}/${id}`,{},{withCredentials:true}
                );

                 dispatch(addRefresh(Math.random()))
            }
            catch (err) {
                console.log(err)
            }
        }
        else {
             try {
               const res = await axios.post(
                 BASE_URL + `/request/send/${status}/${id}`,
                 {},
                 { withCredentials: true }
               );

               dispatch(addRefresh(Math.random()));
             } catch (err) {
               console.log(err);
             }
        }
    }
  return (
    <div className="flex flex-wrap gap-5 justify-center">
      {feedData.map((user, index) => (
        <div
          key={user._id}
          className="card bg-base-200 w-96 shadow-sm border border-gray-200"
        >
          {/* Photo */}
          <figure className="bg-gray-100">
            <img
              src={user.photoUrl || "https://via.placeholder.com/150"}
              alt={`${user.firstName || "User"}'s photo`}
              className="w-full h-60 object-cover"
            />
          </figure>

          {/* Card Body */}
          <div className="card-body">
            {/* Name */}
            <h2 className="card-title">
              {user.firstName || "First"} {user.lastName || "Last"}
            </h2>

            {/* Gender & Age */}
            <p>
              {user.gender || "Not specified"} • {user.age || "N/A"} years old
            </p>

            {/* About */}
            <p className="text-gray-600 italic">
              {user.about || "No description available"}
            </p>

            {/* Skills */}
            {user.skills && user.skills.length > 0 ? (
              <div className="mt-2">
                <h3 className="font-semibold">Skills:</h3>
                <div className="flex flex-wrap gap-2 mt-1">
                  {user.skills.map((skill, idx) => (
                    <span
                      key={idx}
                      className="badge badge-outline badge-primary"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
            ) : (
              <p className="text-sm text-gray-400 mt-2">No skills listed</p>
            )}

            {/* Example Action Button */}
            <div className="card-actions justify-center mt-4">
              <button
                className="btn btn-secondary"
                onClick={() =>
                  handleSendRequest({ status: "interested", id: user._id })
                }
              >
                Interested
              </button>
              <button
                className="btn btn-primary"
                onClick={() =>
                  handleSendRequest({ status: "ignored", id: user._id })
                }
              >
                Ignore
              </button>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default UserFeedCard;
