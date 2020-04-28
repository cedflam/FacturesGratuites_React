import React, {Fragment, useState, useEffect} from 'react';
import {toast} from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import axios from 'axios';

import Prestation from "../forms/Prestation";

const EstimateNewPage = (props) => {

    const [customers, setCustomers] = useState([]);
    const [prestations, setPrestations] = useState();

    useEffect(() => {
        axios.get('/customers/findAll')
            .then(response => response.data)
            .then(data => {
                setCustomers(data);
            })
            .catch(error => console.log(error.response))
    }, []);




    return (
        <Fragment>
            <h2 className="text-center mt-2">Nouveau Devis </h2>
            <form className="form-group">
                <div>
                    <p>Sélectionnez votre client...</p>
                    <select name="customers" id="customers-select" className="form-control">
                        <option value="">Selectionnez un client ...</option>
                        {customers.map(customer =>
                            <option key={customer.id}
                                    value={customer.id}>{customer.firstName} {customer.lastName}</option>
                        )}
                    </select>
                </div>
            </form>
            <button type="button"
                    className="btn btn-sm btn-primary mt-1"

            >
                Ajouter Prestation
            </button>

        </Fragment>
    );
};

export default EstimateNewPage;
