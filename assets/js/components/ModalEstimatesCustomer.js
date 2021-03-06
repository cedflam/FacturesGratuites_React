import React, {Fragment, useState, useEffect} from 'react';
import moment from "moment";
import {NavLink} from "react-router-dom";



const ModalEstimatesCustomer = ({customer}) => {

    const handleRedirect = (id) => {
        window.location.href = '/estimates/'+id;
    }

    const handlePrint = () => {
        console.log('imprimer')
    }

    const handleDelete = () => {
        console.log('delete')
    }

    return (
        <Fragment>
            <div className="modal fade" id="customerEstimates" tabIndex="-1" role="dialog"
                 aria-labelledby="exampleModalCenterTitle" aria-hidden="true">
                <div className="modal-dialog modal-dialog-scrollable modal-dialog-centered" role="document">
                    <div className="modal-content">
                        <div className="modal-header bg-light">
                            <h3 className="modal-title" id="exampleModalCenterTitle">
                                <i className="fas fa-sign mr-3 "></i> Devis de {customer.firstName} {customer.lastName}
                            </h3>
                            <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                                <span aria-hidden="true">&times;</span>
                            </button>
                        </div>
                        <div className="modal-body bg-light">

                            <table className="table table-striped">
                                <thead>

                                <tr>
                                    <th className="text-center" scope="col">#</th>
                                    <th className="text-center" scope="col">Date</th>
                                    <th className="text-center" scope="col"> HT</th>
                                    <th className="text-center" scope="col"> TTC</th>
                                </tr>

                                </thead>
                                <tbody>
                                {customer.estimates.map(estimate =>
                                    <tr key={estimate.id}>
                                        <th className="text-center " scope="row">{estimate.id}</th>
                                        <td className="text-center ">{moment(new Date(estimate.createdAt)).format("DD/MM/YYYY")}</td>
                                        <td className="text-center ">{estimate.htAmount.toLocaleString()} €</td>
                                        <td className="text-center ">{estimate.ttcAmount.toLocaleString()} €</td>
                                    </tr>
                                )}
                                </tbody>
                            </table>

                        </div>
                        <div className="modal-footer bg-light">
                            <button type="button" className="btn btn-secondary" data-dismiss="modal">Fermer</button>
                        </div>
                    </div>
                </div>
            </div>

        </Fragment>
    );
};

export default ModalEstimatesCustomer;
