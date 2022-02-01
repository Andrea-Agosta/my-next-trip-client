import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import React from "react";
import CountPassenger from "./CountPassenger";


function AddPeopleModal(props) {
    return (
        <Modal
            {...props}
            size="sm"
            aria-labelledby="contained-modal-title-vcenter"
            centered
        >
            <Modal.Header closeButton>
                <Modal.Title id="contained-modal-title-vcenter" className={"fw-bold fs-5"}>
                    Add Passenger
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <CountPassenger description={"adults"} />
            </Modal.Body>
            <Modal.Footer>
                <Button onClick={props.onHide}>Close</Button>
            </Modal.Footer>
        </Modal>
    );
}

export default AddPeopleModal;