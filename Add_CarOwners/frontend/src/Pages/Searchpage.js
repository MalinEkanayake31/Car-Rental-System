import React, { useState } from 'react'
import NavBar from '../Components/NavBar'
import { useLocation } from 'react-router-dom'
import Carcard from '../Components/Carcard';
import Footer from '../Components/Footer';

const Searchpage = () => {

    const location=useLocation();
    const { searchResults, searchDetails } = location.state;
    const results=searchResults
    console.log(results);
    

    if (!Array.isArray(searchResults) || searchResults.length === 0) {
        return <div className='bg-black text-white'>No results found.</div>;
    }

    const chunkedResults = [];
    for (let i = 0; i < results.length; i += 5) {
        chunkedResults.push(results.slice(i, i + 5));
    }
    

  return (
    <div className='h-screen'>
        <div className='bg-black'>
        <NavBar/>
        </div>
        
        <div className='p-2 w-full flex justify-around' style={{ backgroundColor: '#c9c9c9' }}>
            <div>
            <p className='text-sm absolute   ml-3 ' style={{ backgroundColor: '#c9c9c9' }}>Location</p>
            <div className='mt-3 w-[300px]  p-1.5 border border-dashed border-black'>
                <p className='text-3xl'>{searchDetails.Location}</p>
            </div>
            </div>
            <div>
            <p className='text-sm absolute  ml-3 ' style={{ backgroundColor: '#c9c9c9' }}>Vehicle Type</p>
            <div className='mt-3 w-[300px]  p-1.5 border border-dashed border-black'>
                <p className='text-3xl'>{searchDetails.Car_type}</p>
            </div>
            </div>
            <div>
            <p className='text-sm absolute  ml-3 ' style={{ backgroundColor: '#c9c9c9' }}>Rent Date</p>
            <div className='mt-3 w-[300px]  p-1.5 border border-dashed border-black'>
                <p className='text-3xl'>{searchDetails.rent_date}</p>
            </div>
            </div>
        </div>
        <div className='flex-grow flex justify-center'>
                <div className='w-screen'>
                    {chunkedResults.map((chunk, rowIndex) => (
                        <div key={rowIndex} className='grid grid-cols-5 gap-5 py-6 px-5 bg-black text-white'>
                            {chunk.map((car, index) => (
                                <Carcard key={index} carname={car.Carname} fuel={car.Fueltype} location={car.Location} price={car.Price} carId={car._id} date={searchDetails.rent_date}/>
                            ))}
                        </div>
                    ))}
                </div>
            </div>

        <Footer/>
    </div>
  )
}

export default Searchpage