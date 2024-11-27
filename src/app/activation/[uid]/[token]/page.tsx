'use client'
import { useEffect } from "react"
import { useActivationMutation } from "@/redux/feartures/authApiSlice"
import { toast } from "react-toastify"
import { useRouter } from 'next/navigation';

interface Props {
    params:  {
        uid: string;
        token: string;
    }
}
export default function Page({params} : Props) {
    
    const router = useRouter();
    const [activation] = useActivationMutation()
    useEffect(() => {
        const { uid, token} = params
        activation({uid, token})
            .unwrap()
            .then(() => {
                toast.success("Account activation")
            })
            .catch(() => {
                toast.error("Failed to activation account")
            })
            .finally(() => {
                router.push('/auth/login')
            })
    }, [])
    
    return (
        <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
            <div className="sm:mx-auto sm:max-w-sm">
                <h1 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tighter text-gray-900">
                    Activation your account ... 
                </h1>
            </div>
        </div>
    )
};
