import React, {Fragment} from 'react';
import ReactDom from "react-dom";
import {BrowserRouter, Route, Switch} from 'react-router-dom';
import CustomersPage from "./pages/CustomersPage";
import EstimatesPage from "./pages/EstimatesPage";
import {toast, ToastContainer} from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import EstimateNewPage from "./pages/EstimateNewPage";

const App = () => {
    return (
        <Fragment>
        <BrowserRouter>
            <Switch>
                <Route exact path="/customers" component={CustomersPage}/>
                <Route exact path="/estimates" component={EstimatesPage}/>
                <Route path="/estimates/new" component={EstimateNewPage}/>
            </Switch>
        </BrowserRouter>
            <ToastContainer position={toast.POSITION.BOTTOM_RIGHT}/>
        </Fragment>
    );
};

const rootElement = document.querySelector('#app');
ReactDom.render(<App/>, rootElement);
