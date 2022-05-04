import { useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import { getAuth, createUserWithEmailAndPassword, updateProfile } from "firebase/auth"
import { setDoc, doc, serverTimestamp } from "firebase/firestore"
import { db } from "../config/firebase.config"
import { ReactComponent as ArrowRightIcon } from "../assets/svg/keyboardArrowRightIcon.svg"
import visibilityIcon from "../assets/svg/visibilityIcon.svg"

const SignUp = () => {
  const navigate = useNavigate()
  const [ name, setName ] = useState("")
  const [ email, setEmail ] = useState("")
  const [ password, setPassword ] = useState("")
  const [ showPassword, setShowPassword ] = useState(false)



  const onSubmit = async (e) => {
    e.preventDefault()


    try {
      const auth = getAuth()

      const userCredential = await createUserWithEmailAndPassword(auth, email, password)
      const user = userCredential.user

      updateProfile(auth.currentUser, {
        displayName: name
      })

      const credsCopy = {
        name,
        email,
        password
      }

      credsCopy.timestamp = serverTimestamp()
      await setDoc(doc(db, 'users', user.uid), credsCopy)
      

      navigate('/')
      
    } catch(error) {
      console.log(error)
    }
  }


  return (
    <>
    <div className="pageContainer">
      <header>
        <p className="pageHeader">Sign Up!</p>
      </header>

      <main>
        <form onSubmit={onSubmit}>
        <input type="text" placeholder="Name" value={name} onChange={(e) => setName(e.target.value)} className="nameInput" />

          <input type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} className="emailInput" />

          <div className="passwordInputDiv">
            <input type={showPassword ? 'text' : 'password'} placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} className="passwordInput" />

            <img src={visibilityIcon} className="showPassword" alt="Show password" onClick={() => setShowPassword((prevState) => !prevState)} />
          </div>

          <Link to="/forgot-password" className="forgotPasswordLink">Forgot Password</Link>

          <div className="signUpBar">
            <p className="signUpText">Sign Up</p>
            <button className="signUpButton">
              <ArrowRightIcon fill="#fff" width="34px" height="34px" />
            </button>
          </div>
        </form>

        {/* Google 0Auth */}

        <Link to="/sign-in" className="registerLink">Sign In Instead</Link>
      </main>
    </div>
  </>
  )
}

export default SignUp