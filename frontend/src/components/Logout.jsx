import React from 'react'
import Button from './utils/Button';
import axios from "axios"
import { useNavigate } from 'react-router-dom';
import { useSetRecoilState } from 'recoil';
import { userLoginAtom } from '../store/atom/user';



const Logout = () => {
  const setUser=useSetRecoilState(userLoginAtom);
  const  navigate=useNavigate();
    console.log("logign out ");
  const logout = async() => {
    try{
      const result=await axios.get("http://localhost:3000/api/v1/logout");
      console.log(result);
  
      localStorage.clear();

      setUser({
        email:"",
        password:"",
        isLoggedIn:false,
      })

      navigate("/")
    }
    catch(error)
    {
        console.log("error: " + error)
    }
  }

  return (
    <>
        <Button label="Logout" onClick={logout}/>
    </>
  )
}

export default Logout