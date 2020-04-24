import React, {Fragment, useEffect, useState} from 'react';
import ReactDom from 'react-dom';
import axios from 'axios';
import '../css/customers.css';

import ModalCustomerDetail from "./components/ModalCustomerDetail";
import AjaxLoading from "./components/AjaxLoading";


const Customers = (props) => {

    const [customers, setCustomers] = useState([]);
    const [customer, setCustomer] = useState({});
    const [loading, setLoading] = useState(true);
    const [search, setSearch] = useState("");

    /**
     * Permet de récuperer les customers liés à une company
     */
    useEffect(() => {
        axios.get('/customers/findAll')
            .then(response => response.data)
            .then(data => {
                setCustomers(data);
                setLoading(false);
            })
            .catch(error => console.log(error.response))
    }, []);


    /**
     * Permet de récuperer le customer courant au click
     * @param customer
     */
    const customerRecover = (customer) => {
        setCustomer(customer);
    }

    /**
     * Permet de rechercher un customer
     * @param event
     */
    const handleSearch = (event) => {
        const value = event.target.value;
        setSearch(value);
    }
    const filteredCustomers =  customers.filter(c =>
        c.firstName.toLowerCase().includes(search.toLowerCase()) ||
        c.lastName.toLowerCase().includes(search.toLowerCase()) ||
        c.email.toLowerCase().includes(search.toLowerCase())
    )


    return (

        <Fragment>

            <h2 className="text-center pt-3">Mes clients</h2>
            <div className="col-4 mt-3 mb-3">
                <input onChange={handleSearch} value={search} className="form-control" type="text" placeholder="Rechercher un client..."/>
            </div>
            <table className="table table-striped">
                <thead>
                <tr>
                    <th className="text-center" scope="col">#</th>
                    <th scope="col">Nom/Prenom</th>
                    <th scope="col">Email</th>
                    <th className="text-center" scope="col">Fiche</th>
                    <th className="text-center" scope="col">Modifier</th>
                    <th className="text-center" scope="col">Supprimer</th>
                </tr>
                </thead>
                <tbody>

                {filteredCustomers.map(customer =>
                    <tr key={customer.id}>
                        <th className="text-center" scope="row">{customer.id}</th>
                        <td>{customer.lastName} {customer.firstName}</td>
                        <td>{customer.email}</td>
                        <td className="text-center">
                            <button type="button" onClick={() => customerRecover(customer)}
                                    className="btn btn-sm btn-success" data-toggle="modal" data-target="#clientDetail">
                                <i className="fas fa-eye"></i>
                            </button>
                        </td>
                        <td className="text-center">
                            <button type="button" className="btn btn-sm btn-primary">
                                <i className="fas fa-pen"></i>
                            </button>
                        </td>
                        <td className="text-center">
                            <button type="button" className="btn btn-sm btn-danger">
                                <i className="fas fa-trash"></i>
                            </button>
                        </td>

                    </tr>
                )}
                </tbody>
            </table>
            {loading && <AjaxLoading/> }
            <ModalCustomerDetail customer={customer}/>

        </Fragment>
    );
}

const rootElement = document.querySelector('#customers');
ReactDom.render(<Customers/>, rootElement);



