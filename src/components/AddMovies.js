import { useState } from 'react';

const AddMovies = () => {



  return (
   <div className='pt-8 flex flex-col items-center justify-center'>
    <label htmlFor="movieSearch" className='font-bold text-2xl text-gray-800' >
      Search for movie
    </label>
    <input type="text" name="movieSearch" id="movieSearch" placeholder='Enter the name of the movie' className='border-2 rounded-md pl-2 mt-3 border-indigo-600 w-5/6 h-10 sm:w-4/6 lg:w-3/6 2xl:w-2/6'/>
   </div>
  )
}

export {AddMovies}