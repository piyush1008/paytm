import React, { useCallback } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useRecoilState, useSetRecoilState } from 'recoil';
import { defaulUserloginSelector, userLoginAtom } from '../store/atom/user';
import axios from "axios";

const Signin = () => {

    const [loginUser,setLoginUser]=useRecoilState(userLoginAtom);
    const navigate=useNavigate()
   

    // const handlechange =(e) => {
    //     const { name, value } = e.target;
    //     setLoginUser((prevCredentials) => ({
    //       ...prevCredentials,
    //       [name]: value,
    //     }));
    //   };

    const handlechange = useCallback((e) => {
        const { name, value } = e.target;
        setLoginUser((prevCredentials) => ({
          ...prevCredentials,
          [name]: value,
        }));
      }, [setLoginUser]);
    
      const loginin=async(e)=>{
        e.preventDefault();
        console.log("user submitted");
        console.log(JSON.stringify(loginUser));
        try{
            const result=await axios.post("http://localhost:3000/api/v1/login",{
                email:loginUser.email,
                password:loginUser.password
            })
            console.log(result)
            console.log(loginUser.email + " "+ loginUser.password)
            localStorage.setItem("token",result.data.token)

            setLoginUser((prevUser) => ({
                ...prevUser,
                isLoggedIn: true // Assuming the response contains the user's name
              }));
            navigate("/")
        }
        catch(error)
        {

            console.log("login error: " + error)
        }
        
    }




  return  (
    <div className="flex justify-center items-center pt-14">
            <div className="w-full max-w-sm p-4  items-center bg-white border border-gray-200 rounded-lg shadow sm:p-6 md:p-8 dark:bg-gray-800 dark:border-gray-700">
                <form className="space-y-6" action="#">
                    <div className='flex justify-center'>
                         <h5 className="text-xl font-bold text-gray-900 dark:text-white">Sign in </h5>
                    </div>
                    <div className='flex justify-center'>
                         <h5 className="text-sm font-light text-black-900 dark:text-black">Enter your credentials to access your account </h5>
                    </div>
                    <div>
                        <label for="email" className="block mb-2 text-sm font-bold text-gray-900 dark:text-white">Email</label>
                        <input type="email" name="email" onChange={handlechange} id="email" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white" placeholder="name@company.com" required />
                    </div>
                    <div>
                        <label for="password" className="block mb-2 text-sm font-bold text-gray-900 dark:text-white">Password</label>
                        <input type="password" name="password"  onChange={handlechange} id="password" placeholder="••••••••" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white" required />
                    </div>

                    <button  onClick={loginin} className="w-full text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Login to your account</button>
                    <div className="flex justify-center text-sm font-medium text-gray-500 dark:text-gray-300">
                        Don't have an account? <Link to="/signup" className="text-blue-700 hover:underline dark:text-blue-500">Sign Up</Link>
                    </div>
                </form>
            </div>
    
    </div>
      )
}

export default Signin