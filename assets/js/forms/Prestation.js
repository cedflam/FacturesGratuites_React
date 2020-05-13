import React, {Fragment} from 'react';

const Prestation = (props) => {

    return (
        <Fragment>

            <div className="mt-3">
                <p>Renseignez les champs...</p>

                <input className="form-control mt-1" type="text"
                       placeholder="Saisir une prestation..."
                       name="delivery"
                       onChange={(event) => props.onItemChange(event, props.presta, "delivery" )}


                />
                <div className=" row text-center">
                    <div className="col-3">
                        <input className="form-control mt-1"
                               type="text"
                               placeholder="Qté"
                               name="quantity"
                               onChange={(event) => props.onItemChange(event, props.presta, "quantity" )}

                        />
                    </div>
                    <div className="col-3">
                        <input className="form-control mt-1"
                               type="text"
                               placeholder="unité"
                               name="unit"
                               onChange={(event) => props.onItemChange(event, props.presta, "unit" )}

                        />
                    </div>
                    <div className="col-3">
                        <input className="form-control mt-1"
                               type="text"
                               placeholder="PU"
                               name="unitPrice"
                               onChange={(event) => props.onItemChange(event, props.presta, "unitPrice" )}
                        />
                    </div>
                    <div className="col-3">
                        <input className="form-control mt-1"
                               type="text"
                               placeholder="TVA"
                               name="tva"
                               onChange={(event) => props.onItemChange(event, props.presta, "tva" )}

                        />
                    </div>
                </div>
                <input className="form-control mt-1"
                       type="text"
                       placeholder="Montant HT..."
                       name="htAmount"
                       onChange={(event) => props.onItemChange(event, props.presta, "htAmount" )}

                />
                <input className="form-control mt-1"
                       type="text"
                       placeholder="Montant TTC..."
                       name="ttcAmount"
                       onChange={(event) => props.onItemChange(event, props.presta, "ttcAmount" )}

                />
                <button type="button"
                        className="btn btn-sm btn-danger float-right mt-1"

                >
                    Supprimer Prestation
                </button>
            </div>
        </Fragment>
    );
};

export default Prestation;
