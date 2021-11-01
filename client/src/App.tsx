/* eslint-disable import/no-unresolved */
/* eslint-disable react/jsx-props-no-spreading */
import React, { useEffect } from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import { observer } from 'mobx-react';
import {
    Home, Left, Sign, Right, Profile,
} from './Screens'; // eslint-disable-line import/no-unresolved

import { User as Store } from './Store';

const App = observer(() => {
    useEffect(() => {
        Store.fetch();
    }, []);
    if (Store.user.authenticated) {
        return (
            <Router>
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
            </Router>
        );
    }

    return (
        <Router>
            <Route path="/auth" component={Sign} />
        </Router>
    );
});

export default App;
