import {Button, Form, Row} from "react-bootstrap";
import FormGroup from "./form-group";
import React, {useState} from "react";
import { Redirect } from 'react-router'


function SearchForm(props){
    // const [placeList, setPlaceList] = useState([]);                 // Future upgrade
    const [redirect, setRedirect] = useState(false);
    const [search, setSearch] = useState({
       from: "",
       toFlight: "",
       depart: "",
       return: ""
    });

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

    function handleChange(event) {
        const {value, name} = event.target;
        setSearch(prevValue => {
           if (name === "from") {
               return{
                   from: value,
                   toFlight: prevValue.toFlight,
                   depart: prevValue.depart,
                   return: prevValue.return
               }
           } else if (name === "toFlight") {
               return{
                   from: prevValue.from,
                   toFlight: value,
                   depart: prevValue.depart,
                   return: prevValue.return
               }
           } else if (name === "depart"){
               return{
                   from: prevValue.from,
                   toFlight: prevValue.toFlight,
                   depart: value,
                   return: prevValue.return
               }
           } else if (name === "return") {
               return{
                   from: prevValue.from,
                   toFlight: prevValue.toFlight,
                   depart: prevValue.depart,
                   return: value
               }
           }
        });
    }

    function submit(event){
        event.preventDefault();
        if (search.from !== "" && search.toFlight !== "" && search.depart !== "" && search.return !== "" ) {
            setRedirect(true);
        }
    }

    if (redirect) {
        return (
            // <Redirect to="/proviamoci" />
        // );

        <Redirect
                to={{
                    pathname: "/flights",
                    search: "?from=" + search.from + "&to=" + search.toFlight + "&depart=" + search.depart + "&return=" + search.return + "&country=" + props.modalValue.country + "&currency" + props.modalValue.currency,
                    state: {
                        from: search.from,
                        toFlight: search.toFlight,
                        depart: search.depart,
                        return: search.return,
                        country: props.modalValue.country,
                        currency: props.modalValue.currency
                    }
                }}
            />);
    } else {
        return (
            <div className={"section-search"}>
                <h1 className={"title-home"}>Let the dream begin!</h1>
                <Form className={"p-5 m-5 search"}>
                    <Row className="mb-3 p-3">

                        {/*FROM*/}
                        <FormGroup
                            class={"col-3"}
                            label={"From"}
                            type={"text"}
                            placeholder={"From"}
                            name={"from"}
                            handleChange={handleChange}
                        />

                        {/*TO*/}
                        <FormGroup
                            class={"col-3"}
                            label={"To"}
                            type={"text"}
                            placeholder={"To"}
                            name={"toFlight"}
                            handleChange={handleChange}
                        />

                        {/*DEPART*/}
                        <FormGroup
                            class={"col-2"}
                            label={"Depart"}
                            type={"date"}
                            name={"depart"}
                            handleChange={handleChange}
                        />

                        {/*RETURN*/}
                        <FormGroup
                            class={"col-2"}
                            label={"Return"}
                            type={"date"}
                            name={"return"}
                            handleChange={handleChange}
                        />

                        <div className={"col-2"}>
                            <label className={"mb-2"}>Travellers</label>
                            <Form.Select>
                                <option> 1 person</option>
                            </Form.Select>
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