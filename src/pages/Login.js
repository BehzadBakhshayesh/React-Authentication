import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const Login = ({ setIsAuth }) => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("george.bluth@reqres.in");
  const [password, setPassword] = useState("");

  return (
    <div>
      <input
        type="text"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <br />
      <input
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <br />

      <button
        onClick={() => {
          axios({
            method: "post",
            url: "https://reqres.in/api/login",
            data: { email, password },
          })
            .then((response) => {
              if (response.status === 200) {
                localStorage.setItem("token", response?.data?.token);
                // navigate(-1) ?? navigate("/");
                navigate("/");
                setIsAuth(true);
              }
            })
            .catch((error) => {
              console.log(error);
            });
        }}
      >
        login
      </button>
    </div>
  );
};

export default Login;
