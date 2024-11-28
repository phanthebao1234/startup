
import Link from "next/link"
import type { Metadata } from "next"
import LoginForm from "@/src/components/forms/LoginForm"

export const metadata: Metadata = {
    title: "Full Auth | Login",
    description: "Full Auth login page"
}
export default function LoginPage() {
    return (
        <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
            <div className="sm:mx-auto sm:w-full sm:max-w-sm">

                <h2 className="mt-10 text-center text-2xl/9 font-bold tracking-tight text-gray-900">
                    Login to your account
                </h2>
            </div>

            <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
                <LoginForm />

                <p className="mt-10 text-center text-sm/6 text-gray-500">
                    If you do not account{' '}
                    <Link href="/auth/register" className="font-semibold text-indigo-600 hover:text-indigo-500">
                        Register here
                    </Link>
                </p>
            </div>
        </div>
    )
};
