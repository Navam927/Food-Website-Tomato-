import "./LoginPopup.css";
import { useContext, useState } from "react";
import { assets } from "../../assets/assets";
import { StoreContext } from "../../context/StoreContext";
import axios from "axios";

const LoginPopup = ({ setShowLogin }) => {

  const {url,setToken}=useContext(StoreContext);
  const [currState, setCurrState] = useState("Login");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [data,setData]=useState({
    name:"",
    email:"",
    password:""
  })
  

  const onChangeHandler=(event)=>{
    const name=event.target.name;
    const value=event.target.value;
    setData(data=>({...data,[name]:value}))

  }

  const onLogin = async(event)=>{
    event.preventDefault();
    let newUrl =url;

    if(currState==="Login"){
      newUrl+="/api/user/login";
    }
    else{
      newUrl +="/api/user/register";
    }
    const response=await axios.post(newUrl,data);

    if(response.data.success){
        setToken(response.data.token);
        localStorage.setItem("token",response.data.token);
        setShowLogin(false);
    }
    else{
      alert(response.data.message);
    }
  }

 
  // hardcoded need to be changed
  const handleLogin = () => {
    if (email === "hello@gmail.com" && password === "1234") {
      alert("Login successful");
    } else {
      alert("No data found. Please sign up.");
    }
  };

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
            <input
              name='name'
              onChange={onChangeHandler}
              value={data.name}
              type="text"
              placeholder="Your name"
              required
              // onChange={(e) => setEmail(e.target.value)}
            />
          )}
          <input
            name='email'
            type="email"
            onChange={onChangeHandler}
            value={data.email}
            placeholder="Your email"
            required
            // onChange={(e) => setEmail(e.target.value)}
          />
          <input
          name='password'

            type="password"
            onChange={onChangeHandler}
            value={data.password}
            placeholder="Password"
            required
            // onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <button type="submit" onClick={handleLogin}>
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
