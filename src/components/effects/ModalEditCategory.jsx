import React, {useRef, useEffect, useCallback, useState} from "react";
import {useSpring, animated} from 'react-spring';
import styled from "styled-components";
import {MdClose} from 'react-icons/md';
import Field from "../forms/Field";
import API from "../../services/API";
import {toast} from "react-toastify";
import FormContentLoader from "../loaders/FormContentLoader";
import {Link} from "react-router-dom";

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

const ModalCreateCategory = ({showEditModal, setShowEditModal, history, match, id}) => {

    //MODAL
    const modalRef = useRef();
    const animation = useSpring({
        config: {
            duration: 250
        },
        opacity: showEditModal ? 1 : 0,
        transform: showEditModal ? `translateY(0%)` : `translateY(-100%)`
    });

    const closeModal = e => {
        if (modalRef.current === e.target) {
            setShowEditModal(false);
        }
    };

    const keyPress = useCallback(e => {
        if (e.key === "Escape" && showEditModal) {
            setShowEditModal(false);
        }
    }, [setShowEditModal, showEditModal]);

    useEffect(() => {
        document.addEventListener('keydown', keyPress);
        return document.removeEventListener('keydown', keyPress);
    }, [keyPress]);
    //END MODAL


    return (
        <>
            {showEditModal ? (
                <Background ref={modalRef} onClick={closeModal}>
                    <animated.div style={animation}>
                        <ModalWrapper>
                            <ModalContent>
                                <h1>Modification d'une catégorie</h1>
                            </ModalContent>
                            <CloseModalButton arial-label='Close modal' onClick={() => setShowEditModal(prev => !prev)}/>
                        </ModalWrapper>
                    </animated.div>
                </Background>
            ) : null}
        </>
    )
}
export default ModalCreateCategory;