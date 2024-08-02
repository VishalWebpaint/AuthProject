import React, { useState } from 'react'
import { useForm } from "react-hook-form";
import axios from 'axios';
import { useRouter } from 'next/router';
import { signup } from '../axios/actions';
import styles from "../src/app/styles/CreateUser.module.scss"

const Signup = () => {
    const { register, handleSubmit, formState:{errors}} =  useForm()
    const [userData, setUserData] = useState<string | null>(null)  
    const router = useRouter()

    const submitUserDetails = async (data: any) => {
      try {
          const response = await signup(data); 
          setUserData(response); 
          router.push("/login");
      } catch (error: any) {
          console.log(error.message);
      }
  };

  return (
    <div>
      <div className={styles.container}>
        <h1>SignUp</h1>
        <form onSubmit={handleSubmit(submitUserDetails)}>
            <label className={styles.label}>username</label>
            <input  className={styles.input} type="text"{...register("username", {required:true})} />
            {errors.username?.type === "required" && (<p role='alert'>username is required</p>)}
            <label  className={styles.label}>password</label>
            <input  className={styles.input} type="text"{...register("password", {required:true})} />
            {errors.username?.type === "required" && (<p role='alert'>password is required</p>)}
            <label  className={styles.label} >email</label>
            <input  className={styles.input} type="text"{...register("email", {required:true})} />
            {errors.username?.type === "required" && (<p role='alert'>email is required</p>)}
            <label  className={styles.label}>phoneNumber</label>
            <input  className={styles.input} type="text"{...register("phoneNumber", {required:true})} />
            {errors.username?.type === "required" && (<p role='alert'>phoneNumber is required</p>)}
            
        <button  className={styles.btn} type="submit">
        SignUp
        </button>
        </form>
        </div>
    </div>
  )
}

export default Signup