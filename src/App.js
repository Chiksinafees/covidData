import "./App.css";
import Contact from "./components/pages/Contact";
import { Fragment } from "react";
import Detail from "./components/pages/Detail";
import { Route } from "react-router-dom";
import Contactchart from "./components/pages/Contactchart";
import MapofCases from "./components/pages/MapofCases";
import Header from "./components/pages/Header";
function App() {
  return (
    <Fragment>
      <Header />
      <br />
      <Route path="/" exact>
        <Contact />
      </Route>
      <Route path="/Detail" exact>
        <Detail />
      </Route>
      <Route path="/Contactchart" exact>
        <Contactchart />
      </Route>
      <Route path="/MapofCases" exact>
        <MapofCases />
      </Route>
    </Fragment>
  );
}

export default App;
