import React, { useState, useEffect } from "react";
import {
  Routes,
  Route,
  Navigate,
  useNavigate,
  useLocation,
  Link,
} from "react-router-dom";
import About from "./pages/About";
import Home from "./pages/Home";
import Login from "./pages/Login";

const Authenticated = ({ isAuth, setIsAuth }) => {
  let { pathname } = useLocation();
  const navigate = useNavigate();

  // useEffect(() => {
  //   if (isAuth && pathname === "/login") {
  //     navigate(-1) ?? navigate("/");
  //   }
  // }, [isAuth, pathname]);

  return (
    <>
      {pathname === "/login" && <Navigate to="/" />}
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
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
        </Routes>
      </div>
    </>
  );
};

const NotAuthenticated = ({ setIsAuth }) => {
  let { pathname } = useLocation();
  // const navigate = useNavigate();
  // useEffect(() => {
  //   if (pathname !== "/login") {
  //     navigate("/login");
  //   }
  // }, [pathname]);
  return (
    <>
      {pathname !== "/login" && <Navigate to="/login" />}
      <Routes>
        <Route path="/login" element={<Login setIsAuth={setIsAuth} />} />
      </Routes>
    </>
  );
};

function App() {
  const [isAuth, setIsAuth] = useState(() => !!localStorage.getItem("token"));

  return (
    <div className="App">
      {isAuth ? (
        <Authenticated isAuth={isAuth} setIsAuth={setIsAuth} />
      ) : (
        <NotAuthenticated setIsAuth={setIsAuth} />
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
