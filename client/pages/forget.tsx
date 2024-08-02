import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import styles from '../src/app/styles/LoginUser.module.scss';
import { sendOtp } from '../axios/actions';
import { signIn } from 'next-auth/react';

const Forget = () => {
  const { register, handleSubmit, formState: { errors } } = useForm();
  const [otp, setOtp] = useState<string | null>()

  const submitEmailId = async (data:any) => {
    try {
      const response = await sendOtp(data);
      console.log(response, 'OTP sent successfully');
      setOtp(response.otp)
    } catch (error) {
      console.error('Failed to send OTP:', error);
    }
  };
//   const storeOtp = async(otp:any) => {
//     const result = await signIn("credentials",{
//         redirect:false,
//         ...otp
//     })
//     console.log(result,"gggggggggggggggg")
//   }
//   useEffect(()=> {
//     storeOtp(otp)
//   },[otp])
  return (
    <div>
      <div className={styles.container}>
        <form onSubmit={handleSubmit(submitEmailId)}>
          <h1>Forget Password</h1>
          <label className={styles.label}>Email</label>
          <input className={styles.input} type="text" {...register("email", { required: true })} />
          {errors.email?.type === "required" && (<p role='alert'>Email is required</p>)}
          <button className={styles.btn} type='submit'>Send OTP</button>
        </form>
      </div>
    </div>
  );
};

export default Forget;
