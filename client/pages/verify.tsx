import React, { useState } from 'react'
import styles from "../src/app/styles/LoginUser.module.scss"
import { useForm } from 'react-hook-form'
import { useRouter } from 'next/router'

const Verify = () => {
    const { register, handleSubmit, formState:{errors}} =  useForm()
    const [userData, setUserData] = useState<string | null>(null)  
    const router = useRouter()

    const submitOtp = async (data: any) => {
        
    };
  return (
    <div>
      <div className={styles.container}>
        <form onSubmit={handleSubmit(submitOtp)}>
          <h1>Vorify Otp</h1>
          <label className={styles.label}>Email</label>
          <input className={styles.input} type="text" {...register("email", { required: true })} />
          {errors.email?.type === "required" && (<p role='alert'>Email is required</p>)}
          <button className={styles.btn} type='submit'>Send OTP</button>
        </form>
      </div>
    </div>
  )
}

export default Verify