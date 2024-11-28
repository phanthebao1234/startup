import { ChangeEvent } from "react";
import Link from "next/link";
interface Props {
    type: string;
    labelId: string;
    onChange: (event: ChangeEvent<HTMLInputElement>) => void;
    value: string;
    children: React.ReactNode;
    required?: boolean;
    link?: {
        linkText: string;
        linkUrl: string;
    }
}
export default function Input({ labelId, type, onChange, value, children, required = false, link }: Props) {
    return (
        <div>
            <div className="flex justify-between align-center">
                <label
                    htmlFor={labelId}
                    className="block text-sm/6 font-medium text-gray-900"
                >
                    {children}
                </label>
                {link && (
                    <div className="text-sm">
                        <Link className="font-semibold text-indigo-600 hover:text-indigo-500" href={link.linkUrl}>
                            {link.linkText}
                        </Link>
                    </div>
                )}
            </div>
            <div className="mt-2">
                <input
                    id={labelId}
                    name={labelId}
                    type={type}
                    required={required}
                    value={value}
                    onChange={onChange}
                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm/6"
                />
            </div>
        </div>
    )
}