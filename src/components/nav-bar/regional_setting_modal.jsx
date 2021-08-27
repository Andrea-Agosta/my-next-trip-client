import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import React from "react";
import { Globe2, CurrencyExchange } from 'react-bootstrap-icons';
import DropdownButton from "../drop-down/DropdownButton";

class MyVerticallyCenteredModal extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            currentCountry: this.props.country,
            currentCurrency: "Currency",
            itemList: ""
        };
    }

    render() {
        return (
            <Modal
                {...this.props}
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
                            <DropdownButton
                                className = "dropdown-menu"
                                object={this.state.currentCountry}
                                itemList={this.props.countriesList}
                                onChangeValue={this.props.onChangeCountry}
                            />
                    </div>
                    <div className={"mb-2"}>
                        <div className={"mb-2"}>
                            <CurrencyExchange className={"d-inline"}/>
                            <h6 className={"d-inline ms-2"}>Currency</h6>
                        </div>
                            <DropdownButton
                                object={this.state.currentCurrency}
                                itemList={this.props.currenciesList}
                                onChangeValue={this.props.onChangeCurrency}
                            />
                    </div>
                </Modal.Body>
                <Modal.Footer>
                    <Button onClick={this.props.onHide}>Close</Button>
                </Modal.Footer>
            </Modal>
        );
    }
}

export default MyVerticallyCenteredModal;