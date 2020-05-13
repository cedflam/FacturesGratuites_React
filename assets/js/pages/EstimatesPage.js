import React, {Fragment, useEffect, useState} from 'react';
import axios from 'axios';
import {ToastContainer, toast} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import moment from "moment";
import {NavLink} from "react-router-dom";

import TableLoader from "../components/TableLoader";

const EstimatesPage = (props) => {

    const [estimates, setEstimates] = useState([]);
    const [estimate, setEstimate] = useState({});
    const [search, setSearch] = useState("");
    const [loading, setLoading] = useState(true);



    /**
     * Permet de récupérer l'ensemble des devis liés à une company
     * au chargement de la page
     */
    useEffect(() => {
        axios.get('/estimates/findAll')
            .then(response => response.data)
            .then(data => {
                setEstimates(data);
                setLoading(false);
                toast.info("La liste des devis est chargée !")

            })
            .catch(error => {
                toast.error("Une erreur s'est produite !");
                console.log(error.response);
            })
    }, []);

    /**
     * Permet de rechercher un devis dans la liste
     * @param event
     */
    const handleSearch = (event) => {
        const value = event.target.value;
        setSearch(value);
    }
    const filteredEstimates = estimates.filter(e =>
        e.customer.firstName.toLowerCase().includes(search.toLowerCase()) ||
        e.customer.lastName.toLowerCase().includes(search.toLowerCase()) ||
        e.id.toString().includes(search.toString()) ||
        e.createdAt.toString().includes(search.toString())

        /*TODO Revoir la recherche sur les dates*/
    )


    return (

        <Fragment>
            <h2 className="text-center mt-2">Devis</h2>

            <div className="row">
                <div className="col-10 mt-3 mb-3">
                    <input className="form-control" type="text"
                           placeholder="Rechercher un devis..."
                           onChange={handleSearch}
                           value={search}
                    />
                </div>
                <div className="col-2 mt-3 mb-3">
                    <NavLink to="/estimates/new" className="btn btn-primary" >
                        <i className="fas fa-plus"></i> Devis
                    </NavLink>
                </div>
            </div>
            <table className="table table-striped">
                <thead>

                <tr>
                    <th className="text-center" scope="col">#</th>
                    <th className="text-center" scope="col">Date</th>
                    <th className="text-center" scope="col">Nom/Prénom</th>
                    <th className="text-center" scope="col">Montant HT</th>
                    <th className="text-center" scope="col">Montant TTC</th>
                    <th className="text-center" scope="col">Imprimer</th>
                    <th className="text-center" scope="col">Modifier</th>
                    <th className="text-center" scope="col">Supprimer</th>

                </tr>
                </thead>
                <tbody>

                {filteredEstimates.map(estimate =>
                    <tr key={estimate.id}>
                        <th className="text-center" scope="row">{estimate.id}</th>
                        <td className="text-center"> {moment(new Date(estimate.createdAt)).format("DD/MM/YYYY")} </td>
                        <td className="text-center"> {estimate.customer.firstName} {estimate.customer.lastName} </td>
                        <td className="text-center">{estimate.htAmount.toLocaleString()} €</td>
                        <td className="text-center">{estimate.ttcAmount.toLocaleString()} €</td>
                        <td className="text-center">
                            <button className="btn btn-sm btn-info">
                                <i className="fas fa-print"></i>
                            </button>
                        </td>
                        <td className="text-center">
                            <button  className="btn btn-sm btn-primary">
                                <i className="fas fa-pen"></i>
                            </button>
                        </td>
                        <td className="text-center">
                            <button className="btn btn-sm btn-danger">
                                <i className="fas fa-trash"></i>
                            </button>
                        </td>
                    </tr>
                )}

                </tbody>
            </table>
            {loading && <TableLoader/>}
        </Fragment>
    );
};

export default EstimatesPage;
