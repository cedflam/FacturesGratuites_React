import React, {Fragment, useState, useEffect} from 'react';

import Field from "../forms/Field";

const ModalCustomerEdit = (props) => {

    return (
        <Fragment>
            <div className="modal fade" id="customerEdit" tabIndex="-1" role="dialog"
                 aria-labelledby="exampleModalCenterTitle" aria-hidden="true">
                <div className="modal-dialog modal-dialog-scrollable modal-dialog-centered" role="document">
                    <div className="modal-content">
                        <div className="modal-header bg-light">
                            <h3 className="modal-title" id="exampleModalCenterTitle"><i className="fas fa-pen "></i>
                            </h3>
                            <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                                <span aria-hidden="true">&times;</span>
                            </button>
                        </div>
                        <div className="modal-body bg-light">




                        </div>
                        <div className="modal-footer bg-light">

                        </div>
                    </div>
                </div>
            </div>
        </Fragment>
    );
};

export default ModalCustomerEdit;
