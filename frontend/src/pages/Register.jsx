import { useState } from "react";
import axios from "axios";
import { BASE_URL } from "../url";
import { useNavigate } from "react-router-dom";

function Register() {
  const [username, setUsername] = useState();
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const navigate = useNavigate()
  const [error, setError]= useState(false)

  const handleRegister = async () => {
   try{
    const res = await axios.post(`${BASE_URL}/api/v1/user/register`, {
      username,
      email,
      password,
    });
    if(res.data){
      console.log(res.data);
      setError(false)
      navigate("/login")
    }
   }catch(error){
    console.log("error is ",error);
    console.log(error.response.data);
    setError(true)
   }
  };

  return (
    <div>
      <h2>Register</h2>
      <div style={{ display: "flex", flexDirection: "column", gap: "4px" }}>
        <input
          onChange={(e) => setUsername(e.target.value)}
          value={username}
          type="text"
          placeholder="username"
          style={{ height: "40px", borderRadius: "5px" }}
        />
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
          onClick={handleRegister}
          style={{ background: "rgb(63, 157, 233)", color: "white" }}
        >
          Register
        </button>
      </div>
      {error && <p style={{color: "red"}}>Something went wrong</p>}
    </div>
  );
}

export default Register;
