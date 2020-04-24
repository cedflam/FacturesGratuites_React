import React, {Fragment} from 'react';

const ModalCustomerDetail = ({customer}) => {
    return (
        <Fragment>
            <div className="modal fade" id="customerDetail" tabIndex="-1" role="dialog" aria-labelledby="exampleModalCenterTitle" aria-hidden="true">
                <div className="modal-dialog modal-dialog-scrollable modal-dialog-centered" role="document">
                    <div className="modal-content">
                        <div className="modal-header bg-light">
                            <h3 className="modal-title" id="exampleModalCenterTitle"> <i className="far fa-address-card "></i>   {customer.firstName} {customer.lastName}</h3>
                            <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                                <span aria-hidden="true">&times;</span>
                            </button>
                        </div>
                        <div className="modal-body bg-light">
                            <p><i className="fas fa-map-marked text-primary"></i> - {customer.address} {customer.postalCode} {customer.city} </p>
                            <p> <i className="fas fa-at text-primary"></i> - {customer.email} </p>
                            <p> <i className="fas fa-phone-alt text-primary"></i> - {customer.tel} </p>


                        </div>
                        <div className="modal-footer bg-light">
                            <button type="button" className="btn btn-secondary" data-dismiss="modal">Close</button>
                            <button type="button" className="btn btn-primary">Save changes</button>
                        </div>
                    </div>
                </div>
            </div>
        </Fragment>
    );
};

export default ModalCustomerDetail;
