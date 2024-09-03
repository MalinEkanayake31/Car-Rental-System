import React, { useContext, useState } from "react";
import NavBar from "../Components/NavBar";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../Context/AuthContext";
import { toast } from 'react-toastify';

const Login = () => {
  const {login}=useContext(AuthContext)
  const [formData, setformData] = useState({ email: "", password: "" });
  const [errorMessage, setErrorMessage] = useState(null);
  const navigate = useNavigate();

  const handlechange = (e) => {
    setformData({ ...formData, [e.target.id]: e.target.value.trim() });
    // console.log(formData);
  };

  const handlesubmit = async (e) => {
    e.preventDefault();
    // console.log(formData);
    // return;
    if (!formData.email || !formData.password) {
      setErrorMessage("Please fill out all fields");
      toast.error(errorMessage)
    }
    try {
      setErrorMessage(null);
      const res = await fetch("http://localhost:8050/api/signin", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });
      const data = await res.json();
      if (data.success) {
        console.log(data);
        navigate("/");
        login(data.token,data.data)
        toast.success(data.message)
      }else{
        toast.error(data.message)
      }
    } catch (error) {
      setErrorMessage("An error Occured.Please try again");
      toast.error(errorMessage)
    }
  };
  return (
    <>
      <NavBar />
      <div className="bg-black absolute top-0 left-0 w-full h-full object-cover -z-10">
        <div className="flex mt-48 ml-48 mr-48 bg-gray-100">
          <div className="bg-white flex-1">
            <form className="mt-48 ml-10" onSubmit={handlesubmit}>
              <div className="relative  mt-10">
                <input
                  type="email"
                  className="block w-3/4 py-2.3 px-0 text-sm text-black border-0 border-b-2 border-gray-300 appearance-none dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:text-black focus:border-blue-600 peer "
                  id="email"
                  placeholder="Email *"
                  required
                  value={formData.email}
                  name="email"
                  onChange={handlechange}
                />
              </div>
              <div className="relative  mt-10">
                <input
                  type="password"
                  className="block w-3/4 py-2.3 px-0 text-sm text-black border-0 border-b-2 border-gray-300 appearance-none dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:text-black focus:border-blue-600 peer"
                  id="password"
                  placeholder="Password *"
                  required
                  value={formData.password}
                  name="password"
                  onChange={handlechange}
                />
              </div>
              <button
                className="w-3/4 text-white h-10 bg-orange-500 mt-10 mb-5"
                type="submit"
              >
                LOGIN
              </button>
            </form>
            <span className="ml-10 text-black">Don't Have Account?</span>
            <Link to='/Signup' className="text-orange-500">Sign Up</Link>
          </div>
          <div className="w-[680px] mt-10">
            <span className="text-3xl text-black font-semibold  pl-10 ">
              LOGIN
            </span>
            <br />
            <p className="text-black text-xl pl-10 pb-5 pt-3">
              Enter Your Login Details Here
            </p>
            <iframe
              src="https://lottie.host/embed/623a2081-3b8a-4cb1-8b5c-4e6f63c99e97/qQbQuNdsWT.json"
              className="w-[400px] h-[400px] ml-32"
            ></iframe>
          </div>
        </div>
      </div>
    </>
  );
};

export default Login;
