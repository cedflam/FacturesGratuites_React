import React, {Fragment} from 'react';

import Field from "./Field";

const EstimateFormNew = (props) => {
    return (
        <Fragment>
            <div className="modal fade" id="estimateForm" tabIndex="-1" role="dialog"
                 aria-labelledby="exampleModalCenterTitle" aria-hidden="true">
                <div className="modal-dialog modal-dialog-scrollable modal-dialog-centered" role="document">
                    <div className="modal-content">
                        <div className="modal-header bg-light">
                            <h3 className="modal-title" id="exampleModalCenterTitle">
                                <i className="fas fa-sign mr-3 "></i>
                            </h3>
                            <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                                <span aria-hidden="true">&times;</span>
                            </button>
                        </div>
                        <div className="modal-body bg-light">





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

export default EstimateFormNew;
