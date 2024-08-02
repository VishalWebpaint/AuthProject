import React, { useState } from 'react'
import { useForm } from "react-hook-form";
import axios from 'axios';
import login from '../axios/actions';
import styles from '../src/app/styles/LoginUser.module.scss'
import { signIn, signOut, useSession } from 'next-auth/react';
import { useRouter } from 'next/router';
import Link from 'next/link';

const Login = () => {
    const { register, handleSubmit, formState:{errors}} =  useForm()
    const [userData, setUserData] = useState<any | null>(null)  
    const session = useSession()
    const router = useRouter()
    const submitUserDetails = async(data:any) => {
        try{
            const response = await signIn('credentials',{
              redirect:false,
              ...data
            })
            console.log(response,'kkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkk')
            // router.push("/email")
     
        }catch(error:any){
            console.log(error.message)
        }
    }
const handleLogout = () => {
  signOut()
}
  return (
    <div>
      <div className={styles.container}>
        <h1>Login</h1>
        <form onSubmit={handleSubmit(submitUserDetails)}>
            <label className={styles.label}>email</label>
            <input className ={styles.input} type="text"{...register("email", {required:true})} />
            {errors.username?.type === "required" && (<p role='alert'>email is required</p>)}
            <label  className={styles.label}>password</label>
            <input className ={styles.input}  type="text"{...register("password", {required:true})} />
            {errors.password?.type === "required" && (<p role='alert'>password is required</p>)}
            
        <button className={styles.btn} type="submit">
          Login
        </button>
        <Link href={"/forget"} >Forget Password</Link>
        <p>I dont have account <Link href={"/signup"}>Signup</Link></p>
        </form>
        <button className={styles.logoutbtn}onClick={handleLogout}>
          Logout
        </button>
        </div>
    </div>
  )
}

export default Login