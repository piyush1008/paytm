import React from 'react'
import { useNavigate } from 'react-router-dom'

const Showoptions = () => {
    const navigate=useNavigate();
  return (
    <div className='flex flex-row font-semibold m-2'>
        <div>
            <button type="button" onClick={()=>{
                navigate("/signin")
            }} className="text-white bg-gray-800 hover:bg-gray-900 focus:outline-none focus:ring-4 focus:ring-gray-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-gray-800 dark:hover:bg-gray-700 dark:focus:ring-gray-700 dark:border-gray-700">Login</button>
        </div>
        <div>
            <button type="button" onClick={()=>{
                navigate("/signup")
            }} className="text-white bg-gray-800 hover:bg-gray-900 focus:outline-none focus:ring-4 focus:ring-gray-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-gray-800 dark:hover:bg-gray-700 dark:focus:ring-gray-700 dark:border-gray-700">Sign Up</button>
        </div>
    </div>
  )
}

export default Showoptions