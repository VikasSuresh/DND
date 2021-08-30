import { Component } from "react";
import { BrowserRouter as Router, Switch,Route } from "react-router-dom";
import { Home } from "./Screens";
class App extends Component<any,any>{
  render(){
    return(
          <Router >
            <Switch>
              <Route path="/" component={Home} />
            </Switch>
          </Router>
    )
  }
}

export default App;
