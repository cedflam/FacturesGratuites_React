import React, {Fragment} from 'react';

const Prestation = (props) => {


    return (
        <Fragment>
            <div className="mt-3">
                <p>Renseignez les champs...</p>
                <input className="form-control mt-1" type="text"
                       placeholder="Saisir une prestation..."/>
                <div className=" row text-center">
                    <div className="col-4">
                        <input className="form-control mt-1" type="number"
                               placeholder="Qté"/>
                    </div>
                    <div className="col-4">
                        <input className="form-control mt-1" type="number"
                               placeholder="PU"/>
                    </div>
                    <div className="col-4">
                        <input className="form-control mt-1" type="number" placeholder="TVA"/>
                    </div>
                </div>
                <input className="form-control mt-1" type="number" placeholder="Montant HT..."/>
                <input className="form-control mt-1" type="number" placeholder="Montant TTC..."/>
                <button type="button"
                        className="btn btn-sm btn-danger float-right mt-2"

                >
                    Supprimer Prestation
                </button>
            </div>
        </Fragment>
    );
};

export default Prestation;
