import { getAuth } from 'firebase/auth';
import { useAuthState } from 'react-firebase-hooks/auth';
import { Navigate, Outlet } from "react-router-dom"
import { Spinner } from "./"

const PrivateRoute = () => {
    const auth = getAuth()
    const [ user, loading ] = useAuthState(auth)


    if (loading) {
        return <Spinner />
    }

    return user ? <Outlet /> : <Navigate to="/sign-in" />
}

export default PrivateRoute