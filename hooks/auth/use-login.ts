import { useLoginMutation } from "@/redux/feartures/authApiSlice";
import { useRouter } from "next/navigation";
import { ChangeEvent, FormEvent, useState } from "react";
import { toast } from "react-toastify";
import { setAuth } from "@/redux/feartures/authSlice";
import { useAppDispatch } from "@/redux/hooks";

export default function useLogin() {
  const dispatch = useAppDispatch()
  const router = useRouter();
  const [login, { isLoading }] = useLoginMutation();
  const [formData, setFormData] = useState({
    email: "",
    password: ""
  });
  const { email, password } = formData;

  const onChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setFormData({ ...formData, [name]: value });
  };

  const onSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    login({ email, password })
      .unwrap()
      .then(() => {
        dispatch(setAuth())
        toast.success("Login Success")
        router.push('/')
      })
      .catch(() => {
        toast.error("Email or Password incorrect")
      });
  };
  return {
    email,
    password,
    isLoading,
    onChange,
    onSubmit,
  };
}
