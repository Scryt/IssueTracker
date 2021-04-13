import React from 'react';
import {BrowserRouter, Route, Switch} from "react-router-dom";
import Header from '../components/Header/Header'
import NotFoundPage from "../components/NotFoundPage";
import IssueDashboardPage from '../components/IssueDashboardPage/IssueDashboardPage'
import IssuePage from '../components/IssuePage/IssuePage'

const AppRouter = () => (
    <BrowserRouter>
        <div>
            <Header/>
            <Switch>
                <Route path="/" component={IssueDashboardPage} exact={true} />
                <Route path="/create" component={IssuePage} />
                <Route component={NotFoundPage} />
            </Switch>
        </div>
    </BrowserRouter>
);

export default AppRouter