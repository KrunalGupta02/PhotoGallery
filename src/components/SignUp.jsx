import React, { useState } from "react";
import { useUserAuth } from "../context/AuthContext";
import { Link, useNavigate } from "react-router-dom";
import { IoIosEye, IoIosEyeOff } from "react-icons/io";

const SignUp = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [togglePass, setTogglePass] = useState(false);

  const navigate = useNavigate();

  const { signUp } = useUserAuth();

  const handleSubmit = async (e) => {
    e.preventDefault();

    setError("");

    try {
      await signUp(email, password);
      navigate("/main");
    } catch (e) {
      setError(e.message);
    }
  };

  return (
    <div className="hero min-h-screen bg-base-200">
      {error && (
        <div role="alert" className="alert alert-error absolute top-3">
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
        <h1 className="text-4xl py-3 font-bold text-center">Signup</h1>
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
          </div>
          <div className="form-control mt-6">
            <button className="btn btn-primary" type="submit">
              SignUp
            </button>
          </div>

          <label className="label">
            <span>
              Already have account? <Link to="/"> Login</Link>
            </span>
          </label>
        </form>
      </div>
    </div>
  );
};

export default SignUp;
