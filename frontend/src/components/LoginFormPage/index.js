import React, { useState } from "react";
import * as sessionActions from "../../store/session";
import { useDispatch, useSelector } from "react-redux";
import { Link, Redirect, useHistory } from "react-router-dom";
import './LoginForm.css';

export function LoginFormPage() {
  const dispatch = useDispatch();
  const history = useHistory();
  const sessionUser = useSelector((state) => state.session.user);
  const [credential, setCredential] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState([]);

  if (sessionUser) return <Redirect to="/" />;

  const handleSubmit = (e) => {
    e.preventDefault();
    setErrors([]);
    return dispatch(sessionActions.login({ credential, password }))
      .catch(async (res) => {
        const data = await res.json();
        if (data && data.errors) setErrors(data.errors);
      });
  };

  const demo = async (e) => {
    e.preventDefault();
    const credential = "demo@user.io";
    const password = "password";
    await dispatch(sessionActions.login({ credential, password }));
    return history.push("/portfolio")
  };

  return (
    <>
      <div id="login-page">
        <div className="login-left">
          <img id='login-image' src="https://cdn.robinhood.com/assets/generated_assets/web-bundle-lazy-route-prod-experiment/member/632fcb3e7ed928b2a960f3e003d10b44.jpg" />
        </div>
        <div className="login-right">
          <div id="login-form">
            <h1>Log in to Robbinghood</h1>
            <form onSubmit={handleSubmit}>
              <div className="form-no-button">
                <ul>
                  {errors.map((error, idx) => (
                    <li key={idx}>{error}</li>
                  ))}
                </ul>
                <div className="label-input-pair">
                  <label>
                    Username or Email
                  </label>
                  <input
                    type="text"
                    value={credential}
                    onChange={(e) => setCredential(e.target.value)}
                    required
                  />
                </div>
                <div className="label-input-pair">
                  <label>
                    Password
                  </label>
                  <input
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                  />
                </div>
                <div id="login-buttons">
                  <button type="submit">Log In</button>
                  <button type="submit" onClick={demo}>Demo User</button>
                </div>
              </div>
            </form>
            <p id="signup-link">Not on Robbinghood? <Link to={'/signup'}>Create an account</Link></p>
          </div>
        </div>
      </div>
    </>
  );
}

export default LoginFormPage;
