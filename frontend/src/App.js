import Header from './components/Header';
import Sidebar from './components/Sidebar';
import React from "react";
import { Route, Routes } from "react-router-dom";
import Main from "./components/Main/Main";
import Theory from './components/Theory';
import Login from './components/Login';
import SignUp from './components/SignUp';
import PasswordReset from './components/PasswordReset';

function App() {
  return (<>
    {/* <Header /> */}
    <Sidebar/>
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
