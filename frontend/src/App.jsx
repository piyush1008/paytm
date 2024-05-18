import { useState } from 'react'
import {BrowserRouter,Route, Routes, useNavigate} from "react-router-dom"
import './App.css'
import Signup from './components/Signup';
import Signin from './components/Signin';
import Dashboard from './components/Dashboard';
import SendMoney from './components/SendMoney';
import Home from './components/Home';
import { Appbar } from './components/Appbar';
import { useRecoilValue } from 'recoil';
import { userAtom, userLoginAtom } from './store/atom/user';

function App() {
  console.log("app re-render")
  const user = useRecoilValue(userLoginAtom)
  console.log("use is" + JSON.stringify(user))
  return (
    <BrowserRouter>
      <Appbar />
        <Routes>
        <Route path="/" element={<Home />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/signin" element={<Signin />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/send" element={<SendMoney />} />
        </Routes>
   </BrowserRouter>
     
  )
}

export default App
