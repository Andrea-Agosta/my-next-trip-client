import React, {useState} from "react";
import CustomToggle from "./CustomToggle";
import CustomMenu from "./CustomMenu";
import {Dropdown} from "react-bootstrap";

function DropdownButton(props) {
    const [object, setObject] = useState((props.object === "") ? "Select Country" : props.object)
    return (
        <Dropdown>
            <Dropdown.Toggle as={CustomToggle} id="dropdown-custom-components">
                {object}
            </Dropdown.Toggle>
            <Dropdown.Menu as={CustomMenu} >
                {props.itemList.map((item, index) => (
                    <Dropdown.Item
                        key={index}
                        eventKey={index + 1}
                        code={item.code}
                        onSelect={() => {setObject(item.value); props.onChangeValue(item.value)}}
                    > {item.value} </Dropdown.Item>
                ))}
            </Dropdown.Menu>
        </Dropdown>
    );
}

export default DropdownButton;