import { Component } from "react";
import { BrowserRouter as Router, Switch,Route } from "react-router-dom";
import { Home} from "./Screens";
import {Drawer}  from "./Components";
class App extends Component<any,any>{
  render(){
    return(
        <Drawer>
          <Router >
              <Switch>
                <Route path="/bookmarks" render={(props) => <Home path="bookmarks" {...props} />} />
                {/* <Route path="/tasks" render={(props) => <Home path="tasks" {...props} />} /> */}
                <Route path="/" component={Home} />
              </Switch>
          </Router>
        </Drawer>
    )
  }
}

export default App;
