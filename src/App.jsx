import React from "react";
import Header from "./components/header";
import MenuGrid from "./components/menu-grid";
import Footer from "./components/footer";
import './App.css'

function App() {
  return (
    <div className="container">
      <Header />
      <MenuGrid />
      <Footer />
    </div>
  );
}

export default App;
