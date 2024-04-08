import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { login } from '../store/authSlice';
import { Button, Input, Logo } from './index';
import authService from '../Appwrite/auth';
import { useForm } from 'react-hook-form'

function Login() {

    const navigate = useNavigate();
    const dispatch = useDispatch();
    const { register, handleSubmit } = useForm();
    const [error, setError] = useState("")

    return (
        <div>

        </div>
    )
}

export default Login
