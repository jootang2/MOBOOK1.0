import './App.css';
import {BrowserRouter, Route, Routes} from "react-router-dom";
import Main from "./pages/Main";
import NavBar from "./comp/NavBar";
import Login from "./pages/Login";
import axios from "axios";
import Logout from "./pages/Logout";
import Test from "./pages/Test";
function App() {
    const nav = {
        title: "MOBOOK1.0",
        menu: [
            {title: "홈", router: "index.html"},
            {title: "책 검색", router: "about.html"},
            {title: "책 대여", router: "contact.html"},
            {title: "책 반납", router: "pricing.html"},
            {title: "책 요청", router: "faq.html"},
            {title: "로그아웃", router: "/logout"},
            {title: "로그인", router: "/login"},
        ]
    }
  return (
      <BrowserRouter>
          <div>
          <NavBar nav={nav}/>
          <Routes>
              <Route path="/" element={<Main />} />
              <Route path="/login" element={<Login />} />
              <Route path="/logout" element={<Logout />} />
              <Route path="/test" element={<Test />} />
          </Routes>
          </div>
      </BrowserRouter>
  );
}

export default App;
