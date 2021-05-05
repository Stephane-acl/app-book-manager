import React from 'react';

const ButtonActive = ({active, onClick}) => {
    return (
        <button className={active ? "btn-off" : "btn-on"} onClick={onClick}>
            {active ? "Retirer" : "Ajouter"}
        </button>
    )
}

export default ButtonActive;