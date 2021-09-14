/* eslint-disable import/no-unresolved */
/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import {
    Home, Left, Sign, Right, Profile,
} from './Screens'; // eslint-disable-line import/no-unresolved

const App = () => (
    <Router>
        <Switch>
            <Route
                path="/bookmarks"
                render={(props) => (
                    <Left>
                        <Right render={(properties: any) => (
                            <Home path="bookmarks" handleDrawerOpen={properties} {...props} />
                        )}
                        />
                    </Left>
                )}
            />
            <Route
                path="/tasks"
                render={(props) => (
                    <Left>
                        <Right render={(properties: any) => (
                            <Home handleDrawerOpen={properties} {...props} />
                        )}
                        />
                    </Left>
                )}
            />
            <Route path="/profile" component={Profile} />
            <Route path="/" component={Sign} />
        </Switch>
    </Router>
);

export default App;
