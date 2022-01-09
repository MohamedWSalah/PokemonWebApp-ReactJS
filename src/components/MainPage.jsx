import React, { useState, useEffect, useContext } from "react";
import axios from "axios";
import { Card, Button, Typography, CardContent, Grid } from "@mui/material";
import { AppContext } from "./Context";
import { useNavigate } from "react-router-dom";

export default function MainPage() {
  const [poke, setPoke] = useState();
  const [next, setNext] = useState();
  const [previous, setPrevious] = useState();
  const [trigger, setTrigger] = useState();

  let navigate = useNavigate();
  const { loggedUserCTX, tokenCTX } = useContext(AppContext);
  const [loggedUser] = loggedUserCTX;
  let tokenx = localStorage.getItem("token") || "";
  useEffect(() => {
    axios.get(trigger || "https://pokeapi.co/api/v2/pokemon").then((res) => {
      setPoke(res.data.results);
      console.log(res.data);
      setNext(res.data.next || "");
      setPrevious(res.data.previous || "");
    });
  }, [trigger]);

  function addPokemon(poke_name) {
    if (!loggedUser) navigate("/login");
    let usedToken = JSON.parse(tokenx).value;

    axios.post(
      `https://pokemonedvora.herokuapp.com/addPokemon?token=${usedToken}&pokemonName=${poke_name}`
    );
  }
  return (
    <div style={{ width: "100%", textAlign: "-webkit-center" }}>
      <h2>Pokemons</h2>
      <Grid container spacing={2}>
        {Array.isArray(poke) ? (
          poke.map((e) => (
            <Grid key={e.name} item xs={12} sm={6} md={4} lg={3}>
              <Card
                variant="outlined"
                sx={{
                  width: "275px",
                  borderRadius: "15px",
                }}
              >
                <CardContent>
                  <Typography variant="h5" component="div">
                    {e.name}
                  </Typography>
                </CardContent>
                <div style={{ display: "flex", flexDirection: "column" }}>
                  <Button size="small" onClick={() => addPokemon(e.name)}>
                    Add Pokemon
                  </Button>
                </div>
              </Card>
            </Grid>
          ))
        ) : (
          <Grid item xs={12} sm={12} md={12} lg={12}>
            <span>Loading..</span>
          </Grid>
        )}
        {previous ? (
          <Grid item xs={6}>
            <Button
              size="small"
              variant="contained"
              sx={{ borderRadius: "15px", borderColor: "red" }}
              onClick={() => setTrigger(previous)}
            >
              Previous Page
            </Button>
          </Grid>
        ) : (
          <Grid item xs={6}></Grid>
        )}

        <Grid item xs={6}>
          <Button
            size="small"
            variant="contained"
            sx={{ borderRadius: "15px", borderColor: "red" }}
            onClick={() => setTrigger(next)}
          >
            Next Page
          </Button>
        </Grid>
      </Grid>
    </div>
  );
}
