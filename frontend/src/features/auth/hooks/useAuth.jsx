import {useForm} from 'react-hook-form'
import { useDispatch } from 'react-redux'
import { loginThunk, registerApiThunk } from "../apis/AuthApis.thunk"
import toast from 'react-hot-toast'
import { useNavigate } from 'react-router'
const useAuth = () => {
   const {register , handleSubmit , formState : {errors} , reset} = useForm()
    const dispatch = useDispatch()
    const navigate = useNavigate()

    const handleRegister = (data)=>{
        if(data.password !== data.confirmPassword){
           return toast.error("Password and confirm password do not match");
        }

        dispatch(registerApiThunk(data))
    }

    const onError = (errors)=>{
        const error = Object.keys(errors)[0]
        toast.error(errors[error].message)
    }

    const handleLogin = (data)=>{
        dispatch(loginThunk(data))
    }

    return {
        handleSubmit,
        register,
        handleRegister,
        onError,
        navigate,
        handleLogin
    }
}

export default useAuth
