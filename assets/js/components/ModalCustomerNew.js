import React, {Fragment, useState} from 'react';
import axios from 'axios';


import Field from "../forms/Field";

const ModalCustomerNew = (props) => {

    const [customer, setCustomer] = useState({
        firstName: "",
        lastName: "",
        address: "",
        postalCode: "",
        city: "",
        email: "",
        tel: ""
    })

    const [errors, setErrors] = useState({
        firstName: "",
        lastName: "",
        address: "",
        postalCode: "",
        city: "",
        email: "",
        tel: ""
    })

    /**
     * Permet de récuperer la saisie dans le state
     * @param currentTarget
     */
    const handleChange = ({currentTarget}) => {
        const {name, value} = currentTarget;
        setCustomer({...customer, [name]: value})
    }

    /**
     * Permet de récuperer les données à la soumission
     * @param event
     */
    const handleSubmit = async event => {
        event.preventDefault();
        try{
          const response =  await axios.post('/customers/new', customer);
          setErrors({});
        }catch(error){
            if(error.response.data){
                const apiErrors = {};
                error.response.data.violations.forEach(violation => {
                    apiErrors[violation.propertyPath] = violation.title;
                });
                setErrors(apiErrors);
            }
        }
    }

    //Permet de rafraichir la liste des customers à la fermeture de la modal
    const handleClose = () => {
        window.location.href = '/customers';
    }

    return (
        <Fragment>
            <div className="modal fade" id="customerNew" tabIndex="-1" role="dialog" data-backdrop="static"
                 aria-labelledby="exampleModalCenterTitle" aria-hidden="true">
                <div className="modal-dialog modal-dialog-scrollable modal-dialog-centered" role="document">
                    <div className="modal-content">
                        <div className="modal-header bg-light ">
                            <h3 className="modal-title " id="exampleModalCenterTitle">
                                Nouveau Client
                            </h3>
                            <button onClick={handleClose} type="button" className="close" data-dismiss="modal" aria-label="Close" >
                                <span aria-hidden="true" >&times;</span>
                            </button>
                        </div>
                        <div className="modal-body bg-light">
                            <form onSubmit={handleSubmit}>
                                <Field name="firstName" label="Prénom" placeholder="Nom de famille du client..."
                                       value={customer.firstName} onChange={handleChange} error={errors.firstName}/>
                                <Field name="lastName" label="Nom de famille" placeholder="Prénom du client..."
                                       value={customer.lastName} onChange={handleChange} error={errors.lastName}/>
                                <Field name="address" label="Adresse" placeholder="Adresse du client..."
                                       value={customer.address} onChange={handleChange} error={errors.address}/>
                                <Field name="postalCode" label="Code postal" placeholder="Code postal du client..."
                                       value={customer.postalCode} onChange={handleChange} error={errors.postalCode}/>
                                <Field name="city" label="Ville" placeholder="Ville du client..." value={customer.city}
                                       onChange={handleChange} error={errors.city}/>
                                <Field name="email" label="Email" placeholder="Email du client..." type="email"
                                       value={customer.email} onChange={handleChange} error={errors.email}/>
                                <Field name="tel" label="Téléphone" placeholder="Téléphone du client..."
                                       value={customer.tel} onChange={handleChange} error={errors.tel}/>
                                <div className="form-group">
                                    <button type="submit" className="btn btn-primary">Enregistrer</button>
                                </div>
                            </form>
                        </div>
                        <div className="modal-footer bg-light">

                        </div>
                    </div>
                </div>
            </div>
        </Fragment>
    );
};

export default ModalCustomerNew;
