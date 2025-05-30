import './App.css'
import {BrowserRouter, Route, Routes} from "react-router-dom";
import MainPage from "./elements/MainPage.jsx";
import CodeChecking from "./elements/CodeChecking.jsx";
import Profile from "./elements/Profile.jsx";
import CheckIsLoginedForLogined from "./elements/CheckIsLogined.jsx";
import CheckIsLoginedForNotLogined from "./elements/CheckIsLoginedForNotLogined.jsx";
import LoginPage from "./elements/Login.jsx";
import LoginPageCode from "./elements/LoginPageCode.jsx";

function App() {

  return (
   <BrowserRouter>
       <Routes>
           <Route path={"/"} element={<CheckIsLoginedForNotLogined><MainPage/></CheckIsLoginedForNotLogined>}/>
           <Route path={"profile/:phone"} element={<CheckIsLoginedForNotLogined><CodeChecking/></CheckIsLoginedForNotLogined>}/>
           <Route path={"/profile"} element={<CheckIsLoginedForLogined><Profile/></CheckIsLoginedForLogined>}/>
           <Route path={"/login"} element={<CheckIsLoginedForNotLogined><LoginPage/></CheckIsLoginedForNotLogined>}/>
           <Route path={"login/:phone"} element={<CheckIsLoginedForNotLogined><LoginPageCode/></CheckIsLoginedForNotLogined>}/>
       </Routes>
   </BrowserRouter>
  )
}

export default App
