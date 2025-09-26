import axios from "axios";
import React, { useEffect, useState } from "react";
import { BASE_URL } from "../utils/constant";

const RequestRecieved = () => {
    const [PendingRequest, setPendingRequest] = useState([]);
    const [refresh, setRefresh] = useState(null);
    
    useEffect(() => {
      const fetchPendingRequest = async () => {
        try {
          const res = await axios.get(BASE_URL + "/user/requests/recieved", {
            withCredentials: true,
          });

          console.log("pending ", res);
          setPendingRequest(res.data.data);
        } catch (err) {
          console.log(err);
        }
      };
      fetchPendingRequest();
    }, [refresh]);
    
    const handleRequest = async ({ action, id }) => {
        if (action == "Accept") {
            try {
              const res = await axios.post(
                BASE_URL + `/request/review/${"accepted"}/${id}`,{},{withCredentials:true}
              );
                
                setRefresh(Math.random());
            }
            catch (err) {
                console.log(err)
            }
        }
        else {
              try {
                const res = await axios.post(
                  BASE_URL + `/request/review/${"rejected"}/${id}`,
                  {},
                  { withCredentials: true }
                );

                setRefresh(Math.random());
              } catch (err) {
                console.log(err);
              }
        }
    };

  return (
    <div className="flex flex-wrap gap-5 justify-center">
      {PendingRequest.length === 0 ? (
        <p className="text-center text-gray-500 text-lg mt-10">
          You do not have any pending request
        </p>
      ) : (
        PendingRequest.map((user, index) => (
          <div
            key={user.fromUserId._id || index}
            className="card bg-base-200 w-96 shadow-sm border border-gray-200"
          >
            {/* Photo */}
            <figure className="bg-gray-100">
              <img
                src={
                  user.fromUserId.photoUrl || "https://via.placeholder.com/150"
                }
                alt={`${user.fromUserId.firstName || "User"}'s photo`}
                className="w-full h-60 object-cover"
              />
            </figure>

            {/* Card Body */}
            <div className="card-body">
              {/* Name */}
              <h2 className="card-title">
                {user.fromUserId.firstName || "First"}{" "}
                {user.fromUserId.lastName || "Last"}
              </h2>

              {/* Gender & Age */}
              <p>
                {user.fromUserId.gender || "Not specified"} •{" "}
                {user.fromUserId.age || "N/A"} years old
              </p>

              {/* About */}
              <p className="text-gray-600 italic">
                {user.fromUserId.about || "No description available"}
              </p>

              {/* Skills */}
              {user.fromUserId.skills && user.fromUserId.skills.length > 0 ? (
                <div className="mt-2">
                  <h3 className="font-semibold">Skills:</h3>
                  <div className="flex flex-wrap gap-2 mt-1">
                    {user.fromUserId.skills.map((skill, idx) => (
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

              {/* Action Buttons */}
              <div className="card-actions justify-center mt-4">
                <button
                  className="btn btn-secondary"
                  onClick={() =>
                    handleRequest({ action: "Accept", id: user.fromUserId._id })
                  }
                >
                  Accept
                </button>
                <button
                  className="btn btn-primary"
                  onClick={() =>
                    handleRequest({ action: "Reject", id: user.fromUserId._id })
                  }
                >
                  Reject
                </button>
              </div>
            </div>
          </div>
        ))
      )}
    </div>
  );
};

export default RequestRecieved;
