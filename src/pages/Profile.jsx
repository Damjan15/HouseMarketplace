import { useState } from "react"
import { useNavigate } from "react-router-dom"
import { getAuth, updateProfile } from "firebase/auth"
import { doc, updateDoc } from "firebase/firestore"
import { db } from "../config/firebase.config"
import { toast } from "react-toastify"

const Profile = () => {
  const auth = getAuth()
  const navigate = useNavigate()
  const [ name, setName ] = useState(auth.currentUser.displayName)
  const [ email, setEmail ] = useState(auth.currentUser.email)
  const [ changeDetails, setChangeDetails ] = useState(false)



  const onLogout = () => {
    auth.signOut()
    navigate('/')
  }

  const onSubmit = async () => {
    try {
      if (auth.currentUser.displayName !== name) {
        // Update display name
        await updateProfile(auth.currentUser, {
          displayName: name
        })

        // Update in firestore
        const userRef = doc(db, 'users', auth.currentUser.uid)
        await updateDoc(userRef, {
          name
        })
      }
    } catch (error) {
      toast.error("Something went wrong! Please try again.")
    }
  }

  return <div className="profile">
    <header className="profileHeader">
      <p className="pageHeader">My Profile</p>
      <button className="logOut" type="button" onClick={onLogout}>Logout</button>
    </header>

    <main>
      <div className="profileDetailsHeader">
        <p className="profileDetailsText">Personal Details</p>
        <p className="changePersonalDetails" onClick={() => {
          changeDetails && onSubmit()
          setChangeDetails((prev) => !prev)
        }}>{changeDetails ? 'done' : 'change'}</p>
      </div>

      <div className="profileCard">
        <form>
          <input type="text" className={!changeDetails ? 'profileName' : 'profileNameActive'} disabled={!changeDetails} value={name || ''} onChange={(e) => setName(e.target.value)} />

          <input type="text" className={!changeDetails ? 'profileEmail' : 'profileEmailActive'} disabled={!changeDetails} value={email || ''} onChange={(e) => setEmail(e.target.value)} />
        </form>
      </div>
    </main>
  </div>
}

export default Profile