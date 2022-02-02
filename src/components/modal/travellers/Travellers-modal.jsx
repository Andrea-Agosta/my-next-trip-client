import React, {useState} from "react";
import Button from "react-bootstrap/Button";
import AddPeopleModal from "./AddPeopleModal";


function TravellersModal(){
    const [modalShow, setModalShow] = React.useState(false);

    // SET NUMBER OF TRAVELLERS
    const [countTravellers, setCountTravellers] = useState({
        adults:1,
        child:0,
        infant:0
    });

    // ADD TRAVELLERS
    function increase(event){
        if( event.target.name === "adults"){
            setCountTravellers({
                adults: countTravellers.adults + 1,
                child: countTravellers.child,
                infant: countTravellers.infant
            });
        } else if( event.target.name === "child"){
            setCountTravellers({
                adults: countTravellers.adults,
                child: countTravellers.child + 1,
                infant: countTravellers.infant
            });
        } else if( event.target.name === "infant"){
            setCountTravellers({
                adults: countTravellers.adults,
                child: countTravellers.child,
                infant: countTravellers.infant + 1
            });
        }
    }

    // REMOVE TRAVELLERS
    function decrease(event){
        if( event.target.name === "adults" && countTravellers.adults > 0){
            setCountTravellers({
                adults:countTravellers.adults - 1,
                child: countTravellers.child,
                infant: countTravellers.infant
            });
        } else if( event.target.name === "child" && countTravellers.child > 0){
            setCountTravellers({
                adults: countTravellers.adults,
                child: countTravellers.child - 1,
                infant: countTravellers.infant
            });
        } else if( event.target.name === "infant" && countTravellers.infant > 0){
            setCountTravellers({
                adults: countTravellers.adults,
                child: countTravellers.child,
                infant: countTravellers.infant - 1
            });
        }
    }

    return (
        <div>
            <Button variant="light modalBtnMobile"
                    onClick={() => setModalShow(true)}
                    data-testid="custom-element"
            >
                Travellers: {countTravellers.adults + countTravellers.child + countTravellers.infant}
            </Button>
            <AddPeopleModal
                show={modalShow}
                onHide={() => setModalShow(false)}
                addAdults={increase}
                removeAdults={decrease}
                adults={countTravellers.adults}
                child={countTravellers.child}
                infant={countTravellers.infant}
            />
        </div>
    )
}

export default TravellersModal;