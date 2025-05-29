import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import {BrowserRouter, Route, Routes} from "react-router-dom";
import MainPage from "./elements/MainPage.jsx";
import Profile from "./elements/Profile.jsx";

function App() {

  return (
   <BrowserRouter>
       <Routes>
           <Route path={"/"} element={<MainPage/>}/>
           <Route path={"profile/:phone"} element={<Profile/>}/>
       </Routes>
   </BrowserRouter>
  )
}

export default App
