import React from "react";
import {Form} from "react-bootstrap";

function FormGroup(props){
    return (
        <Form.Group className={props.class} controlId={props.controlId}>
            <Form.Label>{props.label}</Form.Label>
            <Form.Control type={props.type} placeholder={props.placeholder} />
        </Form.Group>
    );
}

export default FormGroup;
