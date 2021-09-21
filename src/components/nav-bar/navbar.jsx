import React from "react";
import Nav from 'react-bootstrap/Nav'
import logo from '../../images/logo.png'
import Modal from "../modal/modal";

function Navbar() {
    return (
        <div className={"pt-2"}>
            <Nav
                activeKey="/home"
                onSelect={(selectedKey) => alert(`selected ${selectedKey}`)}
            >
                <Nav.Item className={"d-inline-flex"}>
                    <img className={"logoNav"} src={logo} />
                    <Nav.Link className={"brandName"} href="/home">My Next Trip</Nav.Link>
                </Nav.Item>
                <Nav.Item>
                    <Nav.Link eventKey="link-1">Link</Nav.Link>
                </Nav.Item>
                <Nav.Item>
                    <Nav.Link eventKey="link-2">Link</Nav.Link>
                </Nav.Item>
                <Nav.Item>
                    <Nav.Link eventKey="disabled" disabled>
                        Disabled
                    </Nav.Link>
                </Nav.Item>
                <div className={"ms-auto me-5 d-inline-flex mt-2"}>
                <Nav.Item>
                    <Modal />
                </Nav.Item>
                <Nav.Item>
                    <button className={"btn btn-primary ms-3"}> Log In </button>
                </Nav.Item>
                </div>
            </Nav>
        </div>
    )
}

export default Navbar;