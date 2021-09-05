import { Component } from "react";
import { BrowserRouter as Router, Switch,Route } from "react-router-dom";
import { Home,Left,Right} from "./Screens";
class App extends Component<any,any>{
  render(){
    return(
       <Left>
         <Right render = {(properties: any) =>(
           <Router >
              <Switch>
                <Route path="/bookmarks" render={(props) => <Home path="bookmarks" properties={properties} {...props} />} />
                {/* <Route path="/tasks" render={(props) => <Home path="tasks" {...props} />} /> */}
                <Route path="/" render={(props) => <Home handleDrawerOpen={properties} {...props} />} />
              </Switch>
          </Router>
         )}/>
       </Left>
    )
  }
}

export default App;
