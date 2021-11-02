/* eslint-disable no-nested-ternary */
/* eslint-disable import/no-unresolved */
/* eslint-disable react/jsx-props-no-spreading */
import React, { useEffect } from 'react';
import {
    BrowserRouter as Router, Route, Redirect, Switch,
} from 'react-router-dom';
import { observer } from 'mobx-react';
import {
    Home, Left, Sign, Right, Profile, NotFound,
} from './Screens';
import { Loading } from './Components';

import { User as Store } from './Store';

const App = observer(() => {
    useEffect(() => {
        setTimeout(() => Store.fetch(), 1000);
    }, []);

    if (Store.authenticated === true || Store.authenticated === false) {
        return (
            <Router>
                {
                    !Store.authenticated
                        ? <Redirect to="/auth" />
                        : window.location.pathname === '/auth'
                            ? <Redirect to="/" />
                            : <Redirect to={window.location.pathname} />
                }
                <Switch>
                    <Route
                        exact
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
                        exact
                        path="/"
                        render={(props) => (
                            <Left>
                                <Right render={(properties: any) => (
                                    <Home path="today" handleDrawerOpen={properties} {...props} />
                                )}
                                />
                            </Left>
                        )}
                    />
                    <Route
                        exact
                        path="/tasks"
                        render={(props) => (
                            <Left>
                                <Right render={(properties: any) => (
                                    <Home path="tasks" handleDrawerOpen={properties} {...props} />
                                )}
                                />
                            </Left>
                        )}
                    />
                    <Route exact path="/profile" component={Profile} />
                    <Route exact path="/auth" component={Sign} />
                    <Route path="*" component={NotFound} />
                </Switch>
            </Router>
        );
    }

    return (
        <Loading />
    );
});

export default App;
