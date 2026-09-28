import { useSelector } from "react-redux"
import { Navigate, Outlet } from "react-router"

const MainProtected = () => {

    const {user} = useSelector((store)=>store.authSlice)


    if(!user){
       return <Navigate to={'/auth'}/>
    }

  return <Outlet />
}

export default MainProtected
