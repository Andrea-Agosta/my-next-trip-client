import React from "react";
import {Form} from "react-bootstrap";


function Select(props) {
    return (
        <Form.Select onChange={props.handleChange} >
            {props.itemList.map((item, index) => {
                if (props.countyselected === item.value || props.currencySelected === item.code) {
                    return (
                        <option
                            key={index}
                            value={item.value}
                            selected
                        > {item.value} </option>
                    );
                } else {
                    return (
                        <option
                            key={index}
                            value={item.value}
                        > {item.value} </option>
                    );
                }
            })}
        </Form.Select>
    );
}

export default Select;