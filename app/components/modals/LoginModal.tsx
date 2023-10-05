"use client"

import {signIn} from 'next-auth/react'
import React, { useCallback, useState } from 'react'
import { AiFillGithub } from 'react-icons/ai'
import axios from 'axios'
import { FcGoogle } from 'react-icons/fc'
import { FieldValues, SubmitHandler, useForm } from 'react-hook-form'
import useLoginModal from '@/app/hooks/useLoginModal'
import Modal from './Modal'
import Heading from '../Heading'
import Input from '../inputs/Input'
import {toast} from 'react-hot-toast'
import Button from '../Button'
import {useRouter } from 'next/navigation'
import useRegisterModal from '@/app/hooks/useRegisterModal'


type Props = {}

const LoginModal = (props: Props) => {
    const loginModal = useLoginModal()
    const registerModal = useRegisterModal()
    const [isLoading, setIsLoading] = useState(false)

    const router  = useRouter()
    const form = useForm<FieldValues>({
        defaultValues: {
            email: "",
            password: ''
        }
    })

    const { handleSubmit, register, formState: { errors } } = form

   const onSubmit:SubmitHandler<FieldValues> = async(data) => {
    try{
        setIsLoading(true)
        const res = await signIn('credentials',{
            ...data,
            redirect:false,
        })
        if(res?.ok){
            setIsLoading(false)
            toast.success("Logged in")
            router.refresh()
            loginModal.onClose()
        }

    }catch(e:any){
        toast.error(e.message)
    }
    finally{
        setIsLoading(false)
    }
   }

   const toggle = () => {
    loginModal.onClose()
    registerModal.onOpen()
   }

   const bodyContent = (
    <div className="flex gap-4 flex-col">
        <Heading
        title="Welcome back"
        subtitle="Login to your account"
        />
        <Input 
        id="email" 
        label="Email" 
        disabled={isLoading} 
        register={register}
        errors={errors}
        required
        />
        <Input 
        id="password" 
        type="password"
        label="Password" 
        disabled={isLoading} 
        register={register}
        errors={errors}
        required
        />
    </div>
   )


   const footerContent = (
    <div className="flex flex-col gap-4 mt-3">
        <hr/>
        <Button 
        outline 
        label="Continue with Google" 
        Icon={FcGoogle}
        onClick={() => signIn('google')}
        />
        <Button 
        outline 
        label="Continue with Github" 
        Icon={ AiFillGithub}
        onClick={() => signIn('github')}
        />
        <div className="text-neutral-500 text-center  font-light">
            <div className="flex items-center justify-center gap-2">
                <div>
                First time using Airbnb?
                </div>
                <div onClick={toggle} className="cursor-pointer hover:underline text-neutral-800">
                Create an account
                </div>
            </div>
        </div>
    </div>
   )


    return (
        <div>
            <Modal
                disabled={isLoading}
                isOpen={loginModal.isOpen}
                title="Login"
                actionLabel='Continue'
                onClose={loginModal.onClose}
                onSubmit={handleSubmit(onSubmit)}
                body={bodyContent}
                footer={footerContent}
            />
        </div>
    )
}

export default LoginModal