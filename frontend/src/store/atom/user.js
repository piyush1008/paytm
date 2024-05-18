import {atom,selector} from "recoil";

export const userAtom=atom({
    key:"userAtom",
    default:{
        email:"",
        password:"",
        firstname:"",
        lastname:""
    },
})




export const defaultUserCredentialsLogin=selector({
    key:"defaultUserCredentialsLogin",
    get:({get})=>{
        const userCredentials1=get(userAtom);
        return{
            email:"",
            password:"",
            firstname:"",
            lastname:""
        }
    }
})


export const userLoginAtom=atom({
    key:"userLoginAtom",
    default:{
        email:"",
        password:"",
        isLoggedIn: false,
    },
})

export const defaulUserloginSelector=selector({
    key:"defaulUserloginSelector",
    get:({get})=>{
        const userCredentials1=get(userLoginAtom);
        return{
            email:"",
            password:"",
            firstname:"",
            lastname:""
        }
    }
})