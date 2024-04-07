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
    <button>Logout</button>
  )
}

export default LogOutBtn
