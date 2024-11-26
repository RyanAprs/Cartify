const Login = () => {
  return (
    <div className="min-h-screen max-h-fit flex flex-col justify-center gap-10 2xl:gap-16">
      <div className="flex justify-center">
        <h1 className="text-5xl 2xl:text-7xl text-third-color font-semibold">
          Sign In
        </h1>
      </div>
      <div className="flex flex-col justify-center items-center w-full gap-5 2xl:gap-9">
        <input
          className="bg-gray-200 p-4 2xl:p-6 text-xl rounded-xl md:w-1/2 w-full"
          type="text"
          placeholder="Username"
        />
        <input
          className="bg-gray-200 p-4 2xl:p-6 text-xl rounded-xl md:w-1/2 w-full"
          type="password"
          placeholder="Password"
        />
        <button className="2xl:w-1/4 md:w-1/2 w-full flex justify-center items-center bg-third-color p-4 text-second-color rounded-xl">
          Login
        </button>
      </div>
    </div>
  );
};

export default Login;
