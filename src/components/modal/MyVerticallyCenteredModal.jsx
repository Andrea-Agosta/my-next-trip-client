import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import React from "react";
import { Globe2, CurrencyExchange } from 'react-bootstrap-icons';
import Select from "../select/Select";

function MyVerticallyCenteredModal(props) {

    return (
        <Modal
            {...props}
            size="sm"
            aria-labelledby="contained-modal-title-vcenter"
            centered
        >
            <Modal.Header closeButton>
                <Modal.Title id="contained-modal-title-vcenter" className={"fw-bold fs-5"}>
                    Regional settings
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <div className={"mb-4"}>
                    <Globe2 className={"d-inline mb-1"}/>
                    <h6 className={"d-inline ms-2"}>Country / Region</h6>
                    <p className={"modal-paragraph"}>
                        Selecting the country you’re in will give you local deals and information.
                    </p>
                    <Select
                        name={"country"}
                        countyselected={props.country}
                        itemList={props.countries_list}
                        handleChange={props.change_country}
                    />
                </div>
                <div className={"mb-2"}>
                    <div className={"mb-2"}>
                        <CurrencyExchange className={"d-inline"}/>
                        <h6 className={"d-inline ms-2"}>Currency</h6>
                    </div>
                    <Select
                        name={"currency"}
                        currencySelected={props.currency}
                        itemList={props.currencies_list}
                        handleChange={props.change_currency}
                    />
                </div>
            </Modal.Body>
            <Modal.Footer>
                <Button onClick={props.onHide}>Close</Button>
            </Modal.Footer>
        </Modal>
    );
}

export default MyVerticallyCenteredModal;