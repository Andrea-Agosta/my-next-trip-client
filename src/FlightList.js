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
    const [flights, setFlights] = useState([]);

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
        console.log(url);
        fetch(url)
            .then(response => response.json())
            .then(data => {
                setFlights(data);
                console.log(data);
                flights.Quotes[0].OutboundLeg.CarrierIds.map(code => {
                    if (code === flights.Carriers.CarrierId) {

                    }
                });


            })
            .catch(err => console.log(err));

    }, []);

    return (
        <div className={"bodyFlightsList"}>
            <Flight
                departureTime={flights}
                arrivalTime={flights}
                durationTime={flights}
                stop={flights.Quotes[0].Direct}
                companyName={flights}
                departurePlaceCode={flights}
                departurePlaceName={flights}
                arrivalPlaceCode={flights}
                arrivalPlaceName={flights}
                price={flights.Quotes[0].MinPrice}
                currency={flights.Currencies[0].Code}
            />
            {/*<p> {flightRequest.from + " " + flightRequest.toFlight + " " + flightRequest.depart + " " + flightRequest.return + " " + flightRequest.country + " " + flightRequest.currency} </p>*/}
            {/*<h5>{flightRequest.from}</h5>*/}
            {/*<h5>{flightRequest.toFlight}</h5>*/}
            {/*<h5>{flightRequest.depart}</h5>*/}
            {/*<h5>{flightRequest.return}</h5>*/}
            {/*<h5>{flightRequest.country}</h5>*/}
            {/*<h5>{flightRequest.currency}</h5>*/}
            {/*<p>{flights}</p>*/}
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
