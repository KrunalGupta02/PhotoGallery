import React, { useState } from "react";
import { useUserAuth } from "../context/AuthContext";
import { Link, useNavigate } from "react-router-dom";
import { FcGoogle } from "react-icons/fc";
import { IoIosEye, IoIosEyeOff } from "react-icons/io";
import { sendPasswordResetEmail } from "firebase/auth";
import { auth } from "../firebase";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [togglePass, setTogglePass] = useState(false);
  const [resetPasswordSuccess, setResetPasswordSuccess] = useState("");

  const navigate = useNavigate();

  const { logIn, googleSignIn } = useUserAuth();

  const handleSubmit = async (e) => {
    e.preventDefault();

    setError("");

    try {
      await logIn(email, password);
      navigate("/main");
    } catch (e) {
      setError(e.message);
    }
  };

  const handleGoogleSignIn = async (e) => {
    e.preventDefault();
    try {
      await googleSignIn();
      navigate("/main");
    } catch (e) {
      setError(e.message);
    }
  };

  const handleForgotPass = () => {
    sendPasswordResetEmail(auth, email)
      .then(() => {
        setResetPasswordSuccess("Forgot email is send to your email address");
        console.log(email);
      })
      .catch((error) => {
        setError(error.message);
      });
  };

  return (
    <div className="hero min-h-screen bg-base-200">
      {resetPasswordSuccess && (
        <div role="alert" className="alert alert-info absolute top-0">
          <span>{resetPasswordSuccess}</span>
        </div>
      )}
      {error && (
        <div role="alert" className="alert alert-error top-3 absolute">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="stroke-current shrink-0 h-6 w-6"
            fill="none"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z"
            />
          </svg>
          <span>{error}</span>
        </div>
      )}
      <div className="card shrink-0 w-full max-w-sm shadow-2xl bg-base-100">
        <h1 className="text-4xl py-2 font-bold text-center">LogIn</h1>
        <form className="card-body" onSubmit={handleSubmit}>
          <div className="form-control">
            <label htmlFor="email" className="label">
              <span className="label-text">Email</span>
            </label>
            <input
              type="email"
              placeholder="email"
              className="input"
              id="email"
              required
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div className="form-control">
            <label htmlFor="password" className="label">
              <span className="label-text">Password</span>
            </label>
            <div className="flex items-center">
              <input
                type={togglePass ? "text" : "password"}
                placeholder="password"
                className="input w-full"
                id="password"
                required
                onChange={(e) => setPassword(e.target.value)}
              />
              {togglePass ? (
                <IoIosEye
                  className="mx-3"
                  size={25}
                  onClick={() => setTogglePass(!togglePass)}
                />
              ) : (
                <IoIosEyeOff
                  className="mx-3"
                  size={25}
                  onClick={() => setTogglePass(!togglePass)}
                />
              )}
            </div>
            <label className="label">
              <button
                className="label-text-alt link link-hover"
                onClick={handleForgotPass}
              >
                Forgot password?
              </button>
            </label>
          </div>
          <div className="form-control mt-6">
            <button className="btn btn-primary" type="submit">
              Login
            </button>
          </div>
        </form>
        <div className="m-auto">
          <button className="btn btn-primary">
            <FcGoogle size={40} onClick={handleGoogleSignIn} />
          </button>
        </div>

        <label className="label">
          <span>
            Don't have an account? <Link to="/signup"> Sign up</Link>
          </span>
        </label>
      </div>
    </div>
  );
};

export default Login;
