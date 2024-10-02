import React from 'react'
import {useDispatch} from 'react-redux'
import authService from '../../Appwrite/auth'
import { logOut } from '../../store/authSlice'

function LogOutBtn() {
    const dispatch = useDispatch()
    const logOutHandler = () => {
        authService.logOut().then(() => {
            dispatch(logOut())
        })
    }
  return (
    <button className='inline-block px-6 py-2
                  mx-2 my-auto hover:bg-blue-200 hover:text-gray-800 rounded-full transition duration-150'
     onClick={logOutHandler}>
      Log Out</button>
  )
}

export default LogOutBtn
