import React from 'react'

const UserConnectionCard = ({ connectionData }) => {
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
          </div>
        </div>
      ))}
    </div>
  );
};

export default UserConnectionCard