import React, { useState } from "react";
import { Route, Routes } from "react-router-dom";
import Login from "./components/Login";
import Signup from "./components/SignUp";
import Main from "./components/Main";
import { AuthContextProvider } from "./context/AuthContext";
import ProtectedRoute from "./protectedRoute";

const App = () => {
  return (
    <AuthContextProvider>
      <Routes>
        <Route path="/" exact element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route
          path="/main"
          element={
            <ProtectedRoute>
              <Main />
            </ProtectedRoute>
          }
        />
      </Routes>
    </AuthContextProvider>
  );
};

export default App;
