import "./App.scss";
import React from "react";
import { Routes, Route, BrowserRouter } from "react-router-dom";
import Header from "./components/Header";
import { AppProvider } from "./components/Context";
import NotFound from "./components/NotFound";
import Login from "./components/Login";
import Register from "./components/Register";
import MainPage from "./components/MainPage";
import MyPokemons from "./components/MyPokemons";
function App() {
  return (
    <AppProvider>
      <div className="App">
        <Header />
        <Routes>
          <Route path="*" element={<NotFound />} />
          <Route path="/" element={<MainPage />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/mypokemons" element={<MyPokemons />} />
        </Routes>
      </div>
    </AppProvider>
  );
}

export default App;
