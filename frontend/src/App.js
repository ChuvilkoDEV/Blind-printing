import './bootstrap.min.css';
import Header from './components/Header';
import React from "react";
import { Route, Routes } from "react-router-dom";
import Main from "./components/Main";
import Theory from './components/Theory';
import Login from './components/Login';
import SignUp from './components/SignUp';
import PasswordReset from './components/PasswordReset';
import axios from "axios"
import Userfront from "@userfront/toolkit/react";

Userfront.init("demo1234");
function App() {
  return (<>
    <Header />
    <Routes>
      <Route path="/" element={<Main />} />
      <Route path="/signup" element={<SignUp />} />
      <Route path="/login" element={<Login />} />
      <Route path="/reset" element={<PasswordReset />} />
      <Route path="theory/" element={<Theory />} />
    </Routes>
    </>);
}

export default App;
