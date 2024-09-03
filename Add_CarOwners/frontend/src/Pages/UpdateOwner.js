import React, { useEffect, useState } from 'react';
import { useNavigate, useParams, } from 'react-router-dom';
import { useFetchData } from '../hooks/useFetchData';
import { Button } from 'flowbite-react';

export const UpdateOwner = () => {
    const [formData,setformData] = useState({});
    const [errorMessage,setErrorMessage] = useState(false);
    const {id} = useParams();
    const navigate = useNavigate();
    
    
    const {data:ownerData,loading} = useFetchData('/fetchowner/'+id);
    
    
     const handlechange = (e)=>{
            setformData({...formData,[e.target.id]:e.target.value.trim()})
     };

     const handlesubmit = async (e) =>{
        e.preventDefault();
        
        
        if (
            !formData.name ||
            !formData.nic ||
            !formData.age ||
            !formData.gender ||
            !formData.address ||
            !formData.email ||
            !formData.password
          ) {
            setErrorMessage("All fields required");
            
          }
          try {
            setErrorMessage(null);
            const res = await fetch("http://localhost:8050/api/updateowner/"+id, {
              method: "PUT",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify(formData),
            });
            const data = await res.json();
            if (data.success === false) {
              return setErrorMessage(data.message);
            }
            if (res.ok){
              navigate("/admin/owner-details");
            }
          } catch (error) {
            setErrorMessage("An error Occured.please try again");
          }
     };

     useEffect(()=>{
        if (ownerData) {
            setformData(ownerData.carowner);
            
            
        }
     },[ownerData])

     if (loading || !ownerData) {
        return <p>Loading...</p>;
     };
     
     
  return (
    <div className="flex-grow h-screen w-full overflow-auto bg-gradient-to-r from-gray-200 to-blue-200 p-6 sm:p-8 md:p-12 text-white  flex justify-center items-center">
      <div className=" p-10 mt-12 ml-72   bg-black rounded-lg absolute bg-opacity-95">
      <form className="flex flex-col w-[500px] ">
          <div className="flex justify-between gap-10 mb-8">
            <label className="font-semibold">Owner Name</label>
            <input
              type="text"
              placeholder="Enter Car Owner Name"
              className="p-2 w-[350px] rounded-lg text-black"
              id="name"
              value={formData.name}
              onChange={handlechange}
              required
            />
          </div>
          <div className="flex justify-between gap-10 mb-8">
            <label className="font-semibold">NIC</label>
            <input
              type="text"
              placeholder="Enter Car Owner NIC"
              className="p-2 w-[350px] rounded-lg text-black"
              id="nic"
              value={formData.nic}
              onChange={handlechange}
              required
            />
          </div>
          <div className="flex justify-between gap-10 mb-8">
            <label className="font-semibold">Age</label>
            <input
              type="text"
              placeholder="Enter Car Owner Age"
              className="p-2 w-[350px] rounded-lg text-black"
              id="age"
              value={formData.age}
              onChange={handlechange}
              required
            />
          </div>
          <div className="flex justify-between gap-10 mb-8">
            <label className="font-semibold">Gender</label>
            <input
              type="text"
              placeholder="Enter Car Owner Gender"
              className="p-2 w-[350px] rounded-lg text-black"
              id="gender"
              value={formData.gender}
              onChange={handlechange}
              required
            />
          </div>
          <div className="flex justify-between gap-10 mb-8">
            <label className="font-semibold">Address</label>
            <input
              type="text"
              placeholder="Enter Car Owner Address"
              className="p-2 w-[350px] rounded-lg text-black"
              id="address"
              value={formData.address}
              onChange={handlechange}
              required
            />
          </div>
          <div className="flex justify-between gap-10 mb-8">
            <label className="font-semibold">Email</label>
            <input
              type="email"
              placeholder="Enter Car Owner Email"
              className="p-2 w-[350px] rounded-lg text-black"
              id="email"
              value={formData.email}
              onChange={handlechange}
              required
            />
          </div>
        
        <Button
          type="submit" 
          onClick={handlesubmit}
          gradientMonochrome="success"
          className="p-2.5 bg-white text-black text-lg border-none rounded-md cursor-pointer hover:bg-gray-300"
        >
          Update Owner
        </Button>
      </form>
      </div>
    </div>
  )
}
