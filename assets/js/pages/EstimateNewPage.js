import React, {Fragment, useEffect, useState} from 'react';
import {ToastContainer, toast} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import axios from 'axios';

import Prestation from "../forms/Prestation";


const EstimateNewPage = () => {

    const [customers, setCustomers] = useState([]);
    const [customer, setCustomer] = useState("");
    const [items, setItems] = useState([]);


    useEffect(() => {
        axios.get('/customers/findAll')
            .then(response => response.data)
            .then(data => {
                setCustomers(data);
            })
            .catch(error => console.log(error.response))
    }, []);


    /**
     * Permet d'ajouter une prestation
     */
    const addPrestation = () => {

        const id = Date.now().toString();
        const prestation = {...items};
        prestation[id] = {
            customer:customer,
            id: id,
            delivery: "",
            quantity: "",
            unit: "",
            unitPrice: "",
            tva: "",
            htAmount: "",
            ttcAmount: ""
        }
        setItems([...items, {prestation:prestation}])
    }

    const handleCustomerChange = (event) => {
        const value = event.target.value;
        setCustomer(value);

    }

    const handleItemChange = (event, prestation, field ) => {
       const value = event.target.value;
       const clonePresta = {...prestation};
       clonePresta[field] = value;
       const clonePrestations = {...items};
       clonePrestations[clonePresta.id] = clonePresta;

       console.log(clonePrestations)
    }

    /**
     * Permet de récuperer les données à la soumission
     * @param event
     */
    const handleSubmit = async event => {
        event.preventDefault();
        try{
            const response =  await axios.post('/estimates/add', items );
            console.log('enregistré');
        }catch(error){
            if(error.response.data){
               console.log(error.response);
            }
            toast.error("Une erreur s'est produite !")
        }
    }

    return (
        <Fragment>
            <h2 className="text-center mt-2">Nouveau Devis </h2>
            <form className="form-group" onSubmit={handleSubmit}>
                <button type="submit" className="btn btn-success mt-1 mb-3 float-right">Enregistrer le devis</button>
                <div>
                    <p>Sélectionnez votre client...</p>
                    <select name="customers" id="customers-select" className="form-control" onChange={handleCustomerChange}>
                        <option value="">Selectionnez un client ...</option>
                        {customers.map(customer =>
                            <option key={customer.id}
                                    value={customer.id}
                                    name="customer"
                            >
                                {customer.firstName} {customer.lastName}
                            </option>
                        )}
                    </select>
                </div>

                <div className="mt-3">

                    {Object.keys(items).map((prestation, index) =>
                        <Prestation key={index} prestation={items[prestation]} onItemChange={handleItemChange}/>
                    )}
                </div>
            </form>
            <button onClick={addPrestation} className="btn btn-sm btn-primary">
                Ajouter une prestation
            </button>


        </Fragment>
    );
};

export default EstimateNewPage;
