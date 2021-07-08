import React from "react";
import { Switch, Route } from "react-router-dom";
import ValueForm from "./component/Value";
import OtherPage from "./component/OtherPage";
import Headers from "./component/Header";

function App() {
  return (
    <div className="ui container">
      <Headers />
      <Switch>
        <Route path="/" exact component={ValueForm} />
        <Route path="/otherPage" component={OtherPage} />
      </Switch>
    </div>
  );
}

export default App;
