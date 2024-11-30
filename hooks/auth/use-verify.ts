import { useVerifyMutation } from "@/redux/feartures/authApiSlice"
import { finishInitialLoad, setAuth } from "@/redux/feartures/authSlice"
import { useAppDispatch } from "@/redux/hooks"
import { useEffect } from "react"

export default function useVerify() {
	const dispatch = useAppDispatch();

	const [verify] = useVerifyMutation();

	useEffect(() => {
		verify(undefined)
			.unwrap()
			.then(() => {
				dispatch(setAuth());
			})
			.finally(() => {
				dispatch(finishInitialLoad());
			});
	}, []);
}