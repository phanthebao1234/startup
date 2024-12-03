import { useState, ChangeEvent, FormEvent } from 'react';
import { useResetPasswordConfirmMutation } from '@/redux/feartures/authApiSlice';
import { toast } from 'react-toastify';
import { useRouter, useParams } from 'next/navigation';

export default function useResetPasswordConfirm(uid: string, token: string) {
    const router = useRouter()

	const [resetPasswordConfirm, { isLoading }] = useResetPasswordConfirmMutation();

	const [fromData, setFormData] = useState({
        new_password: '',
        re_new_password: '',
    });
    
    const { new_password, re_new_password } = fromData;

	const onChange = (event: ChangeEvent<HTMLInputElement>) => {
		const { name, value } = event.target
        setFormData({...fromData, [name]: value})
	};

	const onSubmit = (event: FormEvent<HTMLFormElement>) => {
		event.preventDefault();

		resetPasswordConfirm({uid, token, new_password, re_new_password})
			.unwrap()
			.then(() => {
				toast.success('Password reset successfully');
                router.push('/auth/login')
			})
			.catch(() => {
				toast.error('Password reset Failed ');
			});
	};

	return {
        new_password,
        re_new_password,
		isLoading,
		onChange,
		onSubmit,
	};
}