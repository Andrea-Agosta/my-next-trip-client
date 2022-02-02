import React, {useEffect, useRef, useState} from "react";
import Button from "react-bootstrap/Button";
import ModalWindow from "./Modal-window";
import {REACT_APP_API_GEOLOCATION_URL} from "../../../config";
import { CurrencyExchange } from 'react-bootstrap-icons';
import countryToCurrency from 'country-to-currency';
import serverConnection from "../../../common/serverConnection";
import currenciesList from "../../../currenciesList.json"
import {getEmojiFlag} from "countries-list";


function CountryCurrencyModal(props){
    const [modalShow, setModalShow] = React.useState(false);
    const [country, setCountry] = useState({code:"", value:"Select Country"});
    const [currency, setCurrency] = useState({code: "", value: ""});
    const [countriesList, setCountriesList] = useState([]);
    const mounted = useRef();

    useEffect(() => {
        if (!mounted.current) {
            // CALL SERVICE API FOR SET COUNTRY WITH IP
            fetch(REACT_APP_API_GEOLOCATION_URL)
                .then( response => response.json() )
                .then( data => {
                    const tempCountry = {
                        code: data.country_code,
                        value: getEmojiFlag(data.country_code) + ' ' + data.country_name
                    }

                    // SET LOCAL CURRENCY WITH IP
                    const tempCurr = {
                        code: countryToCurrency[ data.country_code ],
                        value: countryToCurrency[ data.country_code ]
                    }

                    setCountry(tempCountry);
                    setCurrency(tempCurr);

                    // SEND DATA BACK TO PROPS IN APP THEN SEND TO PROPS IN FLIGHTLIST
                    sendBack(tempCountry, tempCurr);
                });

            // TAKE COUNTRIES LIST FROM DB
            serverConnection('GET', '/countries',{})
                .then(async response => {
                    const newCountry = await response.data.map(country => ({
                        code: country.code,
                        value: getEmojiFlag(country.code)+ ' ' + country.name
                    }));
                    await setCountriesList(newCountry);
                })
                .catch(err => console.log(err));

            mounted.current = true;
        }
    });

    // SET THE SELECT COUNTRY
    function changeCountry(event){
        const targetValue = event.target.value;
        const value = countriesList.find(value => value.value === targetValue);
        sendBack(value, currency);
        setCountry(value);
    }

    // SET THE SELECT CURRENCY
    function changeCurrency(event){
        const targetValue = event.target.value;
        const value = currenciesList.find(value => value.value === targetValue);
        sendBack(country, value);
        setCurrency(value);
    }

    function sendBack(pCountry, pCurrency){
        props.handleChangeSelect(pCountry, pCurrency);
    }

    return (
        <div>
            <Button variant="outline-secondary modalBtnMobile"
                    onClick={() => setModalShow(true)}
                    data-testid="custom-element"
            >
                {country.value} -
                <CurrencyExchange className={"d-inline me-1 ms-1"}/>
                {currency.value}
            </Button>
            <ModalWindow
                show={modalShow}
                onHide={() => setModalShow(false)}
                country={country.value}
                currency={currency.code}
                countries_list={countriesList}
                currencies_list={currenciesList}
                change_country={changeCountry}
                change_currency={changeCurrency}
            />
        </div>
    )
}

export default CountryCurrencyModal;