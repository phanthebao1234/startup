'use client'

import { useResetPasswordConfirm } from "@/hooks/auth";
import Form from "./Form";

interface Props {
    uid: string;
    token: string;
}
export default function PasswordResetConfirmForm({ uid, token }: Props) {
    const { new_password, re_new_password, isLoading, onChange, onSubmit } = useResetPasswordConfirm(uid, token)

    const config = [
        {
            labelText: 'New Password',
            labelId: 'new_password',
            type: 'password',
            onChange,
            value: new_password,
            required: true,
        },
        {
            labelText: 'Confirm new Password',
            labelId: 're_new_password',
            type: 'password',
            onChange,
            value: re_new_password,
            required: true,
        },
    ];

    return (
        <Form
            config={config}
            isLoading={isLoading}
            btnText='Request new password'
            onChange={onChange}
            onSubmit={onSubmit}
        />
    );
};
