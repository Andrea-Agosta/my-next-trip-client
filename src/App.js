import './App.css';
import React, {useState} from "react";
import Navbar from "./components/nav-bar/navbar";
import SearchForm from "./components/search-form/search-form";
import {BrowserRouter as Router, Route, Switch} from "react-router-dom";
import FlightList from "./FlightList";


function App() {
  const [modalValue, setModalValue] = useState({
    country: "",
    currency: ""
  });

  function handleChangeSelect(country, currency){
    setModalValue({country: country.code, currency: currency.code});
  }

  return (
      <Router className="App">
        <Navbar handleChangeSelect={handleChangeSelect} />
        <Switch>
          <Route path="/flights" render={(props) => <FlightList {...props} />}/>




          <Route path="/">
            <SearchForm modalValue={modalValue} />
          </Route>
        </Switch>
      </Router>
  );
}

export default App;
