import React, { useState } from "react";
import NavBar from "../Components/NavBar";
import { useNavigate } from "react-router-dom";
import { toast } from 'react-toastify';

const SignUp = () => {
  const [formData, setformData] = useState({});
  const [errorMessage, setErrorMessage] = useState(null);
  const navigate = useNavigate();

  const handlechange = (e) => {
    setformData({ ...formData, [e.target.id]: e.target.value.trim() });
    console.log(formData);
  };

  const handlesubmit = async (e) => {
    e.preventDefault();
    console.log(formData);
    if (
      !formData.username ||
      !formData.email ||
      !formData.password ||
      !formData.nic ||
      !formData.mobile
    ) {
      setErrorMessage("Please fill out all fields");
    }
    try {
      setErrorMessage(null);
      const res = await fetch("http://localhost:8050/api/signup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });
      const data = await res.json();
      if (data.success === false) {
        return setErrorMessage(data.message);
        toast.error(errorMessage)
      }
      if (res.ok) {
        navigate("/Login");
        toast.success("Sign up successful")
      }
    } catch (error) {
      setErrorMessage("An error Occured. please try again");
      toast.error(errorMessage)
    }
  };
  return (
    <>
      <NavBar />
      <div className="bg-black absolute top-0 left-0 w-full h-full object-cover -z-10">
        <div className="flex mt-48 ml-48 mr-48 bg-gray-100">
          <div className="w-1/2 mt-10">
            <span className="text-3xl text-black font-semibold  pl-10 ">
              Sign Up
            </span>
            <br />
            <p className="text-black text-xl pl-10 pb-5 pt-3">
              Please fill this from to create a new account
            </p>
            <iframe
              src="https://lottie.host/embed/2a767f3e-cfaa-4cb2-86b3-619d6b44d4e3/1BxXxtnyEm.json"
              className="w-[400px] h-[400px]"
            ></iframe>
          </div>
          <div className="bg-white flex-1 ">
            <form className="mt-20 ml-32" onSubmit={handlesubmit}>
              <div className="relative my-4 mt-10">
                <input
                  type="text"
                  className="block w-3/4 py-2.3 px-0 text-sm text-black border-0 border-b-2 border-gray-300 appearance-none dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:text-black focus:border-blue-600 peer"
                  placeholder="Username *"
                  required
                  id="username"
                  onChange={handlechange}
                />
              </div>
              <div className="relative my-4 mt-10">
                <input
                  type="text"
                  className="block w-3/4 py-2.3 px-0 text-sm text-black border-0 border-b-2 border-gray-300 appearance-none dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:text-black focus:border-blue-600 peer"
                  placeholder="NIC *"
                  required
                  id="nic"
                  onChange={handlechange}
                />
              </div>
              <div className="relative my-4 mt-10">
                <input
                  type="text"
                  className="block w-3/4 py-2.3 px-0 text-sm text-black border-0 border-b-2 border-gray-300 appearance-none dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:text-black focus:border-blue-600 peer"
                  placeholder="Mobile No(+94xxxxxxxxx) *"
                  required
                  id="mobile"
                  onChange={handlechange}
                />
              </div>
              <div className="relative my-4 mt-10">
                <input
                  type="email"
                  className="block w-3/4 py-2.3 px-0 text-sm text-white border-0 border-b-2 border-gray-300 appearance-none dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:text-black focus:border-blue-600 peer"
                  placeholder="Email *"
                  required
                  id="email"
                  onChange={handlechange}
                />
              </div>
              <div className="relative my-4 mt-10">
                <input
                  type="password"
                  className="block w-3/4 py-2.3 px-0 text-sm text-white border-0 border-b-2 border-gray-300 appearance-none dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:text-black focus:border-blue-600 peer"
                  placeholder="Password *"
                  required
                  id="password"
                  onChange={handlechange}
                />
              </div>
              <div>
                <label className="">
                  <input type="checkbox" className="w-3 h-3 mr-3 " />I Agree
                  to the{" "}
                  <span className="text-orange-500">Terms and Conditions</span>
                </label>
              </div>
              <button
                type="submit"
                className="w-3/4 text-white h-10 bg-orange-500 mt-8 mb-5"
              >
                SIGN UP
              </button>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};
export default SignUp;
