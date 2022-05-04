import { useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import { ReactComponent as ArrowRightIcon } from "../assets/svg/keyboardArrowRightIcon.svg"
import visibilityIcon from "../assets/svg/visibilityIcon.svg"

const SignIn = () => {
  const navigate = useNavigate()
  const [ email, setEmail ] = useState("")
  const [ password, setPassword ] = useState("")
  const [ showPassword, setShowPassword ] = useState(false)


  return (
    <>
      <div className="pageContainer">
        <header>
          <p className="pageHeader">Welcome Back!</p>
        </header>

        <main>
          <form>
            <input type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} className="emailInput" />

            <div className="passwordInputDiv">
              <input type={showPassword ? 'text' : 'password'} placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} className="passwordInput" />

              <img src={visibilityIcon} className="showPassword" alt="Show password" onClick={() => setShowPassword((prevState) => !prevState)} />
            </div>

            <Link to="/forgot-password" className="forgotPasswordLink">Forgot Password</Link>

            <div className="signInBar">
              <p className="signInText">Sign In</p>
              <button className="signInButton">
                <ArrowRightIcon fill="#fff" width="34px" height="34px" />
              </button>
            </div>
          </form>

          {/* Google 0Auth */}

          <Link to="/sign-up" className="registerLink">Sign Up Instead</Link>
        </main>
      </div>
    </>
  )
}

export default SignIn