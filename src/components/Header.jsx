import React, { useContext } from "react";
import { AppContext } from "./Context";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";

import Container from "@mui/material/Container";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import LoginIcon from "@mui/icons-material/Login";

import LogoutIcon from "@mui/icons-material/Logout";
import PokeLogo from "../Assets/PokeLogo.png";
import { Link } from "react-router-dom";

const Header = () => {
  const { loggedUserCTX } = useContext(AppContext);
  const [loggedUser, setLoggedUser] = loggedUserCTX;
  console.log(loggedUser);

  function logOut() {
    localStorage.clear();
    setLoggedUser("");
  }

  return (
    <AppBar position="static">
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          <Link to={`/`}>
            <img
              src={PokeLogo}
              alt=""
              style={{ width: 50, height: 50 }}
              href="/"
            />
          </Link>
          <Link to={`/`} style={{ marginLeft: "30px" }}>
            <Button
              style={{
                marginRight: "10px",
                color: "white",
                minWidth: "max-content",
              }}
            >
              Pokemon
            </Button>
          </Link>
          <div style={{ width: "100%" }}>
            <Box sx={{ flexGrow: 1, float: "right" }}>
              {loggedUser ? (
                <>
                  <div style={{ display: "flex" }}>
                    <Link to={`/mypokemons`} style={{ marginLeft: "30px" }}>
                      <Button
                        style={{
                          marginRight: "10px",
                          color: "white",
                          minWidth: "max-content",
                        }}
                      >
                        My Pokemons
                      </Button>
                    </Link>
                    <Link
                      onClick={() => logOut()}
                      to={`/`}
                      style={{ color: "white", alignSelf: "center" }}
                    >
                      <Button style={{ marginRight: "10px", color: "white" }}>
                        Logout
                      </Button>
                    </Link>
                    <Link
                      onClick={() => logOut()}
                      to={`/`}
                      style={{ color: "white" }}
                    >
                      <LogoutIcon
                        fontSize="large"
                        sx={{ marginBottom: "-13px", marginRight: "15px" }}
                      />
                    </Link>
                    <IconButton sx={{ p: 0 }}>
                      <Avatar
                        alt={loggedUser}
                        src="/static/images/avatar/2.jpg"
                      />
                    </IconButton>
                  </div>
                </>
              ) : (
                <>
                  <div style={{ display: "flex" }}>
                    <Link
                      onClick={() => logOut()}
                      to={`/register`}
                      style={{ color: "white", alignSelf: "center" }}
                    >
                      <Button
                        style={{
                          marginRight: "10px",
                          color: "white",
                        }}
                      >
                        Register
                      </Button>
                    </Link>

                    <Link
                      to={`/login`}
                      style={{ color: "white", alignSelf: "center" }}
                    >
                      <Button style={{ marginRight: "10px", color: "white" }}>
                        Login
                      </Button>
                    </Link>
                    <Link to={`/login`} style={{ color: "white" }}>
                      <LoginIcon
                        fontSize="large"
                        sx={{ cursor: "pointer" }}
                        href="/login"
                      />
                    </Link>
                  </div>
                </>
              )}
            </Box>
          </div>
        </Toolbar>
      </Container>
    </AppBar>
  );
};
export default Header;
