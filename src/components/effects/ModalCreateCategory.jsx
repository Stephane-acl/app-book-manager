import React, {useRef, useEffect, useCallback, useState} from "react";
import {useSpring, animated} from 'react-spring';
import styled from "styled-components";
import {MdClose} from 'react-icons/md';
import Field from "../forms/Field";
import API from "../../services/API";
import {toast} from "react-toastify";

const Background = styled.div`
width: 100%;
height: 100%;
background: rgba(0, 0, 0, 0.8);
position: fixed;
display: flex;
justify-content: center;
align-items: center;
left:0;
top:0;
z-index: 4;
`;

const ModalWrapper = styled.div`
width: 800px;
height: 500px;
box-shadow: 0 5px 16px rgb(0 0 0 / 20%);
background: #fff;
border-radius: 10px;
display: flex;
justify-content: center;
position: relative;
`;

const ModalContent = styled.div`
display: flex;
flex-direction: column;
justify-content: center;
align-items: center;
line-height: 1.8;
color: #141414;

h1 {
position: absolute;
top: 85px;
}

form {
margin-bottom: 70px;
margin-top: 95px;
}

input  {
width: 330px;
height: 60px;
font-size: 1.25rem;
color: gray;
}
`;

const CloseModalButton = styled(MdClose)`
cursor: pointer;
position: absolute;
top: 20px;
right: 20px;
width: 32px;
height: 32px;
padding: 0;
z-index: 10;
`;

const ModalCreateCategory = ({showModal, setShowModal}) => {

    //MODAL
    const modalRef = useRef();
    const animation = useSpring({
        config: {
            duration: 250
        },
        opacity: showModal ? 1 : 0,
        transform: showModal ? `translateY(0%)` : `translateY(-100%)`
    });

    const closeModal = e => {
        if (modalRef.current === e.target) {
            setShowModal(false);
        }
    };

    const keyPress = useCallback(e => {
        if (e.key === "Escape" && showModal) {
            setShowModal(false);
        }
    }, [setShowModal, showModal]);

    useEffect(() => {
        document.addEventListener('keydown', keyPress);
        return document.removeEventListener('keydown', keyPress);
    }, [keyPress]);
    //END MODAL


    const [category, setCategory] = useState({
        name: ""
    });

    const [errors, setErrors] = useState({
        name: ""
    });

    // Gestion des changements des inputs dans le formulaire
    const handleChange = (event) => {
        const value = event.currentTarget.value;
        const name = event.currentTarget.name;
        setCategory({...category, [name]: value});
    };

    // Gestion de la soumission du formulaire
    const handleSubmit = async (event) => {
        event.preventDefault();
        try {
            await API.createCategory(category);
            toast.success("La catégorie à bien été enregistrée");
            //history.replace('/categories');
            //setShowModal(false);
            //document.location.reload()
        } catch ({response}) {
            const {violations} = response.data;
            if (violations) {
                const apiErrors = {};
                violations.forEach(violation => {
                    apiErrors[violation.propertyPath] = violation.message;
                });
                setErrors(apiErrors);
                toast.error("Une erreur dans votre formulaire");
            }
        }
    }

    return (
        <>
            {showModal ? (
                <Background ref={modalRef} onClick={closeModal}>
                    <animated.div style={animation}>
                        <ModalWrapper>
                            <ModalContent>
                                <h1>Création d'une catégorie</h1>
                                <form onSubmit={handleSubmit}>
                                    <Field name="name"
                                           placeholder="Nom de la catégorie"
                                           value={category.name}
                                           onChange={handleChange}
                                           error={errors.name}
                                    />
                                </form>
                                <div className='form-group'>
                                    <button type='submit' className='btn btn-success'
                                            onClick={handleSubmit}>Enregistrer
                                    </button>
                                </div>
                            </ModalContent>
                            <CloseModalButton arial-label='Close modal' onClick={() => setShowModal(prev => !prev)}/>
                        </ModalWrapper>
                    </animated.div>
                </Background>
            ) : null}
        </>
    )
}
export default ModalCreateCategory;

