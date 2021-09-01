import { Component } from "react";
import { BrowserRouter as Router, Switch,Route } from "react-router-dom";
import { Home,Bookmark } from "./Screens";
import {Drawer}  from "./Components";
class App extends Component<any,any>{
  render(){
    return(
        <Drawer>
          <Router >
              <Switch>
                <Route path="/bookmarks" component={Bookmark} />
                <Route path="/" component={Home} />
              </Switch>
          </Router>
        </Drawer>
    )
  }
}

export default App;
