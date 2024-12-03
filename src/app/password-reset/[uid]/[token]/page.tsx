import { PasswordResetConfirmForm } from "@/src/components/forms";
import { Metadata } from "next";
import Link from "next/link";
import { useParams } from "next/navigation";

export const metadata: Metadata = {
    title: "Full Auth | Password Reset",
    description: "Full Auth password reset page"
}
interface Props {
    params: {
        uid: string;
        token: string;
    }
}
export default function Page({params: {uid, token}} : Props ) {
    
    return (
        <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
            <div className="sm:mx-auto sm:w-full sm:max-w-sm">

                <h2 className="mt-10 text-center text-2xl/9 font-bold tracking-tight text-gray-900">
                    Reset Password
                </h2>
            </div>

            <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
                <PasswordResetConfirmForm uid={uid} token={token} />

                <p className="mt-10 text-center text-sm/6 text-gray-500">
                    If you do not account{' '}
                    <Link href="/auth/register" className="font-semibold text-indigo-600 hover:text-indigo-500">
                        Register here
                    </Link>
                </p>
            </div>
        </div>
    );
};
