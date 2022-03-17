import {Button, Form, Row} from "react-bootstrap";
import FormGroup from "./form-group";
import React, {useEffect, useState} from "react";
import { Redirect } from 'react-router-dom';
import Radio from "../radio/Radio";
import TravellersModal from "../modal/travellers/Travellers-modal";
import serverConnection from "../../common/serverConnection";


function SearchForm(props){
    const [airportList, setAirportList] = useState([]);
    const [suggestionFrom, setSuggestionFrom] = useState([]);
    const [suggestionTo, setSuggestionTo] = useState([]);
    const [redirect, setRedirect] = useState(false);
    const [dateSearch, setDateSearch] = useState({
        date_from: "",
        date_to: "",
        date_from_check: "",
        date_to_Check: ""
    });
    const [flyFrom, setFlyFrom] = useState("");
    const [flyTo, setFlyTo] = useState("");
    const [errorMsg, setErrorMsg] = useState({
        flyFromErr: "",
        flyToErr: "",
        dateFromErr: "",
        dateToErr: "",
        travellerErr: ""
    });
    const date = new Date();
    const today = date.setHours(0,0,0,0);
    const dateFrom = new Date(dateSearch.date_from_check);
    const dateTo = new Date(dateSearch.date_to_Check);
    const [flightSearchType, setFlightSearchType] = useState("return");
    const [countTravellers, setCountTravellers] = useState({
        adults:1,
        child:0,
        infant:0
    });

    useEffect(() => {
        // TAKE AIRPORTS LIST FROM DB
        serverConnection("GET", "/airports","")
            .then( async response => {
                const tempAirportList = [];
                await response.data.map(airports => (
                    tempAirportList.push(airports)
                ));
                await setAirportList(tempAirportList);
            })
            .catch( err => console.err(err));
    }, []);

    function flightType(props){
        setFlightSearchType(props);
    }

    // Suggestion airport list name onder the input box
    async function suggestionText(event){
        const {value, name} = event.target;
        let matchesFrom = [];
        let matchesTo = [];

        if (name === "fly_from") {
            if(value.length > 0 ) {
                matchesFrom = airportList.filter( place => {
                    const regex = new RegExp(`${value}`, "gi");
                    return place.name.match(regex);
                });
                setSuggestionFrom(matchesFrom);
            }
        } else if (name === "fly_to") {
            if(value.length > 0 ) {
                matchesTo = airportList.filter(place => {
                    const regex = new RegExp(`${value}`, "gi");
                    return place.name.match(regex);
                });
                setSuggestionTo(matchesTo);
            }
        }
    }

    // onClick on suggest row set the name on input box
    const onSuggestHandler = (event, code) => {
        if(event.target.id === "flyFrom"){
            // ToDo try to resolve with react method
            document.getElementsByName('fly_from')[0].value = event.target.textContent;
            setFlyFrom(code);
            setSuggestionFrom([]);
        } else if (event.target.id === "flyTo"){
            // ToDo try to resolve with react method
            document.getElementsByName('fly_to')[0].value = event.target.textContent;
            setFlyTo(code);
            setSuggestionTo([]);
        }
    }

    function handleChange(event) {
        const {value, name} = event.target;
        if (name === "fly_from" || name === "fly_to") {
            suggestionText(event);
            return true;
        }else {
            setDateSearch(prevValue => {
                if (name === "date_from") {
                    return {
                        date_from: setDateFormat(value),
                        date_to: prevValue.date_to,
                        date_from_check: value,
                        date_to_Check: prevValue.date_to_Check
                    }
                } else if (name === "date_to") {
                    return {
                        date_from: prevValue.date_from,
                        date_to: setDateFormat(value),
                        date_from_check: prevValue.date_from_check,
                        date_to_Check: value
                    }
                }
            });
        }
    }

    // CHANGE DATE FORMAT FOR API
    function setDateFormat(date){
        const dataSplit = date.split("-");
        return dataSplit[2] + "/" + dataSplit[1] + "/" + dataSplit[0];
    }

    // CONTROLLER DATA AND SET ERROR BEFORE MAKE A BACKEND CALL
    function submit(event){
        setErrorMsg({
            flyFromErr: "",
            flyToErr: "",
            dateFromErr: "",
            dateToErr: "",
            travellerErr: ""
        });
        event.preventDefault();
        if (
            flyFrom !== "" &&
            // search.fly_to !== "" &&     // disable at moment because the service search a new flight without fly_to
            dateSearch.date_from !== "" &&
            dateSearch.date_to !== "" &&
            dateSearch.date_from_check !== "" &&
            dateSearch.date_to_Check !== "" &&
            props.modalValue.currency !== "" &&
            dateTo >= dateFrom &&
            dateFrom >= today &&
            (countTravellers.adults + countTravellers.child + countTravellers.infant) > 0
        ){
            setRedirect(true);
        } else {
            let tempErrMsg = {
                flyFromErr: "",
                flyToErr: "",
                dateFromErr: "",
                dateToErr: "",
                travellerErr: "",
            }
            if (flyFrom === "") {
                tempErrMsg.flyFromErr = "*Please insert valid departure."
            }

            if (flyTo === "" || dateFrom < today) {
                tempErrMsg.dateFromErr = "*Please insert valid departure date."
            }

            if ( dateSearch.date_to === "" || ( dateFrom >= today && dateTo < dateFrom) || dateTo < today) {
                tempErrMsg.dateToErr = "*Please insert valid departure date."
            }

            if ((countTravellers.adults + countTravellers.child + countTravellers.infant) === 0) {
                tempErrMsg.travellerErr = "*Please insert valid number of traveler."
            }
            setErrorMsg(tempErrMsg);
        }
    }

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

    if (redirect) {
        return (
            <Redirect
                to={{
                    pathname: "/flights",
                    search: "?fly_from=" + flyFrom + "&fly_to=" + flyTo + "&date_from=" +
                        dateSearch.date_from + "&date_to=" + dateSearch.date_to +
                        "&curr=" + props.modalValue.currency +
                        ((countTravellers.adults > 0) ? "&adults=" + countTravellers.adults : "")+
                        ((countTravellers.child > 0) ? "&children=" + countTravellers.child : "") +
                        ((countTravellers.infant > 0) ? "&infants=" + countTravellers.infant : ""),
                    state: {
                        fly_from: flyFrom,
                        fly_to: flyTo,
                        date_from: dateSearch.date_from,
                        date_to: dateTo.date_to,
                        curr: props.modalValue.currency,
                        typeSearch:flightSearchType,
                        adults: countTravellers.adults,
                        children: countTravellers.child,
                        infants: countTravellers.infant
                    }
                }}
            />
        );
    } else {
        return (
            <div className={"section-search"}>
                <h1 className={"title-home"}>Let the dream begin!</h1>
                <Form className={"p-lg-5 m-lg-5 search"}>
                    <Radio typeFlight={flightType} />
                    <Row className="mb-lg-3 p-lg-3">

                        {/* fly_from */}
                        <div className={"col-lg-3"}>
                            <FormGroup
                                label={"From"}
                                type={"text"}
                                placeholder={"From"}
                                name={"fly_from"}
                                handleChange={handleChange}
                                error={errorMsg.flyFromErr}
                            />
                            {
                                suggestionFrom && suggestionFrom.slice(0, 5).map((suggestion,index) =>
                                    <div
                                        id={"flyFrom"}
                                        className={"dropdown-item bg-white mw-25"}
                                        key={index}
                                        onClick={(event) => onSuggestHandler(
                                            event,
                                            suggestion.code
                                        )}
                                    >
                                        {
                                            suggestion.name + " - " +
                                            suggestion.city.country.code + " - " +
                                            suggestion.city.country.name + " - " +
                                            suggestion.code
                                        }
                                    </div>
                                )
                            };
                        </div>

                        {/* fly_to */}
                        <div className={"col-lg-3"}>
                            <FormGroup
                                label={"To"}
                                type={"text"}
                                placeholder={"To"}
                                name={"fly_to"}
                                handleChange={handleChange}
                                error={errorMsg.flyToErr}
                            />

                            {
                                suggestionTo && suggestionTo.slice(0, 5).map((suggestion,index) =>
                                    <div
                                        id={"flyTo"}
                                        className={"dropdown-item bg-white mw-25"}
                                        key={index}
                                        onClick={(event) => onSuggestHandler(
                                            event,
                                            suggestion.code
                                        )}
                                    >
                                        {
                                            suggestion.name + " - " +
                                            suggestion.city.country.code + " - " +
                                            suggestion.city.country.name + " - " +
                                            suggestion.code
                                        }
                                    </div>
                                )
                            };
                        </div>

                        {/* date_from */}
                        <FormGroup
                            class={(flightSearchType === "return" ) ? "col-lg-2" : "col-lg-3"}
                            label={"Depart"}
                            type={"date"}
                            name={"date_from"}
                            handleChange={handleChange}
                            error={errorMsg.dateFromErr}
                        />

                        {(flightSearchType === "return" ) && (

                            /* date_to */
                            <FormGroup
                                class={"col-lg-2"}
                                label={"Return"}
                                type={"date"}
                                name={"date_to"}
                                handleChange={handleChange}
                                error={errorMsg.dateToErr}
                            />
                        )}

                        <div className={(flightSearchType === "return" ) ? "col-lg-2" : "col-lg-3"}>
                            <label className={"mb-2"}>Travellers</label>
                            <TravellersModal
                                addAdults={increase}
                                removeAdults={decrease}
                                adults={countTravellers.adults}
                                child={countTravellers.child}
                                infant={countTravellers.infant}
                            />
                            <div className={"errorMsg"}>{errorMsg.travellerErr}</div>
                        </div>
                    </Row>
                    <Button
                        className={"fw-bold ps-5 pe-5 d-flex ms-auto me-3 mt-5"}
                        variant="primary"
                        type="submit"
                        onClick={submit}
                    >
                        Submit
                    </Button>
                </Form>
            </div>
        );
    }
}

export default SearchForm;