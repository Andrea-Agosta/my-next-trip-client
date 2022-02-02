import React from "react";
import Nav from "react-bootstrap/Nav";
import logo from "../../images/logo.png";
import CountryCurrencyModal from "../modal/coutry-currency/Country-currency-modal";
import MediaQuery from 'react-responsive'


function Navbar(props) {
    return (
        <Nav
            activeKey="/home"
        >
            <Nav.Item className={"d-inline-flex"}>
                <img className={"logoNav"} alt={"logo"} src={logo} />
                <Nav.Link className={"brandName"} href={"/"}>My Next Trip</Nav.Link>
                <MediaQuery maxWidth={575.98}>
                    <div className={"my-auto float-end"} >
                        <button className={"btn btn-primary ms-3"} data-testid="mobile"> Log In </button>
                    </div>
                </MediaQuery>
            </Nav.Item>

            <MediaQuery maxWidth={575.98}>
                <Nav.Item className={"mx-auto mt-3"} >
                    <CountryCurrencyModal handleChangeSelect={props.handleChangeSelect} />
                </Nav.Item>
            </MediaQuery>

            <MediaQuery minWidth={576}>
                <div className={"ms-auto me-5 d-inline-flex mt-2"}>
                    <Nav.Item>
                        <CountryCurrencyModal handleChangeSelect={props.handleChangeSelect}/>
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