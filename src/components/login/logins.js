import React, {useState} from "react";
import { Redirect } from "react-router-dom";

export const Logins = () => {

    const [loginStatus, setLoginStatus] = useState(false)


    const login = () => {
      setLoginStatus(true)
      localStorage.setItem("token", "succesfully")
    }
    
    if (loginStatus) return  <Redirect to={{pathname: "/"}} />;

    return (
      <div className="base-container" >
        <div className="header">Login</div>
        <div className="content">
          <div className="form">
            <div className="form-group">
              <label htmlFor="username">Employer ID</label>
              <input type="text" name="username" placeholder="username" />
            </div>
            <div className="form-group">
              <label htmlFor="password">Password</label>
              <input type="password" name="password" placeholder="password" />
            </div>
          </div>
        </div>
        <div className="footer">
          <button onClick={login} type="button" className="btn">
            Login
          </button>
        </div>
      </div>
    );
}