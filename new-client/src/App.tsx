/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import { Home, Left, Right } from './Screens'; // eslint-disable-line import/no-unresolved

const App = () => (
    <Left>
        <Right render={(properties: any) => (
            <Router>
                <Switch>
                    <Route path="/bookmarks" render={(props) => <Home path="bookmarks" handleDrawerOpen={properties} {...props} />} />
                    {/* <Route path="/tasks" render={(props) => <Home path="tasks" {...props} />} /> */}
                    <Route path="/" render={(props) => <Home handleDrawerOpen={properties} {...props} />} />
                </Switch>
            </Router>
        )}
        />
    </Left>
);

export default App;
