import Nav from "react-bootstrap/Nav";
import logo from "../../../images/logo.png";
import Modal from "../../modal/Modal";
import React from "react";
import {isMobile} from 'react-device-detect';


function NavbarPC(props){
    return(
        <Nav
            activeKey="/home"
            onSelect={(selectedKey) => alert(`selected ${selectedKey}`)}
        >
            <Nav.Item className={"d-inline-flex"}>
                <img className={"logoNav"} alt={"logo"} src={logo} />
                <Nav.Link className={"brandName"} eventKey="/home">My Next Trip</Nav.Link>
                {isMobile &&
                    <div className={"my-auto float-end"} >
                        <button className={"btn btn-primary ms-3"}> Log In </button>
                    </div>
                }
            </Nav.Item>
            {
                (isMobile) ?
                        <Nav.Item className={"mx-auto mt-3"} >
                            <Modal handleChangeSelect={props.handleChangeSelect} />
                        </Nav.Item>
                :
                    <div className={"ms-auto me-5 d-inline-flex mt-2"}>
                        <Nav.Item>
                            <Modal handleChangeSelect={props.handleChangeSelect} />
                        </Nav.Item>
                        <Nav.Item>
                            <button className={"btn btn-primary ms-3"}> Log In </button>
                        </Nav.Item>
                    </div>
            }
        </Nav>
    );
}

export default NavbarPC;