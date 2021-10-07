import React, {useEffect, useRef, useState} from "react";
import Button from "react-bootstrap/Button";
import MyVerticallyCenteredModal from "./MyVerticallyCenteredModal";
import {BACKEND_URL} from "../../config";
import { Globe2, CurrencyExchange } from 'react-bootstrap-icons';


function Modal(props){
    const [modalShow, setModalShow] = React.useState(false);
    const [country, setCountry] = useState({ name:"", code:"", value:"Select Country"});
    const [currency, setCurrency] = useState({name: "£", code: "GBP", value: "GBP - £"});
    const [countriesList, setCountriesList] = useState([]);
    const [currenciesList, setCurrenciesList] = useState([]);
    const [isLoad, setIsLoad] = useState(false);
    const mounted = useRef();
    const [isChange, setIsChange] = useState(false);
    const [firstTimeChange, setFirstTimeChange] = useState(false);

    useEffect(() => {
        if (!mounted.current) {
            // CALL SERVICE API FOR SET COUNTRY WITH IP
            fetch(process.env.REACT_APP_API_GEOLOCATION_URL)
                .then( response => response.json() )
                .then( data => {
                    setCountry({
                        name: data.country_name,
                        code: data.country_code,
                        value: data.country_name
                    });
                });

            // TAKE COUNTRIES LIST FROM DB
            fetch(BACKEND_URL + "/countriesList", {
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                }
            })
                .then(response => response.json())
                .then(data => {
                    const newCountry = data.map(item => ({
                        name: item.Name,
                        code: item.Code,
                        value: item.Name
                    }));
                    setCountriesList(newCountry);
                })
                .catch(err => console.log(err));

            // TAKE CURRENCIES LIST FROM DB
            fetch(BACKEND_URL + "/currenciesList", {
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                }
            })
                .then(response => response.json())
                .then(data => {
                    const newCurrency = data.map(item => ({
                        name: item.Symbol,
                        code: item.Code,
                        value: item.Code + " - " + item.Symbol
                    }));
                    setCurrenciesList(newCurrency);
                    setIsLoad(true);
                })
                .catch(err => console.log(err));

            mounted.current = true;
        } else {
            if (country.name !== "" && !firstTimeChange) {
                setIsChange(true);
                setFirstTimeChange(true);
            }
            if (isChange){
                countryIpUpdated();
            }
        }
    });

    function onChangeCountry(event){
        const targetValue = event.target.value;
        const value = countriesList.find(value => value.value === targetValue);
        setCountry(value);
    }

    function onChangeCurrency(event){
        const targetValue = event.target.value;
        const value = currenciesList.find(value => value.value === targetValue);
        setCurrency(value);
        props.handleChangeSelect(country, currency);
    }

    function countryIpUpdated(){
        props.handleChangeSelect(country, currency);
        setIsChange(false);
    }

    return (
        <div>
            {
                !isLoad ?
                    <Button variant="outline-secondary" onClick={() => setModalShow(true)} >
                        country/currency
                    </Button>
                    :
                    <Button variant="outline-secondary" onClick={() => setModalShow(true)} >
                        <Globe2 className={"d-inline mb-1 me-1"}/>
                        {country.value} -
                        <CurrencyExchange className={"d-inline me-1 ms-1"}/>
                        {currency.value}
                    </Button>
            }
            {
                isLoad &&
                <MyVerticallyCenteredModal
                    show={modalShow}
                    onHide={() => setModalShow(false)}
                    country={country.value}
                    currency={currency.code}
                    countriesList={countriesList}
                    currenciesList={currenciesList}
                    onChangeCountry={onChangeCountry}
                    onChangeCurrency={onChangeCurrency}
                />
            }
        </div>
    );
}

export default Modal;