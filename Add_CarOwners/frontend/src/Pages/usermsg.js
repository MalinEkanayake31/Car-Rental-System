import React, { useContext, useEffect, useState } from 'react';
import { AuthContext } from '../Context/AuthContext';
import Paymsg from '../Components/paymsg';

const Usermsg = () => {
  const {authState,backendDomain}=useContext(AuthContext)
  

  // get rent details
  let userId=''
  if(authState.user){
    userId=authState.user._id
  }
   
  const [rentdata,setrentdata]=useState([])

  const fetchdata=async()=>{
  const response=await fetch(`${backendDomain}/api/displayrent`,{
      method:'post',
      headers:{
        "content-type": "application/json"
      },
      body:JSON.stringify({ userId }) 
    })
    const responsedata=await response.json()
    if(responsedata.success){
      setrentdata(responsedata.data)
    }
  }
  
  useEffect(()=>{
    fetchdata()
  },[])
 

  return (
    <div className="h-screen bg-gradient-to-r from-gray-200 to-blue-200 flex pt-8 overflow-auto ">

      <div className='lg:ml-72 ml-52'>
      {
         rentdata.map(car=>(
           <Paymsg data={car}/>
         ))
      } 
      </div>
    </div>
  );
};

export default Usermsg;



