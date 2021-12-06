import React from 'react';
import { Route, BrowserRouter } from 'react-router-dom';

import Login from './pages/Login';
import Home from './pages/Home';
import Question from './pages/Question';

const Routes = () => {
    return (
        <BrowserRouter >
            <Route component={Login} path="/" exact />
            <Route component={Home} path="/home" />
            <Route component={Question} path="/question" />
        </BrowserRouter>
    );
}
export default Routes;