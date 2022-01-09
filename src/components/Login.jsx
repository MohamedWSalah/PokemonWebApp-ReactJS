import React, { useState, useContext } from "react";
import { AppContext } from "./Context";
import axios from "axios";
import { TextField, Button } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";

export default function Login() {
  let navigate = useNavigate();
  const { loggedUserCTX, tokenCTX } = useContext(AppContext);

  const [loggedUser, setLoggedUser] = loggedUserCTX;
  const [token, setToken] = tokenCTX;

  const [userInfo, setUserInfo] = useState({ username: "", password: "" });
  const [err, setErr] = useState(false);
  function submitLoginInfo() {
    var bodyFormData = new FormData();
    bodyFormData.append("username", userInfo.username);
    bodyFormData.append("password", userInfo.password);

    console.log(bodyFormData);
    setErr(false);
    axios({
      method: "post",
      url: "https://pokemonedvora.herokuapp.com/login",
      data: bodyFormData,
      headers: { "content-type": "application/json" },
    })
      .then((res) => {
        setToken(res.data.access_token);
        const now = new Date();
        const tok = {
          value: res.data.access_token,
          expiry: now.getTime() + 6000,
        };
        localStorage.setItem("token", JSON.stringify(tok));
        localStorage.setItem("currentUser", userInfo.username);
        setLoggedUser(userInfo.username);
        console.log("done");
        navigate("/");
      })
      .catch(function (error) {
        setErr(true);
      });
  }
  return (
    <div
      style={{
        marginTop: "100px",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
      }}
    >
      <h1 style={{ color: "blue" }}>Login</h1>
      {loggedUser !== "" ? navigate("/") : null}
      {err ? (
        <span style={{ color: "red", marginBottom: "30px" }}>
          Invalid username or password
        </span>
      ) : null}
      <TextField
        label="Username"
        variant="outlined"
        onChange={(e) => setUserInfo({ ...userInfo, username: e.target.value })}
      />

      <TextField
        label="Password"
        variant="outlined"
        style={{ margin: "10px" }}
        onChange={(e) => setUserInfo({ ...userInfo, password: e.target.value })}
      />
      <Button
        variant="contained"
        onClick={() => submitLoginInfo()}
        disabled={
          userInfo.password === "" || userInfo.username === "" ? true : false
        }
      >
        Login
      </Button>

      <Link to={`/register`} style={{ marginTop: "20px" }}>
        <span> Register</span>
      </Link>
    </div>
  );
}
