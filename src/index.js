import React from "react"
import ReactDOM from "react-dom"
import { BrowserRouter } from "react-router-dom"

const App = () => {
    return (
      <div>Hello React !</div>
    );
  };
  
  ReactDOM.render( <BrowserRouter>
                    <App />
                  </BrowserRouter>, 
                  document.getElementById("app"));