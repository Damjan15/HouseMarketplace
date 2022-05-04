import { useState } from "react"
import { useNavigate, Link } from "react-router-dom"
import { getAuth } from "firebase/auth"

const Profile = () => {
  const auth = getAuth()
  const navigate = useNavigate()
  const [ name, setName ] = useState(auth.currentUser.displayName)
  const [ email, setEmail ] = useState(auth.currentUser.email)


  const onLogout = () => {
    auth.signOut()
    navigate('/')
  }

  return <div className="profile">
    <header className="profileHeader">
      <p className="pageHeader">My Profile</p>
      <button className="logOut" type="button" onClick={onLogout}>Logout</button>
    </header>
  </div>
}

export default Profile