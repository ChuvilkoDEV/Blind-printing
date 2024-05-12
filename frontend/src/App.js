import './bootstrap.min.css';
import Header from './components/Header';
import React from "react";
import { Route, Routes } from "react-router-dom";
import Home from "./components/Home";
import Theory from './components/Theory';
import axios from "axios"

export const baseUrl = 'http://127.0.0.1:8000/';

function App() {
  return (<>
    <Header />
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="theory/" element={<Theory />} />
    </Routes>
    </>);
}

export default App;
