import React, {useEffect, useState} from "react";
import Flight from "./components/flight/Flight";
import serverConnection from "./common/serverConnection";
import getSymbolFromCurrency from 'currency-symbol-map'


// SHOW THE LIST OF FLIGHT
function FlightList(props) {

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
                    //todo  "SEND IN PAGE {response.status} SORRY TRY AGAIN
                    // when the user press the button is redirect to homepage
                }
        })
            .catch( err => console.err());
    }, [props]);

    return (
        <div className={"bodyFlightsList"}>
            {flightsList.map((flight,index) => (
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
                    localTimeArrival={flight.local_arrival.slice(11,16)}
                    localTimeDeparture={flight.local_departure.slice(11,16)}
                    fullDuration={flight.duration}
                    price={flight.price}
                    curr={getSymbolFromCurrency(flightRequest.curr)}
                    stop={flight.route.length}
                    route={flight.route}
                    typeSearch={props.location.state.typeSearch}
                />
            ))}
        </div>
    );
}

export default FlightList;
