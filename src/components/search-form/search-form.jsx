import {Button, Form, Row} from "react-bootstrap";
import FormGroup from "./form-group";
import {BACKEND_URL} from "../../config";
import React from "react";


class SearchForm extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            placesList: [{
                placeName: "",
                cityId: ""
            }]
        }
    }

    componentDidMount() {
        fetch(BACKEND_URL + "/placesList", {
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            }
        })
        .then(response => response.json())
        .then(data => {
            let places_list = [];
            let autocomplete = [];
            data.map(item => {
                places_list.push({
                    placeName: item.PlaceName,
                    cityId: item.CityId
                });
                autocomplete.push(item.PlaceName);
                return true;
            });
            console.log(autocomplete);
            this.setState({
                placesList: places_list,
            });
        })
        .catch(err => console.log(err));
    }

    render() {
        return (
            <div className={"section-search"}>
                <h1 className={"title-home"}>Let the dream begin!</h1>
                <Form className={"p-5 m-5 search"}>
                    <Row className="mb-3 p-3">

                        {/*FROM*/}
                        <FormGroup
                            class={"col-3"}
                            controlId={""}
                            label={"From"}
                            type={"text"}
                            placeholder={"From"}
                        />

                        {/*TO*/}
                        <FormGroup
                            class={"col-3"}
                            controlId={""}
                            label={"To"}
                            type={"text"}
                            placeholder={"To"}
                        />

                        {/*DEPART*/}
                        <FormGroup
                            class={"col-2"}
                            controlId={""}
                            label={"Depart"}
                            type={"date"}
                        />

                        {/*RETURN*/}
                        <FormGroup
                            class={"col-2"}
                            controlId={""}
                            label={"Return"}
                            type={"date"}
                        />

                        <div className={"col-2"}>
                            <label className={"mb-2"}>Travellers</label>
                            <Form.Select>
                                <option> 1 person</option>
                            </Form.Select>
                        </div>

                    </Row>
                    <Button className={"fw-bold ps-5 pe-5 d-flex ms-auto me-3 mt-5"} variant="primary" type="submit">Submit</Button>
                </Form>
            </div>
        );
    }
}

export default SearchForm;