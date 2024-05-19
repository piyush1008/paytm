import { useRecoilValue } from "recoil";
import Signin from "./Signin";
import Signup from "./Signup";
import { userAtom, userLoginAtom } from "../store/atom/user";
import User from "./utils/appbar/User";
import Showoptions from "./utils/appbar/Showoptions";
import { useNavigate } from "react-router-dom";


export const Appbar = () => {
    const navigate=useNavigate();
    const loginUser=useRecoilValue(userLoginAtom);
    console.log("appbar render");
    console.log("login username: " + loginUser.email);
    console.log(localStorage.getItem('token'))
    return(
        <div className="flex h-14 shadow justify-between">
            <div onClick={()=>navigate("/")}
            className="flex flex-col  font-bold justify-center  h-full ml-4">
                Paytm App
            </div>

            {localStorage.getItem('token')!==null ? <User />: <Showoptions />}

           
        </div>
    )
}