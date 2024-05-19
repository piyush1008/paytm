import React from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { defaultUserCredentialsLogin, userAtom } from '../store/atom/user'
import axios from "axios"
import { useRecoilState, useSetRecoilState } from 'recoil'

const Signup = () => {
    const [registerUser,setRegisterUser]=useRecoilState(userAtom);
    const navigate=useNavigate();
    const handlechange = (e) => {
        const { name, value } = e.target;
        setRegisterUser((prevCredentials) => ({
          ...prevCredentials,
          [name]: value,
        }));
      };

      const Signup=async(e)=>{
        e.preventDefault();
        console.log("user submitted");
        try{
            const result=await axios.post("http://localhost:3000/api/v1/register",{
                email:registerUser.email,
                password:registerUser.password,
                firstname:registerUser.firstname,
                lastname:registerUser.lastname
            })
            console.log(result)
            console.log(registerUser.email + " "+ registerUser.password)
            localStorage.setItem("token",result.data.token)
            navigate("/signin")
        }
        catch(error)
        {
            console.log(error)
        }
      }

    
  return (
<div className="flex justify-center  bg-slate-300  h-screen items-center pt-14">
        <div className="w-full max-w-sm p-4 space-y-6  items-center bg-white border border-gray-200 rounded-lg shadow sm:p-6 md:p-8 dark:bg-gray-800 dark:border-gray-700">
           
                <div className='flex justify-center'>
                    <h5 className="text-2xl font-black justify-center text-gray-900 dark:text-white">Sign Up</h5>
                </div>
                <div className='flex justify-center'>
                    <h5 className="text-sm font-medium justify-center text-gray-900 dark:text-white">Enter your information to create an account </h5>
                </div>
                <div>
                    <label for="email" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Your email</label>
                    <input type="email" name="email" onChange={handlechange} id="email" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white" placeholder="name@company.com" required />
                </div>
                <div> 
                    <label for="password" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Your password</label>
                    <input type="password" name="password" onChange={handlechange} id="password" placeholder="••••••••" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white" required />
                </div>

                <div>
                    <label for="firstname" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Firstname</label>
                    <input type="text" name="firstname" id="firstname" onChange={handlechange} placeholder="Enter your First Name" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white" required />
                </div>

                <div>
                    <label for="Lastname" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Lastname</label>
                    <input type="text" name="lastname" id="Lastname" onChange={handlechange} placeholder="Enter your Lastname" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white" required />
                </div>

              
                <button type="submit" onClick={Signup} className="w-full text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Sign Up</button>
                <div className="text-sm font-medium text-gray-500 dark:text-gray-300">
                    Already have an account? <Link to="/signin" className="text-blue-700 hover:underline dark:text-blue-500">Login</Link>
                </div>
     
        </div>

</div>
  )
}

export default Signup