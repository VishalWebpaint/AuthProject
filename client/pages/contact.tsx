import { error } from 'console'
import React, { useEffect, useState } from 'react'
import { set, useForm } from 'react-hook-form'
import { email } from '../axios/actions'
import styles from "../src/app/styles/CreateUser.module.scss"
import { signOut } from 'next-auth/react'

const Email = () => {
    const {register, setValue, handleSubmit, formState:{errors}}  = useForm()
    const [userEmailId, setUserEmailId] = useState<string | null>(null)
    const [userMessage, setUserMessage] = useState<string | null>(null)
    const [subject, setSubject] = useState<string | null>(null)

    const submitEmail = async(data:any) => {
        console.log(data,'lllll')
        setUserEmailId(JSON.stringify(data.email))
        setUserMessage(JSON.stringify(data.message))
        setSubject(JSON.stringify(data.subject))
  
        // const response = await email(userEmailId, userMessage, subject)
    }

    useEffect(()=> {
        setValue("email", userEmailId)
    },[userEmailId])
  
  return (
    <div>
        <div className={styles.container}>
            <h1>Send Mail</h1>
        <form onSubmit={handleSubmit(submitEmail)}>
            <label className={styles.label}>TO</label>
            <input className={styles.input} type="email" {...register ('email', {required:true})} />
            {errors.email?.type === "required" && (<p role='alert'>email is required</p>)}

            <label className={styles.label}>Subject</label>
            <input className={styles.input} type="text" {...register ("subject", {required:true})}/>
            {errors.subject?.type === "required" && (<p role='alert'>subject is required</p>)}

            <textarea placeholder='Write your message...' className={styles.textField} {...register ('message', {required:true})}></textarea>
            <button className={styles.btn} type='submit'>Send mail</button>
        </form>
        </div>
    </div>
  )
}

export default Email