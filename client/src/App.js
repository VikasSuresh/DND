import React,{ Component } from "react";
import { Switch,Route } from "react-router-dom";
import { inject, observer } from "mobx-react";
import Home from "./containers/Home/Home";

class App extends Component{    
  render(){
    console.log(list)
    return(
      <div className='container-fluid'>
        <Switch>
          <Route path='/' component={Home} />
        </Switch>
      </div>
    )
  }
}


export default App;