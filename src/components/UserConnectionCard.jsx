import React from 'react'
import { useNavigate } from 'react-router-dom';

const UserConnectionCard = ({ connectionData }) => {
  const navigate = useNavigate();
  return (
    <div className="flex flex-wrap gap-5 justify-center">
      {connectionData.map((user, index) => (
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
            {/* <h2 className="card-title">
              {user.firstName || "First"} {user.lastName || "Last"}
            </h2> */}

            {/* Name and Chat Button */}
            <div className="flex items-center justify-between">
              <h2 className="card-title">
                {user.firstName || "First"} {user.lastName || "Last"}
              </h2>
              <button
                className="btn btn-sm btn-primary"
                onClick={() => navigate(`/chat/${user._id}`)}
                
              >
                Chat
              </button>
            </div>

            <p>
              {user.gender || "Not specified"} • {user.age || "N/A"} years old
            </p>

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
          </div>
        </div>
      ))}
    </div>
  );
};

export default UserConnectionCard