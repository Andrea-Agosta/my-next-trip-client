import React, {useState} from "react";
import Button from "react-bootstrap/Button";
import AddPeople from "./AddPeople";


function TravellersModal(props){
    const [modalShow, setModalShow] = useState(false);

    return (
        <div>
            <Button variant="light modalBtnMobile"
                    className={"w-100 text-start"}
                    onClick={() => setModalShow(true)}
                    data-testid="custom-element"
            >
                Travellers: {props.adults + props.child + props.infant}
            </Button>
            <AddPeople
                show={modalShow}
                onHide={() => setModalShow(false)}
                addAdults={props.addAdults}
                removeAdults={props.removeAdults}
                adults={props.adults}
                child={props.child}
                infant={props.infant}
            />
        </div>
    )
}

export default TravellersModal;