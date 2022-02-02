import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import React from "react";
import CountTravellers from "./CountTravellers";


function AddPeople(props) {
    return (
        <Modal
            {...props}
            size="sm"
            aria-labelledby="contained-modal-title-vcenter"
            centered
        >
            <Modal.Header closeButton>
                <Modal.Title id="contained-modal-title-vcenter" className={"fw-bold fs-5"}>
                    Add Travellers
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <CountTravellers
                    description={"Adults:"}
                    add={props.addAdults}
                    remove={props.removeAdults}
                    traveller={props.adults}
                    name={"adults"}
                />
                <CountTravellers
                    description={"Child:"}
                    add={props.addAdults}
                    remove={props.removeAdults}
                    traveller={props.child}
                    name={"child"}
                />
                <CountTravellers
                    description={"Infant:"}
                    add={props.addAdults}
                    remove={props.removeAdults}
                    traveller={props.infant}
                    name={"infant"}
                />
            </Modal.Body>
            <Modal.Footer>
                <Button onClick={props.onHide}>Close</Button>
            </Modal.Footer>
        </Modal>
    );
}

export default AddPeople;