import React, { useContext, useEffect, useState } from 'react'
import { IoChevronBackOutline } from "react-icons/io5";
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../Context/AuthContext';
import { MdEdit } from "react-icons/md";
import { MdDelete } from "react-icons/md";
import { toast } from "react-toastify";
import { Button, Modal } from "flowbite-react";
import { HiOutlineExclamationCircle } from 'react-icons/hi';

const Userdetail = () => {
  const { authState, logout } = useContext(AuthContext);
  const navigate = useNavigate();
  const [showModal, setShowModal] = useState(false);
  
  const userid = authState.user?._id;
  const userrole = authState.user?.role;
  const [user, setUser] = useState({});
  
  console.log(userrole);
  
  const userdetails = async () => {
    try {
      let response;
      if (userrole === 'User' || 'Admin') {
        response = await fetch(`http://localhost:8050/api/getcustomer/${userid}`, {
          method: 'GET',
          headers: {
            "content-type": "application/json"
          }
        });
      } else if (userrole === 'CarOwner') {
        response = await fetch(`http://localhost:8050/api/fetchowner/${userid}`, {
          method: 'GET',
          headers: {
            "content-type": "application/json"
          }
        }); 
      }
      
      if (response.ok) {
        const responsedata = await response.json();
        console.log('Response Data:', responsedata);
        
        if (userrole === 'User' || 'Admin') {
          setUser(responsedata);
        } else if (userrole === 'CarOwner') {
          setUser(responsedata.carowner || {});
          console.log(user);
          
        }
      } else {
        console.error('Failed to fetch user details');
      }
    } catch (error) {
      console.error('Error fetching user details:', error);
    }
  };

  useEffect(() => {
    userdetails();
  }, []);

  const handleEdit = () => {
    navigate('/userpro/upd');
  };

  const handleDelete = async () => {
    try {
      let response;
      if (userrole === 'User' || 'Admin') {
        response = await fetch(`http://localhost:8050/api/deletecustomer/${user._id}`, {
          method: 'DELETE',
          headers: {
            "content-type": "application/json"
          }
        });
      } else if (userrole === 'CarOwner') {
        response = await fetch(`http://localhost:8050/api/deleteowner/${user._id}`, {
          method: 'DELETE',
          headers: {
            "content-type": "application/json"
          }
        });
      }

      const responsedata = await response.json();
      if (response.ok && (responsedata.message || responsedata.status)) {
        toast.success(responsedata.message || responsedata.status);
        navigate('/');
        logout();
      } else {
        toast.error('Failed to delete profile');
      }
    } catch (error) {
      console.error('Error deleting profile:', error);
      toast.error('Error deleting profile');
    }
  };
  
  
  return (
    <div className='w-screen h-screen flex gap-10 py-10 justify-center bg-gradient-to-r from-gray-200 to-blue-200'>
      <div className='h-1/2 w-1/4 bg-customGray rounded-lg text-white shadow-2xl'>
        <button onClick={() => navigate('/')} className='pt-3 pl-2 flex w-[75px] transition-all  hover:text-red-500'>
          <IoChevronBackOutline className='text-2xl mt-[1px]'/>
          <span className='font-semibold m'>BACK</span>
        </button>
        <h1 className='font-bold text-center text-2xl'>Profile</h1>
        <div className='rounded-full h-[150px] w-[150px] overflow-hidden mx-auto mt-4 mb-4'>
          <img src={user?.profilepicture} className="h-full w-full object-fill" alt="Profile" />
        </div>
        <h2 className='font-semibold text-center text-xl'>{user?.username || user?.name}</h2>
        <p className='font-semibold text-center text-lg'>{user?.email}</p>
      </div>
      
      <div className='h-full w-2/4 bg-customGray rounded-lg shadow-2xl text-white'>
        <div className='flex pl-32 mt-12 gap-40 border-b-4 pb-12 border-white'>
          <h3 className='text-lg '>Name</h3>
          <h3 className='text-xl font-semibold '>{user?.username || user?.name}</h3>
        </div>
        <div className='flex  pl-32 mt-12 gap-40 border-b-4 border-white pb-12'>
          <h3 className='text-lg '>Email</h3>
          <h3 className='text-xl font-semibold '>{user?.email}</h3>
        </div>
        {
         user?.age && (
              <div className='flex  pl-32 mt-12 gap-48 border-b-4 border-white pb-12'>
                <h3 className='text-lg w-fit '>Age</h3>
                <h3 className='text-xl font-semibold '>{user?.age}</h3>
              </div>
          )
        }
        {
          user?.mobile && (
              <div className='flex  pl-32 mt-12 gap-20 border-b-4 border-white pb-12'>
                <h3 className='text-lg w-fit '>Mobile Number</h3>
                <h3 className='text-xl font-semibold '>{user?.mobile}</h3>
              </div>
          )
        }
        {
         user?.address && (
              <div className='flex  pl-32 mt-12 gap-44 border-b-4 border-white pb-12'>
                <h3 className='text-lg w-fit '>Address</h3>
                <h3 className='text-xl font-semibold '>{user?.address}</h3>
              </div>
          )
        }
        <div className='flex justify-between'>
          <div onClick={handleEdit} className='text-white flex items-center gap-3 bg-orange-400 py-2 w-fit px-2 mt-7 ml-4 rounded-lg cursor-pointer transition-all duration-500 hover:scale-105'>
            <MdEdit/> 
            <p>Edit Profile</p>
          </div>
          <div onClick={() => setShowModal(true)} className='text-white flex items-center gap-3 bg-red-600 py-2 w-fit px-2 mt-7 mr-4 rounded-lg cursor-pointer transition-all duration-500 hover:scale-105'>
            <MdDelete/> 
            <p>Delete Profile</p>
          </div>
        </div>
        
      </div>
      <Modal
        show={showModal}
        onClose={() => setShowModal(false)}
        popup
        size='lg'
        >
        <Modal.Header/>
        <Modal.Body>
          <div className='text-center'>
            <HiOutlineExclamationCircle className='h-14 w-14 text-gray-400 dark:text-gray-200 mb-4 mx-auto' />
            <h3 className='mb-5 text-lg text-gray-500 dark:text-gray-400'>
              Are you sure you want to delete your Profile?
            </h3>
            <div className='flex justify-center gap-4'>
              <Button  color='failure' onClick={handleDelete}>
                Yes, I'm sure
              </Button>
              <Button color='gray' onClick={() => setShowModal(false)}>
                No, cancel
              </Button>
            </div>
          </div>
        </Modal.Body>
      </Modal>
      
    </div>
  );
};

export default Userdetail;
