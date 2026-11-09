import React from 'react'
import "./App.css";
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Signup from './Components/Signup';
import Login from './Components/Login';
import Home from './Components/Home';
const App = () => {
  return (
    <>
    <BrowserRouter>
    <Routes>
      <Route  path='/' element={<Signup/>} />
      <Route  path='/home' element={<Home/>} />

     <Route   path='/login' element={<Login/>} />
    </Routes>
    </BrowserRouter> 
    </>
  )
}

export default App