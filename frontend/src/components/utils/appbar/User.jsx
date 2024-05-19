import React from 'react'
import Logout from '../../Logout'
import { useRecoilValue } from 'recoil'
import { userLoginAtom } from '../../../store/atom/user'

const User = () => {
  const loginUser=useRecoilValue(userLoginAtom)
  return (
    <div className="flex flex-row font-semibold justify-center h-full space-x-2 mr-2">
      <div className='flex items-center justify-center'>
        {loginUser.name}
      </div>
      <div className='flex items-center justify-center'>
       <Logout />
      </div>
    </div>
  )
}

export default User