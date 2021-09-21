import './App.css';
import React from "react";
import Navbar from "./components/nav-bar/navbar";
import SearchForm from "./components/search-form/search-form";

function App() {
    return (
    <div className="App">
        <Navbar />
        <SearchForm />
    </div>
  );
}

export default App;
