import React, {Fragment, useEffect, useState} from 'react';
import {toast} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import axios from 'axios';


const EstimateNewPage = (props) => {

    const [disabled, setDisabled] = useState(false);
    const [customers, setCustomers] = useState([]);
    const [customer, setCustomer] = useState({});
    const [items, setItems] = useState([]);
    const [prestation, setPrestation] = useState({
        id:Date.now().toString(),
        customer: customer,
        delivery: "",
        quantity: "",
        unit: "",
        unitPrice: "",
        tva: "",
        htAmount: "",
        ttcAmount: ""
    });
    const resetPresta = {
        id:Date.now().toString(),
        customer: customer,
        delivery: "",
        quantity: "",
        unit: "",
        unitPrice: "",
        tva: "",
        htAmount: "",
        ttcAmount: ""
    }

    //Je récupère tous les customers
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
        setPrestation({...prestation})
        let tabItems = [...items];
        setItems([...tabItems, { prestation:prestation}])
        setPrestation(resetPresta)
    }

    //Mise à jour de la liste des customers
    const handleCustomerChange = (event) => {
        const value = event.target.value;
        setCustomer(value);
        setDisabled(true);
    }

    //Mise à jour d'une prestation
    const handlePrestaChange = ({currentTarget}) => {
        //Je récupère la valeur du champ
        const {name, value, id} = currentTarget;
        const clonePresta = {...prestation}
        clonePresta[name] = value;
        setPrestation({...prestation, [name]: value })
        const tabItems = [...items];
        tabItems[id] = clonePresta;
        setItems([...tabItems])
    }
    //Supprimer une prestation
    const handleDeletePresta = (id) => {
        setItems(items.filter(item => item.id !== id));
    }

    /**
     * Permet de récuperer les données à la soumission
     * @param event
     */
    const handleSubmit = async event => {
        event.preventDefault();
        try {
            const response = await axios.post('/estimates/add', items);
            console.log('enregistré');
        } catch (error) {
            if (error.response.data) {
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
                    <select name="customers" id="customers-select" className="form-control"
                            onChange={handleCustomerChange}>
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

                    {items.map((presta, index) =>
                        <div key={index}>
                            <p>Renseignez les champs...</p>
                            <input className="form-control mt-1" type="text"
                                   placeholder="Saisir une prestation..."
                                   name="delivery"
                                   value={presta.delivery}
                                   id={index}
                                   onChange={handlePrestaChange}
                            />
                            <div className=" row text-center">
                                <div className="col-3">
                                    <input className="form-control mt-1"
                                           type="number"
                                           placeholder="Qté"
                                           name="quantity"
                                           value={presta.quantity}
                                           id={index}
                                           onChange={handlePrestaChange}

                                    />
                                </div>
                                <div className="col-3">
                                    <input className="form-control mt-1"
                                           type="text"
                                           placeholder="unité"
                                           value={presta.unit}
                                           id={index}
                                           name="unit"
                                           onChange={handlePrestaChange}

                                    />
                                </div>
                                <div className="col-3">
                                    <input className="form-control mt-1"
                                           type="number"
                                           placeholder="PU"
                                           name="unitPrice"
                                           value={presta.unitPrice}
                                           id={index}
                                           onChange={handlePrestaChange}
                                    />
                                </div>
                                <div className="col-3">
                                    <input className="form-control mt-1"
                                           type="number"
                                           placeholder="TVA"
                                           name="tva"
                                           value={presta.tva}
                                           id={index}
                                           onChange={handlePrestaChange}

                                    />
                                </div>
                            </div>
                            <input className="form-control mt-1"
                                   type="number"
                                   placeholder="Montant HT..."
                                   name="htAmount"
                                   id={index}
                                   value={presta.htAmount}
                                   onChange={handlePrestaChange}

                            />
                            <input className="form-control mt-1"
                                   type="number"
                                   placeholder="Montant TTC..."
                                   name="ttcAmount"
                                   id={index}
                                   value={presta.ttcAmount}
                                   onChange={handlePrestaChange}

                            />
                            <button type="button"
                                    className="btn btn-sm btn-danger float-right mt-1"
                                    onClick={() => handleDeletePresta(presta.id)}
                            >
                                <i className="fas fa-trash"> </i>
                            </button>
                        </div>
                    )}
                </div>
            </form>
            {disabled === true &&
            <button onClick={addPrestation} className="btn btn-sm btn-primary">
                Ajouter une prestation
            </button>
            }


        </Fragment>
    );
};

export default EstimateNewPage;
