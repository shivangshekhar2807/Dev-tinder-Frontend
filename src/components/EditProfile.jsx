import React, { useEffect, useState } from "react";
import UserFeedCard from "./UserFeedCard";
import axios from "axios";
import { BASE_URL } from "../utils/constant";
import { useDispatch } from "react-redux";
import { addRefresh } from "../utils/refreshSlice";

const EditProfile = ({ userData }) => {
  const [firstName, setFirstname] = useState("Shivang");
  const [lastName, setLastname] = useState("Shekhar");

  const [about, setAbout] = useState("I love coding and building projects.");
  const [age, setAge] = useState(25);
  const [gender, setGender] = useState("Male");
  const [skills, setSkills] = useState(["React", "Redux", "Node.js"]);
  const [photoUrl, setPhotoUrl] = useState(
    "https://images.pexels.com/photos/414171/pexels-photo-414171.jpeg"
  );
    const [error, setError] = useState("");
    const dispatch = useDispatch();
    
    
    useEffect(() => {
        if (!userData) {
            return
        }
        
        setAbout(userData.about || "");
        setFirstname(userData.firstName || "");
        setLastname(userData.lastName || "");
        setAge(userData.age || "");
        setGender(userData.gender || "");
        setSkills(userData.skills || []); // ✅ fallback to empty array
        setPhotoUrl(userData.photoUrl || "");
      console.log("userData,,,,,,,", userData);
    }, [userData]);

  const handleUpdate = async() => {
    const profileData = {
      firstName,
      lastName,

      about,
      age,
      gender,
      skills,
      photoUrl,
    };
     
      try {
          const edit = await axios.patch(BASE_URL + "/profile/edit", 
            profileData
          , { withCredentials: true });
          
          dispatch(addRefresh(Math.random()));
      }
      catch (err) {
          setError(err.message)
      }
      
    console.log("Updated Profile:", profileData);
  };

    return (
      <div className=" flex justify-center my-10">
        <div className="flex justify-center items-center min-h-screen bg-base-200 mx-10">
          {/* 🔹 smaller like Login form */}
          <div className="card bg-base-100 shadow-2xl w-full max-w-lg">
            <div className="card-body">
              <h2 className="card-title text-3xl font-bold justify-center mb-6">
                Profile
              </h2>

              <div className="flex justify-center mt-4">
                <img
                  src={photoUrl}
                  alt="Profile"
                  className="w-24 h-24 rounded-full border shadow-md"
                />
              </div>

              {/* Photo URL + Preview */}
              <div className="form-control w-full">
                <label className="label">
                  <span className="label-text text-lg">Photo URL</span>
                </label>
                <input
                  type="text"
                  value={photoUrl}
                  onChange={(e) => setPhotoUrl(e.target.value)}
                  className="input input-bordered w-full"
                />
              </div>

              {/* First Name */}
              <div className="form-control w-full mt-6">
                <label className="label">
                  <span className="label-text text-lg">First Name</span>
                </label>
                <input
                  type="text"
                  value={firstName}
                  onChange={(e) => setFirstname(e.target.value)}
                  className="input input-bordered w-full"
                />
              </div>

              {/* Last Name */}
              <div className="form-control w-full mt-4">
                <label className="label">
                  <span className="label-text text-lg">Last Name</span>
                </label>
                <input
                  type="text"
                  value={lastName}
                  onChange={(e) => setLastname(e.target.value)}
                  className="input input-bordered w-full"
                />
              </div>

              {/* About */}
              <div className="form-control w-full mt-4">
                <label className="label">
                  <span className="label-text text-lg">About</span>
                </label>
                <textarea
                  value={about}
                  onChange={(e) => setAbout(e.target.value)}
                  className="textarea textarea-bordered w-full"
                ></textarea>
              </div>

              {/* Age */}
              <div className="form-control w-full mt-4">
                <label className="label">
                  <span className="label-text text-lg">Age</span>
                </label>
                <input
                  type="number"
                  value={age}
                  onChange={(e) => setAge(e.target.value)}
                  className="input input-bordered w-full"
                />
              </div>

              {/* Gender */}
              <div className="form-control w-full mt-4">
                <label className="label">
                  <span className="label-text text-lg">Gender</span>
                </label>
                <select
                  value={gender}
                  onChange={(e) => setGender(e.target.value)}
                  className="select select-bordered w-full"
                >
                  <option>Male</option>
                  <option>Female</option>
                  <option>Other</option>
                </select>
              </div>

              {/* Skills */}
              <div className="form-control w-full mt-4">
                <label className="label">
                  <span className="label-text text-lg">
                    Skills (comma separated)
                  </span>
                </label>
                <input
                  type="text"
                  value={skills && skills.length > 0 ? skills.join(", ") : ""}
                  onChange={(e) =>
                    setSkills(e.target.value.split(",").map((s) => s.trim()))
                  }
                  className="input input-bordered w-full"
                />
              </div>

              {error && (
                <p className="text-red-500 font-semibold text-center mt-4 animate-shake">
                  {error}
                </p>
              )}

              {/* Submit */}
              <div className="card-actions justify-center mt-6">
                <button
                  className="btn btn-primary w-full"
                  onClick={handleUpdate}
                >
                  Update Profile
                </button>
              </div>
            </div>
          </div>
        </div>
        <div className="w-full max-w-lg">
          <UserFeedCard feedData={userData ? [userData] : []} />
        </div>
        {/* 🔹 CSS for shake animation */}
        <style>
          {`
          @keyframes shake {
            0% { transform: translateX(0); }
            25% { transform: translateX(-5px); }
            50% { transform: translateX(5px); }
            75% { transform: translateX(-5px); }
            100% { transform: translateX(0); }
          }
          .animate-shake {
            animation: shake 2s ease-in-out;
          }
        `}
        </style>
      </div>
    );
};

export default EditProfile;
