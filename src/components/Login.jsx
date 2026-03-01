import { useState } from "react";
import axios from "axios";
import { useDispatch } from "react-redux";
import { addUser } from "../utils/userSlice";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [isLoginForm, setIsLoginForm] = useState(true);
  const [error, setError] = useState("");

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogin = async () => {
    try {
      const response = await axios.post(
        `${import.meta.env.VITE_BACKEND_API_URL}/auth/login`,
        {
          email,
          password,
        },
        { withCredentials: true },
      );
      dispatch(addUser(response.data.data));
      navigate("/");
    } catch (error) {
      setError(error?.response?.data?.message || error.message);
    }
  };

  const handleRegister = async () => {
    try {
      if (password !== confirmPassword) {
        setError("Passwords do not match");
        return;
      }
      const response = await axios.post(
        `${import.meta.env.VITE_BACKEND_API_URL}/auth/signup`,
        {
          firstName,
          lastName,
          email,
          password,
        },
        { withCredentials: true },
      );
      dispatch(addUser(response.data.data));
      navigate("/profile");
    } catch (error) {
      setError(error?.response?.data?.message || error.message);
    }
  };

  const handleAuth = () => {
    if (isLoginForm) {
      handleLogin();
    } else {
      handleRegister();
    }
  };

  return (
    <div className="flex items-center justify-center min-h-[calc(100vh-132px)]">
      <fieldset className="fieldset bg-base-300 border-base-300 rounded-box w-xs border p-4">
        <h1 className="text-2xl font-bold mb-5">
          {isLoginForm ? "Login" : "Register"}
        </h1>

        {!isLoginForm && (
          <>
            <label className="label">First Name</label>
            <input
              type="text"
              className="input"
              placeholder="First Name"
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
            />

            <label className="label">Last Name</label>
            <input
              type="text"
              className="input"
              placeholder="Last Name"
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
            />
          </>
        )}

        <label className="label">Email</label>
        <input
          type="email"
          className="input"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <label className="label">Password</label>
        <input
          type="password"
          className="input"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        {!isLoginForm && (
          <>
            <label className="label">Confirm Password</label>
            <input
              type="password"
              className="input"
              placeholder="Confirm Password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
            />
          </>
        )}
        {error && <p className="text-red-500 mt-2">{error}</p>}
        <button className="btn btn-neutral mt-5" onClick={handleAuth}>
          {isLoginForm ? "Login" : "Register"}
        </button>
        <p className="mt-2 cursor-pointer text-center">
          {!isLoginForm
            ? "Already have an account? "
            : "Don't have an account? "}
          <span
            className="font-bold text-blue-500"
            onClick={() => setIsLoginForm(!isLoginForm)}
          >
            {!isLoginForm ? "Login" : "Register"}
          </span>
        </p>
      </fieldset>
    </div>
  );
};

export default Login;
