import React from 'react';

const ButtonActive = ({active, onClick}) => {
    return (
        <button className={active ? "btn btn-sm btn-danger" : "btn btn-sm btn-success"} onClick={onClick}>
            {active ? "Retirer" : "Ajouter"}
        </button>
    )
}

export default ButtonActive;