import { getAuth } from 'firebase/auth';
import { useAuthState } from 'react-firebase-hooks/auth';
import { Navigate, Outlet } from "react-router-dom"

const PrivateRoute = () => {
    const auth = getAuth()
    const [ user, loading, error ] = useAuthState(auth)


    if (loading) {
        return <h1>Loading...</h1>
    }

    return user ? <Outlet /> : <Navigate to="/sign-in" />
}

export default PrivateRoute