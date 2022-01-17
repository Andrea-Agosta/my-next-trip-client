import React, {useEffect, useState} from "react";
import Flight from "./components/flight/Flight";
import serverConnection from "./common/serverConnection";
import getSymbolFromCurrency from 'currency-symbol-map'
import loadingGif from './images/loader.gif'


// SHOW THE LIST OF FLIGHT
function FlightList(props) {
    const [error, setError] = useState(false)
    const [flightRequest, setFlightRequest] = useState({
        fly_from: "",
        fly_to: "",
        date_from: "",
        date_to: "",
        return_from: "",
        return_to: "",
        curr: ""
    });
    const [flightsList, setFlightsList] = useState([]);
    const [showTenResults, setShowTenResults] = useState(true);

    useEffect( () => {
        const search = {
            fly_from: props.location.state.fly_from,
            fly_to: props.location.state.fly_to,
            date_from: props.location.state.date_from,
            date_to: props.location.state.date_from,
            return_from: "",
            return_to: "",
            curr: props.location.state.curr
        };

        if(props.location.state.typeSearch === "return") {
            search.return_from = props.location.state.date_to;
            search.return_to = props.location.state.date_to;
        }

        setFlightRequest(search);

         serverConnection("GET", "/flights/search", search)
            .then(response => {
                console.log(response);
                if (response.status === 200){
                    const tempFlightList = [];
                    response.data.map(singleFlight => (
                        tempFlightList.push(singleFlight)
                ));
                    setFlightsList(tempFlightList);
                } else {
                    setError(true);
                }
        })
            .catch( err => console.err());
    }, [props]);

    return (
        <div className={"bodyFlightsList"}>
            {
                (flightsList.length === 0) ?
                    <div className={"bg-white text-center mt-5"}>
                        <img src={loadingGif} alt={"loading gif"} className={"mt-5"}/>
                    </div>
                        :
                    <div>
                        {
                            (!error) ?
                                (showTenResults) ?
                                    flightsList.slice(0, 10).map((flight, index) => (
                                        <Flight
                                            key={index}
                                            logo={flight.airlines}
                                            availableSeats={flight.availability.seats}
                                            bookingToken={flight.booking_token}
                                            linkKiwi={flight.deep_link}
                                            outbound={flight.routes[0]}
                                            return={flight.routes[1]}
                                            changeAirport={flight.has_airport_change}
                                            cityTo={flight.cityTo}
                                            localTimeArrival={flight.local_arrival.slice(11, 16)}
                                            localTimeDeparture={flight.local_departure.slice(11, 16)}
                                            fullDuration={flight.duration}
                                            price={flight.price}
                                            curr={getSymbolFromCurrency(flightRequest.curr)}
                                            stop={flight.route.length}
                                            route={flight.route}
                                            typeSearch={props.location.state.typeSearch}
                                        />
                                    ))
                                :
                                    flightsList.map((flight, index) => (
                                        <Flight
                                            key={index}
                                            logo={flight.airlines}
                                            availableSeats={flight.availability.seats}
                                            bookingToken={flight.booking_token}
                                            linkKiwi={flight.deep_link}
                                            outbound={flight.routes[0]}
                                            return={flight.routes[1]}
                                            changeAirport={flight.has_airport_change}
                                            cityTo={flight.cityTo}
                                            localTimeArrival={flight.local_arrival.slice(11, 16)}
                                            localTimeDeparture={flight.local_departure.slice(11, 16)}
                                            fullDuration={flight.duration}
                                            price={flight.price}
                                            curr={getSymbolFromCurrency(flightRequest.curr)}
                                            stop={flight.route.length}
                                            route={flight.route}
                                            typeSearch={props.location.state.typeSearch}
                                        />
                                    ))
                                :
                                <div className={"text-center my-5 bg-white"}>
                                    <h1 className={"alert alert-dark mt-5"}> 404 Error </h1>
                                    <a className={"btn btn-primary mt-5"} href={"/"}> Back to home </a>
                                </div>
                        }
                        <div className={"row mb-3 text-center"}>
                            <div className={"col"}>
                                <button className={"btn btn-primary fs-5 fw-bold px-4"}
                                        onClick={() => setShowTenResults(false)}
                                >
                                    Show more flight
                                </button>
                            </div>
                        </div>
                </div>
            }
        </div>
    );
}

export default FlightList;
