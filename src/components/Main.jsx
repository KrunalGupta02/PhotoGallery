import React from "react";
import { useUserAuth } from "../context/AuthContext";
import { Link, useNavigate } from "react-router-dom";
import UploadForm from "./UploadForm";

const Main = () => {
  const { user, logOut } = useUserAuth();
  console.log(user);

  const navigate = useNavigate();

  const handleLogOut = async () => {
    try {
      await logOut();
      navigate("/");
    } catch (e) {
      console.log(e, "error");
    }
  };
  return (
    <>
      <div className="navbar bg-base-100 border border-white">
        <div className="flex-1">
          <h1 className="btn btn-ghost text-xl">
            <p className="bg-gradient-to-r from-purple-600 via-blue-500 to-indigo-600 bg-clip-text text-transparent bg-size-500 animate-text-shine">
              <Link to="/main">Photo Gallery 🤳</Link>
            </p>
          </h1>
        </div>
        <div className="flex-none gap-2">
          <div className="dropdown dropdown-end">
            <div
              tabIndex={0}
              role="button"
              className="btn btn-ghost btn-circle avatar"
            >
              <div className="w-10 rounded-full">
                <img
                  alt="User Image"
                  src={
                    user.photoURL
                      ? user?.photoURL
                      : "/public/user-profile-front-side.jpg"
                  }
                />
              </div>
            </div>
            <ul
              tabIndex={0}
              className="mt-5 z-[1] shadow menu menu-sm dropdown-content bg-base-100 w-52 border border-gray-200"
            >
              <li>
                <a className="justify-center font-bold text-[#FF8080]">
                  {user.displayName ? user.displayName : user.email}
                </a>
              </li>
              <li>
                <a to="/" className="justify-center" onClick={handleLogOut}>
                  Logout
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>
      <UploadForm />
    </>
  );
};

export default Main;
