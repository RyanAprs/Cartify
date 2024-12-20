import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { checkToken, loginUser } from "../store/actions/UserActions";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const BASE_URI = import.meta.env.VITE_BASE_URI;

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [users, setUsers] = useState([]);
  const navigate = useNavigate();

  const dispatch = useDispatch();
  const { loading, error } = useSelector((state) => state.user);

  const fetchData = async () => {
    const res = await axios.get(`${BASE_URI}/users`);
    setUsers(res.data);
  };

  useEffect(() => {
    const token = checkToken();
    if (token) {
      navigate("/");
    }

    fetchData();
  }, [navigate]);

  const handleLogin = (e) => {
    e.preventDefault();
    dispatch(loginUser(username, password));
  };

  const handleChange = (event) => {
    const value = event.target.value;
    const [username, password] = value.split("|");
    setUsername(username);
    setPassword(password);
  };

  return (
    <div className="min-h-screen max-h-fit flex flex-col justify-center items-center gap-10 2xl:gap-16">
      <div className="flex justify-center">
        <h1 className="text-5xl 2xl:text-7xl text-third-color font-semibold">
          Sign In
        </h1>
      </div>
      <div className="flex flex-col justify-center items-center w-full gap-5 2xl:gap-9">
        <input
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          className="bg-gray-200 p-4 2xl:p-6 text-xl rounded-xl md:w-1/2 w-full"
          type="text"
          placeholder="Username"
        />
        <input
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="bg-gray-200 p-4 2xl:p-6 text-xl rounded-xl md:w-1/2 w-full"
          type="password"
          placeholder="Password"
        />
        {error && <p className="text-red-500">{error}</p>}
        <button
          onClick={handleLogin}
          className="2xl:w-1/4 md:w-1/2 w-full flex justify-center items-center bg-third-color p-4 text-second-color rounded-xl"
        >
          {loading ? "Loading.." : "Login"}
        </button>
      </div>

      <div className="flex flex-col gap-4 md:w-1/2 w-full ">
        <p>Choose one of the users below to log in:</p>
        <select
          onChange={handleChange}
          className="bg-main-color p-3 w-full md:w-auto rounded-full"
        >
          <option value="" selected>
            Select user
          </option>
          {users.map((user, id) => (
            <option key={id} value={`${user.username}|${user.password}`}>
              {user.username}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
};

export default Login;
