import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { useFetchData } from '../hooks/useFetchData';

export const UpdateOwner = () => {
    const [formData,setformData] = useState({});
    const [errorMessage,setErrorMessage] = useState(false)
    const {id} = useParams();
    const navigate = useNavigate();
    
    
    const {data:ownerData,loading} = useFetchData('/get/'+id);
    
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
            !formData.address 
          ) {
            setErrorMessage("All fields required");
            
          }
          try {
            setErrorMessage(null);
            const res = await fetch("http://localhost:8050/api/updateCarowner/"+id, {
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
            setformData(ownerData);
        }
     },[ownerData])

     if (loading || !ownerData) {
        return <p>Loading...</p>;
     };
  return (
    <div className=" w-full flex  justify-center ">
    <div className="w-[600px] p-6 mt-12  bg-black rounded-lg absolute bg-opacity-95">
      <form className="mt-20 text-white" onSubmit={handlesubmit} >
        <div className="flex justify-between gap-10 mb-8">
          <label className="font-semibold">Owner Name</label>
          <input
            type="text"
            placeholder="Enter Owner Name"
            className="p-2 w-[350px] rounded-lg text-black"
            id="Ownername"
            onChange={handlechange}
            value={formData.name}
            required
            
          />
        </div>
        <div className="flex justify-between gap-10 mb-8">
          <label className="font-semibold">Owner NIC</label>
          <input
            type="text"
            placeholder="Enter Owner NIC"
            className="p-2 w-[350px] rounded-lg text-black"
            id="OwnerNIC"
            onChange={handlechange}
            value={formData.nic}
            required
          />
        </div>
        <div className="flex justify-between gap-10 mb-8">
          <label className="font-semibold">Owner Age</label>
          <input
            type="text"
            placeholder="Enter Owner Age"
            className="p-2 w-[350px] rounded-lg text-black"
            id="OwnerAge"
            onChange={handlechange}
            value={formData.age}
            required
          />
        </div>
        <div className="flex justify-between gap-10 mb-8">
          <label className="font-semibold">Owner gender</label>
          <input
            type="text"
            placeholder="Enter Owner gender "
            className="p-2 w-[350px] rounded-lg text-black"
            id="OwnerGender"
            onChange={handlechange}
            value={formData.gender}
            required
          />
        </div>
        <div className="flex justify-between gap-10 mb-8">
          <label className="font-semibold">Owner Address</label>
          <input
            type="text"
            placeholder="Enter Owner Address "
            className="p-2 w-[350px] rounded-lg text-black"
            id="OwnerAddress"
            onChange={handlechange}
            value={formData.address}
            required
          />
        </div>
        <div className="mt-16">
          <button
            className="bg-white text-xl ml-64 rounded-2xl border-r-[25px] border-l-[25px] text-black border-white"
            type="submit"
          >
            Update
          </button>
        </div>
      </form>
    </div>
  </div>
  )
}
