import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import { BrowserRouter as Router } from "react-router-dom";
import list from "./store/reducer";
import { Provider } from "mobx-react";
ReactDOM.render(
    <Provider list={list}>
        <Router>
            <App/>    
        </Router>
    </Provider>,
    document.getElementById('root')
);