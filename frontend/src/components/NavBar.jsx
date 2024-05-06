import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { BASE_URL } from "../url";
import { signOut } from "../features/user/userSlice";

function NavBar() {
  const user = useSelector((state) => state.user);
  const dispatch = useDispatch();

  const handleLogout = async () => {
    await axios.get(`${BASE_URL}/api/v1/user/logout`, {withCredentials:true});
    dispatch(signOut());
  };

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "space-between",
        minWidth: "1270px",
      }}
    >
      <Link to={"/"}>
        <h2>Home</h2>
      </Link>

      {!user.currentUser && (
        <ul style={{ listStyle: "none", display: "flex", gap: "4px" }}>
          <Link to={"/login"}>
            <li>Login</li>
          </Link>
          <Link to={"/register"}>
            <li>Register</li>
          </Link>
        </ul>
      )}

      {user.currentUser && (
        <ul style={{ listStyle: "none", display: "flex", gap: "4px" }}>
          <button onClick={handleLogout}>Logout</button>
        </ul>
      )}
    </div>
  );
}

export default NavBar;
