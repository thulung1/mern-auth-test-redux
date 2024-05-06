import axios from "axios";
import { useState } from "react";
import { BASE_URL } from "../url";
import { useNavigate } from "react-router-dom";
import { signInStart, signInSuccess, signInFailure } from "../features/user/userSlice";
import {useDispatch, useSelector} from 'react-redux'

function Login() {
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const dispatch = useDispatch()
  const {loading, error} = useSelector(state=>state.user)

  const navigate = useNavigate()

  const handleLogin = async () => {
    try {
      dispatch(signInStart())
      const res = await axios.post(
        `${BASE_URL}/api/v1/user/login`,
        {
          email,
          password,
        },
        { withCredentials: true }
      );
      if(res.data){
        dispatch(signInSuccess(res.data))
        navigate('/')
      }
    } catch (error) {
      console.log(error);
      dispatch(signInFailure(error))
    }
  };

  if(loading){
    return <div>Loading....</div>
  }

  return (
    <div>
      <h2>Login</h2>
      <div style={{ display: "flex", flexDirection: "column", gap: "4px" }}>
        <input
          onChange={(e) => setEmail(e.target.value)}
          value={email}
          type="text"
          placeholder="email"
          style={{ height: "40px", borderRadius: "5px" }}
        />
        <input
          onChange={(e) => setPassword(e.target.value)}
          value={password}
          type="password"
          placeholder="password"
          style={{ height: "40px", borderRadius: "5px" }}
        />
        <button
          onClick={handleLogin}
          style={{ background: "rgb(63, 157, 233)", color: "white" }}
        >
          Login
        </button>
      </div>
      <p style={{color: "red"}}> {error ? error.response.data || 'Something went wrong' : ""}</p>
    </div>
  );
}

export default Login;
