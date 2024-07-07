import React, { useState } from 'react'
import {Link,useNavigate} from 'react-router-dom'
import {useDispatch, useSelector} from 'react-redux';
import { signInStart,signInFailure,signInSuccess } from '../redux/user/userSlice';
export default function SignIp() {
    const [formData,setFormData]=useState({}) 
    const{loading,error} =useSelector((state)=>state.user)
    const navigate = useNavigate();
    const dispatch =useDispatch();

    const handleChange =(e)=>{
        setFormData({
            ...formData, 
            [e.target.id]:e.target.value,
        });
     
    };
    const apiUrl = 'http://localhost:3000'; // Replace <backend-ip-address> with the actual IP


    const handleSubmit = async (e) => {
        e.preventDefault(); 
      
        try {
           dispatch(signInStart())
            const res =await fetch(`${apiUrl}/api/auth/signIn`,{
                method:'POST',
                headers:{
                    "accept": "application/json",
                    'Content-Type':'application/json',
                },
                body:JSON.stringify(formData),
             

            });
            console.log(formData)
            console.log(res)
            const data = await res.json();
            if(data.success===false){
              dispatch(signInFailure(data.message))
                return;
            
            }
            dispatch(signInSuccess(data))
            navigate('/')
            console.log(data)
            
        } catch (error) {
                dispatch(signInFailure(error.message))
            
        }

    
    };

    console.log(formData)
  return (
  
    <div className='p-3 mx-auto max-w-lg '>
   <h1 className='text-3xl text-center font-semibold my-7'>
    Sign In
   </h1>
   <form className='flex flex-col gap-4'  onSubmit={handleSubmit}>
  
    <input type="text"
     placeholder='Email'
      className='border  p-3 rounded-lg '
       id='email'
    onChange={handleChange} />
    <input type="password"
     placeholder='Password'
      className='border p-3 rounded-lg'
       id='password'
   onChange={handleChange} />
    <button disabled={loading} className=' bg-slate-700 rounded-lg p-3 text-white uppercase hover:opacity-95 disabled:opacity-80'>
{loading ? 'loading...':'Sign In'}
    </button>
   </form>
   <div className='flex mt-5 gap-2'>
    <p>
      Don't have an account ?
    </p>
    <Link to={'/signup'}>
    <span className='text-blue-700 '>
        Sign Up
    </span>

    </Link>
   </div>
   {error && <p className='text-red-500 mt-5'>{error}
    
    </p>}
    </div>
  )
}
