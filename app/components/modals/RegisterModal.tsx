"use client"

import React, { useCallback, useState } from 'react'
import { AiFillGithub } from 'react-icons/ai'
import axios from 'axios'
import { FcGoogle } from 'react-icons/fc'
import { FieldValues, SubmitHandler, useForm } from 'react-hook-form'
import useRegisterModal from '@/app/hooks/useRegisterModal'
import Modal from './Modal'
import Heading from '../Heading'
import Input from '../inputs/Input'
import { toast } from 'react-hot-toast'
import Button from '../Button'
import { signIn } from 'next-auth/react'
import useLoginModal from '@/app/hooks/useLoginModal'

type Props = {}

const RegisterModal = (props: Props) => {
    const registerModal = useRegisterModal()
    const loginModal = useLoginModal()
    const [isLoading, setIsLoading] = useState(false)
    const form = useForm<FieldValues>({
        defaultValues: {
            name: '',
            email: "",
            password: ''
        }
    })

    const { handleSubmit, register, formState: { errors } } = form

    const onSubmit: SubmitHandler<FieldValues> = async (data) => {
        try {
            setIsLoading(true)
            const res = await axios.post('/api/register', data)
            registerModal.onClose()
        } catch (e: any) {
            console.log(e)
            toast.error("Something went wrong")
        }
        finally {
            setIsLoading(false)
        }
    }

    const toggle = () => {
        registerModal.onClose()
        loginModal.onOpen()
    }


    const bodyContent = (
        <div className="flex gap-4 flex-col">
            <Heading
                title="Welcome to Airbnb"
                subtitle="Create an account"
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
                id="name"
                label="Name"
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
            <hr />
            <Button
                outline
                label="Continue with Google"
                Icon={FcGoogle}
                onClick={() => signIn('google')}
            />
            <Button
                outline
                label="Continue with Github"
                Icon={AiFillGithub}
                onClick={() => signIn('github')}
            />
            <div className="text-neutral-500 text-center  font-light">
                <div className="flex items-center justify-center gap-2">
                    <div>
                        Already have an account?
                    </div>
                    <div onClick={toggle} className="cursor-pointer hover:underline text-neutral-800">
                        Login
                    </div>
                </div>
            </div>
        </div>
    )


    return (
        <div>
            <Modal
                disabled={isLoading}
                isOpen={registerModal.isOpen}
                title="Register"
                actionLabel='Continue'
                onClose={registerModal.onClose}
                onSubmit={handleSubmit(onSubmit)}
                body={bodyContent}
                footer={footerContent}
            />
        </div>
    )
}

export default RegisterModal