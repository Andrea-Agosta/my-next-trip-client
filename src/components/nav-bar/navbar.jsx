import React from "react";
import Nav from "react-bootstrap/Nav";
import logo from "../../images/logo.png";
import Modal from "../modal/Modal";
import MediaQuery from 'react-responsive'


function Navbar(props) {
    return (
        <Nav
            activeKey="/home"
            onSelect={(selectedKey) => alert(`selected ${selectedKey}`)}
        >
            <Nav.Item className={"d-inline-flex"}>
                <img className={"logoNav"} alt={"logo"} src={logo} />
                <Nav.Link className={"brandName"} eventKey="/home">My Next Trip</Nav.Link>
                <MediaQuery maxWidth={575.98}>
                    <div className={"my-auto float-end"} >
                        <button className={"btn btn-primary ms-3"} data-testid="mobile"> Log In </button>
                    </div>
                </MediaQuery>
            </Nav.Item>

            <MediaQuery maxWidth={575.98}>
                <Nav.Item className={"mx-auto mt-3"} >
                    <Modal handleChangeSelect={props.handleChangeSelect} />
                </Nav.Item>
            </MediaQuery>

            <MediaQuery minWidth={576}>
                <div className={"ms-auto me-5 d-inline-flex mt-2"}>
                    <Nav.Item>
                        <Modal handleChangeSelect={props.handleChangeSelect} role={"currencyCountry"} />
                    </Nav.Item>
                    <Nav.Item>
                        <button className={"btn btn-primary ms-3"} data-testid="normal" > Log In </button>
                    </Nav.Item>
                </div>
            </MediaQuery>
        </Nav>
    );
}

export default Navbar;