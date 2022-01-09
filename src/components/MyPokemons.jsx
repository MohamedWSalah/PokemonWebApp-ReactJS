import React, { useState, useEffect } from "react";
import axios from "axios";
import {
  Card,
  Button,
  Typography,
  CardContent,
  Grid,
  CircularProgress,
} from "@mui/material";
export default function MyPokemons() {
  let tokenx = JSON.parse(localStorage.getItem("token") || "").value;
  const [myPokes, setMyPokes] = useState();
  useEffect(() => {
    axios
      .get(`https://pokemonedvora.herokuapp.com/userpokemons?token=${tokenx}`)
      .then((res) => {
        setMyPokes(res.data.response);
      });
  }, []);

  return (
    <div style={{ width: "100%", textAlign: "-webkit-center" }}>
      <h3>My Pokemons</h3>
      <Grid container spacing={2}>
        {Array.isArray(myPokes) ? (
          myPokes.map((e) => (
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
                    {e}
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
          ))
        ) : (
          <Grid item xs={12} sm={12} md={12} lg={12}>
            <CircularProgress />
          </Grid>
        )}
      </Grid>
    </div>
  );
}
