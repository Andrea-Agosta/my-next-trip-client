import {Form} from "react-bootstrap";
import {useState} from "react";


function Radio(props){
    const [typeFlight, setTypeFlight] = useState("return");

    return (
        <Form>
            <div className="mb-3" onChange={props.typeFlight(typeFlight)}>
                <Form.Check
                    inline
                    label="Return"
                    name="return"
                    type={"radio"}
                    checked={typeFlight === 'return'}
                    onClick={() => setTypeFlight('return')}
                />
                <Form.Check
                    inline
                    label="Oneway"
                    name="oneway"
                    type={"radio"}
                    checked={typeFlight === 'oneway'}
                    onClick={() => setTypeFlight('oneway')}
                />
            </div>
        </Form>
    );
}

export default Radio;