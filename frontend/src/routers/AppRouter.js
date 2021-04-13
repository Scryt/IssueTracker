import React from 'react';
import {BrowserRouter, Route, Switch} from "react-router-dom";
import Header from '../components/Header'
import NotFoundPage from "../components/NotFoundPage";
import IssueDashboardPage from '../components/IssueDashboardPage'
import AddIssuePage from '../components/AddIssuePage'

const AppRouter = () => (
    <BrowserRouter>
        <div>
            <Header/>
            <Switch>
                <Route path="/" component={IssueDashboardPage} exact={true} />
                <Route path="/create" component={AddIssuePage} />
                <Route component={NotFoundPage} />
            </Switch>
        </div>
    </BrowserRouter>
);

export default AppRouter