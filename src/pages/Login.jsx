const Login = () => {
  return (
    <div className="min-h-screen max-h-fit flex flex-col justify-center gap-10">
      <div className="flex justify-center">
        <h1 className="text-4xl text-third-color font-semibold">Sign In</h1>
      </div>
      <div className="flex flex-col justify-center items-center w-full gap-5">
        <input
          className="bg-gray-200 p-3 rounded-md w-full"
          type="text"
          placeholder="Username"
        />
        <input
          className="bg-gray-200 p-3 rounded-md w-full"
          type="password"
          placeholder="Password"
        />
        <button className="md:w-1/2 w-full flex justify-center items-center bg-third-color p-3 text-second-color rounded-full">
          Login
        </button>
      </div>
    </div>
  );
};

export default Login;
