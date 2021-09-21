import React from "react";
import Button from "react-bootstrap/Button";
import MyVerticallyCenteredModal from "./MyVerticallyCenteredModal";
import {BACKEND_URL} from "../../config";

class Modal extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            modalShow: false,
            countryUpdate: "",
            country: "",
            countryName: "",
            currencyName: "Currency",
            isLoad: false,
            countriesList: [{
                Name: "",
                Code:"",
                value:""
            }],
            currenciesList: [{
                Name: "",
                Code:"",
                value:""
            }]
        };
        this.onChangeCountry = this.onChangeCountry.bind(this);
        this.onChangeCurrency = this.onChangeCurrency.bind(this);
    }

    onChangeCountry(value){
        this.setState({countryName: value});
    }

    onChangeCurrency(value){
        this.setState({currencyName: value});
    }

    componentDidMount() {
        fetch(process.env.REACT_APP_API_GEOLOCATION_URL)
        .then( response => response.json() )
        .then( data => {
            this.setState({
                country: data.country_code,
                countryName: data.country_name,
            })
        });

        fetch(BACKEND_URL + "/countriesList", {
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            }
        })
            .then(response => response.json())
            .then(data => {
                let countries_list = [];
                data.map(item => {
                    countries_list.push({
                        name: item.Name,
                        code: item.Code,
                        value: item.Name
                    });
                    return true;
                });
                this.setState({
                    countriesList: countries_list,
                });
            })
            .catch(err => console.log(err));

        fetch(BACKEND_URL + "/currenciesList", {
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            }
        })
            .then(response => response.json())
            .then(data => {
                let currencies_list = [];
                data.map(item => {
                    currencies_list.push({
                        name: item.Symbol,
                        code: item.Code,
                        value: item.Code + " - " + item.Symbol
                    });
                    return true;
                })
                this.setState({
                    currenciesList: currencies_list,
                    isLoad: true
                });
            })
            .catch(err => console.log(err));
    }

    render(){
        return (
            <div>
                {
                    !this.state.isLoad ?
                        <Button variant="outline-secondary" onClick={() => this.setState({modalShow: true})}>
                            country/currency{this.state.countryUpdate}
                        </Button>
                    :
                        <Button variant="outline-secondary" onClick={() => this.setState({modalShow: true})}>
                            {this.state.countryName} - {this.state.currencyName}
                        </Button>
                }
                {
                    this.state.isLoad &&
                        <MyVerticallyCenteredModal
                            show={this.state.modalShow}
                            country={this.state.countryName}
                            countriesList={this.state.countriesList}
                            currenciesList={this.state.currenciesList}
                            onChangeCountry={this.onChangeCountry}
                            onChangeCurrency={this.onChangeCurrency}
                            onHide={() => this.setState({modalShow: false})}
                        />
                }
            </div>
        );
    }
}

export default Modal;