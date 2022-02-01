import {Button, Form, Row} from "react-bootstrap";
import FormGroup from "./form-group";
import React, {useState} from "react";
import { Redirect } from 'react-router-dom';
import Radio from "../radio/Radio";
import Modal from "../modal/Modal";


function SearchForm(props){
    // const [placeList, setPlaceList] = useState([]);                 // Future upgrade
    const [redirect, setRedirect] = useState(false);
    const [search, setSearch] = useState({
        fly_from: "",
        fly_to: "",
        date_from: "",
        date_to: ""
    });
    const [errorMsg, setErrerMsg] = useState({
        flyFromErr: "",
        flyToErr: "",
        dateFromErr: "",
        dateToErr: ""
    });
    const date = new Date();
    const today = date.setHours(0,0,0,0);
    const dateFrom = new Date(search.date_from);
    const dateTo = new Date(search.date_to);
    const [flightSearchType, setFlightSearchType] = useState("return");

    // useEffect(() => {
    //     // TAKE PLACE LIST FROM DB
    //     fetch(BACKEND_URL + "/placesList", {
    //         headers: {
    //             'Accept': 'application/json',
    //             'Content-Type': 'application/json'
    //         }
    //     })                                                      // Future Upgrade
    //         .then(response => response.json())
    //         .then(data => {
    //             let places_list = [];
    //             let autocomplete = [];
    //             data.map(item => {
    //                 places_list.push({
    //                     placeName: item.PlaceName,
    //                     cityId: item.CityId
    //                 });
    //                 autocomplete.push(item.PlaceName);
    //                 return true;
    //             });
    //             setPlaceList(places_list);
    //         })
    //         .catch(err => console.log(err));
    //
    // }, []);

    function flightType(props){
        setFlightSearchType(props);
    }

    function handleChange(event) {
        const {value, name} = event.target;
        setSearch(prevValue => {
           if (name === "fly_from") {
               return{
                   fly_from: value,
                   fly_to: prevValue.fly_to,
                   date_from: prevValue.date_from,
                   date_to: prevValue.date_to
               }
           } else if (name === "fly_to") {
               return{
                   fly_from: prevValue.fly_from,
                   fly_to: value,
                   date_from: prevValue.date_from,
                   date_to: prevValue.date_to
               }
           } else if (name === "date_from"){
               return{
                   fly_from: prevValue.fly_from,
                   fly_to: prevValue.fly_to,
                   date_from: value,
                   date_to: prevValue.date_to
               }
           } else if (name === "date_to") {
               return{
                   fly_from: prevValue.fly_from,
                   fly_to: prevValue.fly_to,
                   date_from: prevValue.date_from,
                   date_to: value
               }
           }
        });
    }

    function setDateFormat(date){
        const dataSplit = date.split("-");
        return dataSplit[2] + "/" + dataSplit[1] + "/" + dataSplit[0];
    }

    function submit(event){
        setErrerMsg({
            flyFromErr: "",
            flyToErr: "",
            dateFromErr: "",
            dateToErr: ""
        });
        event.preventDefault();

        if (
            search.fly_from !== "" &&
            // search.fly_to !== "" &&     // disable at moment because the service search a new flight without fly_to
            search.date_from !== "" &&
            search.date_to !== "" &&
            props.modalValue.currency !== "" &&
            dateTo >= dateFrom &&
            dateFrom >= today
        ){
            setRedirect(true);
        } else {
            let tempErrMsg = {
                flyFromErr: "",
                flyToErr: "",
                dateFromErr: "",
                dateToErr: ""
            }
            if (search.fly_from === "") {
                tempErrMsg.flyFromErr = "*Please insert valid departure."
            }

            if (search.date_from === "" || dateFrom < today) {
                tempErrMsg.dateFromErr = "*Please insert valid departure date."
            }

            if ( search.date_to === "" || ( dateFrom >= today && dateTo < dateFrom) || dateTo < today) {
                tempErrMsg.dateToErr = "*Please insert valid departure date."
            }
            setErrerMsg(tempErrMsg);
        }
    }

    if (redirect) {
        return (
            <Redirect
                to={{
                    pathname: "/flights",
                    search: "?fly_from=" + search.fly_from + "&fly_to=" + search.fly_to + "&date_from=" +
                        setDateFormat(search.date_from) + "&date_to=" + setDateFormat(search.date_to) +
                        "&curr=" + props.modalValue.currency,
                    state: {
                        fly_from: search.fly_from,
                        fly_to: search.fly_to,
                        date_from: setDateFormat(search.date_from),
                        date_to: setDateFormat(search.date_to),
                        curr: props.modalValue.currency,
                        typeSearch:flightSearchType
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
                            <FormGroup
                                class={"col-lg-3"}
                                label={"From"}
                                type={"text"}
                                placeholder={"From"}
                                name={"fly_from"}
                                handleChange={handleChange}
                                error={errorMsg.flyFromErr}
                            />

                            {/* fly_to */}
                            <FormGroup
                                class={"col-lg-3"}
                                label={"To"}
                                type={"text"}
                                placeholder={"To"}
                                name={"fly_to"}
                                handleChange={handleChange}
                                error={errorMsg.flyToErr}
                            />

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
                                {/*<Form.Select>*/}
                                {/*    <option> 1 person</option>*/}
                                {/*</Form.Select>*/}
                                <Modal role={"addPeople"}/>
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