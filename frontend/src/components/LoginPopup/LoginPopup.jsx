import "./LoginPopup.css";
import { useContext, useState } from "react";
import { assets } from "../../assets/assets";
import { StoreContext } from "../../context/StoreContext";
import axios from 'axios';
import { toast } from 'react-toastify';

const LoginPopup = ({ setShowLogin }) => {

  const {url, setToken} = useContext(StoreContext)

  const [currState, setCurrState] = useState("Login");
  const [data, setData] = useState({
    firstName : "",
    lastName : "",
    phone : "",
    password : "",
    email : ""
  })

  const onChangeHandler = (e) => {
    const name = e.target.name;
    const value = e.target.value;

    setData(data => ({
      ...data,[name] : value 
    }))
  }

  const onLogin = async (event) => {
    console.log('onLogin function called')
    event.preventDefault();
    let newUrl = url;

    if(currState === 'Login') {
      newUrl += "/api/user/login"
    } else {
      newUrl += "/api/user/register"
    }

    const response = await axios.post(newUrl, data);

    if(response.data.success) {
      toast.success(response.data.message);
      setToken(response.data.token);
      localStorage.setItem("token", response.data.token)
      setShowLogin(false);
    } else {
      console.log(response.data);
      toast.error(response.data.message);
    }
  }


  return (
    <div className="login-popup">
      <form onSubmit={onLogin} className="login-popup-container">
        <div className="login-popup-title">
          <h2>{currState}</h2>
          <img
            onClick={() => setShowLogin(false)}
            src={assets.cross_icon}
            alt=""
          />
        </div>
        <div className="login-popup-inputs">
          {currState === "Login" ? (
            <></>
          ) : (
            <>
              <input
                name="firstName"
                onChange={onChangeHandler}
                type="text"
                placeholder="first name"
                required
                value={data.firstName}
              />
              <input
                name="lastName"
                onChange={onChangeHandler}
                type="text"
                placeholder="last name"
                required
                value={data.lastName}
              />
              <input
                name="phone"
                onChange={onChangeHandler}
                type="Number"
                placeholder="phone number"
                required
                value={data.phone}
              />
            </>     
          )}
          

          <input
            name="email"
            onChange={onChangeHandler}
            type="email"
            placeholder="Your email"
            required
            value={data.email}
          />
          <input
            name="password"
            onChange={onChangeHandler}
            type="password"
            placeholder="Password"
            required
            value={data.password}
          />
          
        </div>

        <button type="submit" >
          {currState === "Sign Up" ? "Create account" : "Login"}
        </button>
        <div className="login-popup-condition">
          <input type="checkbox" required />
          <p>By continuing, i agree to the terms of use and privacy policy.</p>
        </div>
        {currState == "Login" ? (
          <p>
            Create a new account?
            <span onClick={() => setCurrState("Sign Up")}>Click here</span>
          </p>
        ) : (
          <p>
            Already have an account?
            <span onClick={() => setCurrState("Login")}>Click here</span>
          </p>
        )}
      </form>
    </div>
  );
};

export default LoginPopup;
