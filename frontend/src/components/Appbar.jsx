import { useRecoilValue } from "recoil";
import Signin from "./Signin";
import Signup from "./Signup";
import { userAtom, userLoginAtom } from "../store/atom/user";
import User from "./utils/appbar/User";
import Showoptions from "./utils/appbar/Showoptions";


export const Appbar = () => {
    const loginUser=useRecoilValue(userLoginAtom);
    console.log("appbar render");
    console.log("login username: " + loginUser.email);
    console.log(localStorage.getItem('token'))
    return(
        <div className="flex h-14 shadow justify-between">
            <div className="flex flex-col  font-bold justify-center  h-full ml-4">
                Paytm App
            </div>

            {localStorage.getItem('token')!==null ? <User />: <Showoptions />}

           
        </div>
    )
}