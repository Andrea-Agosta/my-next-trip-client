import React, {useEffect, useState} from "react";
import {BACKEND_URL} from "./config";
import Flight from "./components/flight/Flight";


function FlightList(props) {
    const [flightRequest, setFlightRequest] = useState({
        from: "",
        toFlight: "",
        depart: "",
        return: "",
        country: "",
        currency: ""
    });
    // const [flights, setFlights] = useState([]);
    const [flights, setFlights] = useState({
        departureTime: "",
        arrivalTime: "",
        durationTime: "",
        stop: false,
        companyName: "",
        departurePlaceCode: "",
        departurePlaceName: "",
        arrivalPlaceCode: "",
        arrivalPlaceName: "",
        price: "",
        currency: ""
    });

    useEffect(() => {
        setFlightRequest({
            from: props.location.state.from,
            toFlight: props.location.state.toFlight,
            depart: props.location.state.depart,
            return: props.location.state.return,
            country: props.location.state.country,
            currency: props.location.state.currency
        });

        const url = BACKEND_URL + "/flights?from=" + props.location.state.from +"&to=" + props.location.state.toFlight + "&depart=" + props.location.state.depart + "&return=" + props.location.state.return + "&country=" + props.location.state.country + "&currency=" + props.location.state.currency;
        fetch(url)
            .then(response => response.json())
            .then(data => {
                const backendData = data;
                const depTimeFull = backendData.Quotes[0].OutboundLeg.DepartureDate;
                const depTime = depTimeFull.split('T')[1];
                backendData.Quotes[0].OutboundLeg.CarrierIds.map((code, i) => {
                    if (code === backendData.Carriers[i].CarrierId) {
                        setFlights( prevValue => {
                            return {
                                departureTime: depTime,
                                arrivalTime: prevValue.arrivalTime,
                                durationTime: prevValue.durationTime,
                                stop: backendData.Quotes[0].Direct,
                                companyName: backendData.Carriers[i].Name,
                                departurePlaceCode: prevValue.departurePlaceCode,
                                departurePlaceName: prevValue.departurePlaceName,
                                arrivalPlaceCode: prevValue.arrivalPlaceCode,
                                arrivalPlaceName: prevValue.arrivalPlaceName,
                                price: backendData.Quotes[0].MinPrice,
                                currency: backendData.Currencies[0].Symbol
                            }
                        });
                    }
                });

                console.log(backendData);


            })
            .catch(err => console.log(err));

    }, []);

        function log(){
            console.log(flights);
        }

    return (
        <div className={"bodyFlightsList"}>
            route.p
            <Flight
                departureTime={flights}
                arrivalTime={flights}
                durationTime={flights}
                // stop={flights.Quotes[0].Direct}
                companyName={flights}
                departurePlaceCode={flights}
                departurePlaceName={flights}
                arrivalPlaceCode={flights}
                arrivalPlaceName={flights}
                // price={flights.Quotes[0].MinPrice}
                // currency={flights.Currencies[0].Code}
            />

            <div className="btn btn-primary" onClick={log}> button</div>
        </div>
    );

}








//
// class FlightList extends React.Component {
//     constructor(props) {
//         super(props);
//         this.state = {
//             from: "",
//             toFlight:"",
//             depart: "",
//             return:"",
//             flight: ""
//         }
//     }
//
//     componentDidMount() {
//         this.setState({from:this.props.location.state.from});
//         this.setState({toFlight:this.props.location.state.toFlight});
//         this.setState({depart:this.props.location.state.depart});
//         this.setState({return:this.props.location.state.return});
//         const url = BACKEND_URL + "/search?from=" + this.props.location.state.from +"&to=" + this.props.location.state.toFlight + "&depart=" + this.props.location.state.depart + "&return=" + this.props.location.state.return;
//
//         fetch(url)
//             .then(response => response.json())
//             .then(data => {
//                 this.setState({flight: data});
//             })
//             .catch(error => {
//                 this.setState({errorMessage: error.toString()});
//                 console.error('There was an error!', error);
//             });
//
//     }
//
//     render() {
//         return (
//             <div>
//                 <p> {this.state.from + " " + this.state.toFlight + " " + this.state.depart + " " + this.state.return} </p>
//                 <h5>{this.state.flight.from}</h5>
//                 <h5>{this.state.flight.to}</h5>
//                 <h5>{this.state.flight.depart}</h5>
//                 <h5>{this.state.flight.return}</h5>
//             </div>
//         )
//     };
// }

export default FlightList;
