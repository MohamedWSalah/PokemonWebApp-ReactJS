import React, { useState } from "react";
import { TextField, Button } from "@mui/material";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { Link } from "react-router-dom";

export default function Register() {
  let navigate = useNavigate();
  const [userInfo, setUserInfo] = useState({ username: "", password: "" });
  const [err, setErr] = useState(false);
  const [success, setSuccess] = useState(false);
  function submiteRegisterInfo() {
    setErr(false);
    axios({
      method: "post",
      url: "https://pokemonedvora.herokuapp.com/register",
      data: userInfo,
      headers: { "content-type": "application/json" },
    }).then((res) => {
      if (res.data.status_code === 406) {
        setErr(true);
      } else {
        setSuccess(true);
        setTimeout(function () {
          navigate("/login");
        }, 5000);
      }
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
      <h1 style={{ color: "blue" }}>Register</h1>
      {success ? (
        <span style={{ color: "green", marginBottom: "30px" }}>
          Registered Successfuly, Redirecting in 5 secs
        </span>
      ) : null}
      {err ? (
        <span style={{ color: "red", marginBottom: "30px" }}>
          Username already exists
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
        onClick={() => submiteRegisterInfo()}
        disabled={
          userInfo.password === "" || userInfo.username === "" ? true : false
        }
      >
        Register
      </Button>

      <Link to={`/login`} style={{ marginTop: "20px" }}>
        <span> Login</span>
      </Link>
    </div>
  );
}
