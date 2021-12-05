import React from 'react';
import { Route, BrowserRouter } from 'react-router-dom';

import Login from './pages/Login';
import Home from './pages/Home';

const Routes = () => {
    return (
        <BrowserRouter >
            <Route component={Login} path="/home" exact />
            <Route component={Home} path="/" />
        </BrowserRouter>
    );
}
export default Routes;