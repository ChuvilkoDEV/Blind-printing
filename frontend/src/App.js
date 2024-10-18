import Header from './components/Header';
import Sidebar from './components/Sidebar';
import React from "react";
import { Route, Routes } from "react-router-dom";
import Main from "./components/Main/Main";
import Theory from './components/Theory';
import Login from './components/Login';
import SignUp from './components/SignUp';
import PasswordReset from './components/PasswordReset';
import Test from './components/Test';

import './css/App.css'

function App() {
  return (<div className="App">
    {/* <Header /> */}
    <Sidebar/>
    <Routes>
      <Route path="/" element={<Main />} />
      <Route path="/signup" element={<SignUp />} />
      <Route path="/login" element={<Login />} />
      <Route path="/reset" element={<PasswordReset />} />
      <Route path="theory/" element={<Theory />} />
      <Route path="/test" element={<Test />} />
    </Routes>
    </div>);
}

export default App;
