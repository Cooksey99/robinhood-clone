import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, Redirect } from "react-router-dom";
import * as sessionActions from "../../store/session";
import './SignupForm.css';

function SignupFormPage() {
  const dispatch = useDispatch();
  const sessionUser = useSelector((state) => state.session.user);
  const [email, setEmail] = useState("");
  // const [username, setUsername] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [errors, setErrors] = useState([]);

  if (sessionUser) return <Redirect to="/portfolio" />;

  const handleSubmit = (e) => {
    e.preventDefault();
    if (password === confirmPassword) {
      setErrors([]);
      console.log(email, firstName, lastName, password)

      return dispatch(sessionActions.signup({ email, firstName, lastName, password }))
        .catch(async (res) => {
          const data = await res.json();
          if (data && data.errors) setErrors(data.errors);
        });
    }
    return setErrors(['Confirm Password field must be the same as the Password field']);

  };

  return (
    <>
      <section id="signup-container">
        <div id="signup-page">

          <div className="signup-left">
            <div className="signup-left-contents">
              <div className="filler"></div>
              <h1>Create your login</h1>
              <p>We'll need your name, email address, and a unique password. You'll use this login to access Robbinghood next time.</p>
              <img src="https://cdn.robinhood.com/app_assets/odyssey/rockets.png" alt="rockets" />
            </div>
          </div>

          <div className="signup-right">
            <h1>Sign Up</h1>
            <form onSubmit={handleSubmit} id='signup-form'>
              <ul>
                {errors.map((error, idx) => <li key={idx}>{error}</li>)}
              </ul>
              <div className="signup-names">
                <input
                  placeholder="First name"
                  type="text"
                  value={firstName}
                  onChange={(e) => setFirstName(e.target.value)}
                  required
                />
                <input
                  placeholder="Last name"
                  type="text"
                  value={lastName}
                  onChange={(e) => setLastName(e.target.value)}
                  required
                />
              </div>
              <input
                placeholder="Email"
                type="text"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
              <input
                placeholder="Password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
              <input
                placeholder="Confirm password"
                type="password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                required
              />

              <button type="submit">Sign Up</button>          </form>
              <p>Already have an account?</p>
              <Link to={'/login'}>Log in</Link>
          </div>

        </div>
      </section>
    </>
  );
}

export default SignupFormPage;
