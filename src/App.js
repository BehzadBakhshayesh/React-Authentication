import React, { useState, useEffect } from "react";
import { About } from "./pages/About";
import Home from "./pages/Home";
import Login from "./pages/Login";
import {
  Routes,
  Route,
  Navigate,
  useNavigate,
  useLocation,
  Link,
} from "react-router-dom";

function App() {
  const [isAuth, setIsAuth] = useState(() => !!localStorage.getItem("token"));
  let { pathname } = useLocation();
  const navigate = useNavigate();

  return (
    <div className="App">
      {isAuth ? (
        <>
          {pathname === "/login" && <Navigate to="/login" />}
          <div style={header}>
            <h2>Header</h2>
            <nav>
              <Link to="/">Home</Link>
              <br />
              <Link to="/about">About</Link>
            </nav>
            <button
              onClick={() => {
                localStorage.clear();
                localStorage.removeItem("token");
                setIsAuth(false);
                navigate("/login");
              }}
            >
              logOut
            </button>
          </div>
          <div style={content}>
            <Routes>
              <Route path="/about" element={<About />} />
              <Route path="/" element={<Home />} />
            </Routes>
          </div>
        </>
      ) : (
        <>
          {pathname !== "/login" && <Navigate to="/login" />}
          <Routes>
            <Route path="/login" element={<Login setIsAuth={setIsAuth} />} />
          </Routes>
        </>
      )}
    </div>
  );
}

export default App;

const header = {
  width: "100%",
  height: "150px",
  border: "1px solid blue",
};

const content = {
  width: "100%",
  height: "400px",
  border: "1px solid blue",
};
