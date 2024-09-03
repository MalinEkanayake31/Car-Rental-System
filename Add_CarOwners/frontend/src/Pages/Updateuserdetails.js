import React, { useContext, useEffect, useRef, useState } from "react";
import { IoChevronBackOutline } from "react-icons/io5";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../Context/AuthContext";
import { MdOutlineDownloadDone } from "react-icons/md";
import { toast } from "react-toastify";
import { getDownloadURL, getStorage, ref, uploadBytesResumable } from "firebase/storage";
import { app } from "../firebase";
import { CircularProgressbar } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";

const Updateuserdetails = () => {
  const { authState } = useContext(AuthContext);
  const navigate = useNavigate();
  const userid = authState.user?._id;
  const userrole = authState.user?.role;
  const [user, setUser] = useState({});
  const [imageFile, setImageFile] = useState(null);
  const [imageFileUrl, setImageFileUrl] = useState(null);
  const filePickerRef = useRef(); 
  const [imageUploadProgress, setImageUploadProgress] = useState(null);
  const [imageUploadError, setImageUploadError] = useState(null);

  useEffect(() => {
    const fetchUserDetails = async () => {
      let response;
      if (userrole === "User" || 'Admin') {
        response = await fetch(`http://localhost:8050/api/getcustomer/${userid}`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        });
      } else if (userrole === "CarOwner") {
        response = await fetch(`http://localhost:8050/api/fetchowner/${userid}`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        });
      }
      const responseData = await response.json();
      if (userrole === "User" || 'Admin') {
        setUser(responseData);
      } else if (userrole === "CarOwner") {
        setUser(responseData.carowner);
      }
    };

    fetchUserDetails();
  }, [userid, userrole]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUser((prevUser) => ({
      ...prevUser,
      [name]: value,
    }));
  };

  const handleUpdate = async () => {
    let response;
    if (userrole === "User" || 'Admin') {
      response = await fetch(`http://localhost:8050/api/updatecustomer/${userid}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(user),
      });
    } else if (userrole === "CarOwner") {
      response = await fetch(`http://localhost:8050/api/updateowner/${userid}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(user),
      });
    }

    const responseData = await response.json();
    if (responseData.status || responseData.data) {
      toast.success(responseData.message || responseData.status);
      navigate("/userpro");
    } else {
      toast.error("Failed to update profile");
    }
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImageFile(file);
      setImageFileUrl(URL.createObjectURL(file));
    }
  };

  useEffect(() => {
    if (imageFile) {
      uploadImage();
    }
  }, [imageFile]);

  const uploadImage = () => {
    setImageUploadError(null);
    const storage = getStorage(app);
    const fileName = new Date().getTime() + imageFile.name;
    const storageRef = ref(storage, fileName);
    const uploadTask = uploadBytesResumable(storageRef, imageFile);

    uploadTask.on(
      "state_changed",
      (snapshot) => {
        const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        setImageUploadProgress(progress.toFixed(0));
      },
      (error) => {
        setImageUploadError("Could not upload image");
        setImageUploadProgress(null);
        setImageFile(null);
        setImageFileUrl(null);
      },
      () => {
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
          setImageFileUrl(downloadURL);
          setUser((prevUser) => ({ ...prevUser, profilepicture: downloadURL }));
          toast.success("Profile picture updated successfully!");
          console.log(user);
          
        });
      }
    );
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    handleUpdate();
  };

  return (
    <div className="w-screen h-screen flex gap-10 py-10 justify-center bg-gradient-to-r from-gray-200 to-blue-200">
      <div className="h-1/2 w-1/4 bg-customGray rounded-lg text-white shadow-2xl">
        <button
          onClick={() => navigate(-1)}
          className="pt-3 pl-2 flex w-[75px] transition-all  hover:text-red-500"
        >
          <IoChevronBackOutline className="text-2xl mt-[1px]" />
          <span className="font-semibold m">BACK</span>
        </button>
        <h1 className="font-bold text-center text-2xl">Profile</h1>
        <input type="file" accept="image/*" onChange={handleImageChange} ref={filePickerRef} hidden />
        <div className="relative rounded-full h-[150px] w-[150px] overflow-hidden mx-auto mt-4 mb-4" onClick={() => filePickerRef.current.click()}>
          {imageUploadProgress && (
            <CircularProgressbar
              value={imageUploadProgress || 0}
              text={`${imageUploadProgress}%`}
              strokeWidth={5}
              styles={{
                root: {
                  width: "100%",
                  height: "100%",
                  position: "absolute",
                  top: 0,
                  left: 0,
                },
                path: {
                  stroke: `rgba(62,152,199,${imageUploadProgress / 100})`,
                },
              }}
            />
          )}
          <img
            src={imageFileUrl || user?.profilepicture}
            className={`h-full w-full object-fill ${imageUploadProgress && imageUploadProgress < 100 && "opacity-60"}`}
            alt="Profile"
          />
        </div>
        <h2 className="font-semibold text-center text-xl">
          {user?.username || user?.name}
        </h2>
        <p className="font-semibold text-center text-lg">{user?.email}</p>
      </div>

      <div className="h-full w-2/4 bg-customGray rounded-lg shadow-2xl text-white">
        <div className="flex justify-evenly pl-32 mt-12 pb-12">
          <label className="font-semibold">Name</label>
          {userrole === "CarOwner" ? (
            <input
              type="text"
              className="p-2 w-[350px] rounded-lg text-black"
              name="name"
              id="name"
              value={user?.name}
              onChange={handleInputChange}
              required
            />
          ) : (
            <input
              type="text"
              className="p-2 w-[350px] rounded-lg text-black"
              name="username"
              id="username"
              value={user?.username}
              onChange={handleInputChange}
              required
            />
          )}
        </div>
        <div className="flex pl-32 mt-12 justify-evenly pb-12">
          <label className="font-semibold">Email</label>
          <input
            type="text"
            className="p-2 w-[350px] rounded-lg text-black"
            name="email"
            id="email"
            value={user?.email}
            onChange={handleInputChange}
            required
          />
        </div>

        {user?.age && (
          <div className="flex pl-32 mt-12 justify-evenly pb-12">
            <label className="font-semibold">Age</label>
            <input
              type="text"
              className="p-2 w-[350px] rounded-lg text-black"
              name="age"
              id="age"
              value={user?.age}
              onChange={handleInputChange}
              required
            />
          </div>
        )}
        {user?.mobile && (
          <div className="flex pl-32 mt-12 justify-evenly pb-12">
            <label className="font-semibold">Mobile</label>
            <input
              type="text"
              className="p-2 w-[350px] rounded-lg text-black"
              name="mobile"
              id="mobile"
              value={user?.mobile}
              onChange={handleInputChange}
              required
            />
          </div>
        )}
        {user?.address && (
          <div className="flex pl-32 mt-12 justify-evenly pb-12">
            <label className="font-semibold">Address</label>
            <input
              type="text"
              className="p-2 w-[350px] rounded-lg text-black"
              name="address"
              id="address"
              value={user?.address}
              onChange={handleInputChange}
              required
            />
          </div>
        )}
        <div className="flex justify-center">
          <div
            onClick={handleSubmit}
            className="text-white flex items-center gap-3 bg-blue-500 py-2 w-fit px-4 mt-7 mr-4 rounded-lg cursor-pointer transition-all duration-500 hover:scale-105"
          >
            <MdOutlineDownloadDone />
            <p>Save</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Updateuserdetails;
