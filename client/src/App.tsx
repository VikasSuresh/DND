/* eslint-disable import/no-unresolved */
/* eslint-disable react/jsx-props-no-spreading */
import React, { useEffect } from 'react';
import { BrowserRouter as Router, Route, Redirect } from 'react-router-dom';
import { observer } from 'mobx-react';
import {
    Home, Left, Sign, Right, Profile,
} from './Screens'; // eslint-disable-line import/no-unresolved

import {
    Loading,
} from './Components'; // eslint-disable-line import/no-unresolved

import { User as Store } from './Store';

const App = observer(() => {
    useEffect(() => {
        setTimeout(() => Store.fetch(), 2000);
    }, []);

    if (Store.authenticated === true || Store.authenticated === false) {
        return (
            <Router>
                {!Store.authenticated ? <Redirect to="/auth" /> : <Redirect to={window.location.pathname} />}
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
                    exact
                    path="/"
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
                <Route path="/auth" component={Sign} />
            </Router>
        );
    }

    return (
        <Loading />
    );
});

export default App;
