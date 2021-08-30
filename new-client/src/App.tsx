import { Component } from "react";
import { BrowserRouter as Router, Switch,Route } from "react-router-dom";


class App extends Component{
  render(){
    return(
      <Switch>
          <Router >
            <Route path="/" component={Home} />
          </Router>
      </Switch>
    )
  }
}

export default App;
