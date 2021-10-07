import React from "react";
import {Form} from "react-bootstrap";


function FormGroup(props){
    return (
        <Form.Group className={props.class}>
            <Form.Label>{props.label}</Form.Label>
            <Form.Control
                type={props.type}
                placeholder={props.placeholder}
                name={props.name}
                onChange={props.handleChange}
            />
        </Form.Group>
    );
}

export default FormGroup;
