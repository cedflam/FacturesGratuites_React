import React, {Fragment, useEffect, useState} from 'react';
import ReactDom from "react-dom";
import {ToastContainer, toast} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import moment from "moment";
import axios from 'axios';

import TableLoader from "./components/TableLoader";
import EstimateFormNew from "./forms/EstimateFormNew";

const Estimates = () => {

    const [estimates, setEstimates] = useState([]);
    const [estimate, setEstimate] = useState({});
    const [loading, setLoading] = useState(true);
    const [search, setSearch] = useState("");
    const [modal, setModal] = useState(false)

    useEffect(() => {
        axios.get('/estimates/findAll')
            .then(response => response.data)
            .then(data => {
                setLoading(false);
                setEstimates(data);
                toast.info("Liste de devis chargée !")

            })
            .catch(error => console.log(error.response))
    }, []);

    /**
     * Permet de rechercher un customer
     * @param event
     */
    const handleSearch = (event) => {
        const value = event.target.value;
        setSearch(value);
    }

    const filteredEstimates = estimates.filter(e =>
        e.customer.firstName.toLowerCase().includes(search.toLowerCase()) ||
        e.customer.lastName.toLowerCase().includes(search.toLowerCase()) ||
        e.createdAt.toString().includes(search) ||
        e.id.toString().includes(search) ||
        e.htAmount.toString().includes(search) ||
        e.ttcAmount.toString().includes(search)

        /*TODO Améliorer la recherche sur les dates*/
    )

    /**
     * Permet de récuperer le customer courant au click
     * @param estimate
     */
    const estimateRecover = (estimate) => {
        setEstimate(estimate);
        setModal(true);
    }

    /**
     * Permet de supprimer un devis
     * @param id
     */
    const handleDelete = (id) => {
        const originalEstimates = [...estimates];
        setEstimates(estimates.filter(estimate => estimate.id !== id));
        axios.delete('/estimates/delete/' + id)
            .then(response => {
                toast.info("Le devis n° " + id + " a bien été supprimé !")
            })
            .catch(error => {
                setEstimates(originalEstimates)
                toast.error("Erreur lors de la suppression !")
            })
    }

    return (
        <Fragment>
            <h2 className="text-center pt-3">Mes devis</h2>
            <div className="row">
                <div className="col-10 mt-3 mb-3">
                    <input onChange={handleSearch} value={search} className="form-control" type="text"
                           placeholder="Rechercher..."/>
                </div>
                <div className="col-2 mt-3 mb-3">
                    <button className="btn btn-primary"
                            data-target="#estimateForm"
                            data-toggle="modal">
                        <i className="fas fa-plus"></i> Devis
                    </button>
                </div>
            </div>

            <table className="table table-striped">
                <thead>
                <tr>
                    <th className="text-center" scope="col">#</th>
                    <th className="text-center" scope="col">Date</th>
                    <th className="text-center" scope="col">Nom/Prénom</th>
                    <th className="text-center" scope="col">HT</th>
                    <th className="text-center" scope="col">TTC</th>
                    <th className="text-center" scope="col">Imprimer</th>
                    <th className="text-center" scope="col">Modifier</th>
                    <th className="text-center" scope="col">Supprimer</th>

                </tr>
                </thead>
                <tbody>
                {filteredEstimates.map(estimate =>
                    <tr className="text-center" key={estimate.id}>
                        <th className="text-center"
                            scope="row">{moment(new Date(estimate.createdAt)).format("YYYY")}{estimate.id}</th>
                        <td className="text-center">{moment(new Date(estimate.createdAt)).format("DD/MM/YYYY")} </td>
                        <td className="text-center"> {estimate.customer.lastName} {estimate.customer.firstName}   </td>
                        <td className="text-center">{estimate.htAmount}</td>
                        <td className="text-center">{estimate.ttcAmount}</td>


                        <td className="text-center">
                            <a href="#" type="button"
                               className="btn btn-sm btn-info">
                                <i className="fas fa-eye"></i>
                            </a>
                        </td>

                        <td className="text-center">
                            <button className="btn btn-sm btn-primary">
                                <i className="fas fa-pen"></i>
                            </button>
                        </td>
                        <td className="text-center">
                            <button type="button" onClick={() => handleDelete(estimate.id)}
                                    className="btn btn-sm btn-danger">
                                <i className="fas fa-trash"></i>
                            </button>
                        </td>

                    </tr>
                )}

                </tbody>
            </table>


            {loading && <TableLoader/>}
            <ToastContainer position={toast.POSITION.TOP_CENTER}/>
            <EstimateFormNew/>
        </Fragment>
    );
};

const rootElement = document.querySelector('#estimates');
ReactDom.render(<Estimates/>, rootElement);
