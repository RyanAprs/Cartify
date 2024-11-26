import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { checkToken, loginUser } from "../store/actions/UserActions";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const dispatch = useDispatch();
  const { loading, error } = useSelector((state) => state.user);

  useEffect(() => {
    const token = checkToken();
    if (token) {
      navigate("/");
    }
  }, [navigate]);

  const handleLogin = (e) => {
    e.preventDefault();
    dispatch(loginUser(username, password));
  };

  return (
    <div className="min-h-screen max-h-fit flex flex-col justify-center gap-10 2xl:gap-16">
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
    </div>
  );
};

export default Login;
