import {ArrowRightShort} from "react-bootstrap-icons";
import SingleFlight from "./SingleFlight";


// SHOW ONE FLIGHT TICKET COMPONENT
function Flight(props){

    let outboundRoutes = [];
    let returnRoutes = [];
    let setOutbound = true;
    let airportOutboundList = "";
    let airportReturnList = "";
    let departureLogo = [];
    let returnLogo = [];
    let returnFlightTime = "";

    if(props.typeSearch === "oneway") {
        if (props.route.length > 1){

            // CHEK IF THE AIRLINE COMPANY IS MORE THEN ONE
            if (props.logo.length > 1){

                props.route.forEach( airport => {

                    // SAVE STOPS IN ARRAY
                    outboundRoutes.push(airport.flyTo);

                    let airline = airport.airline;
                    if (airline === "RK"){
                        airline = "FR";
                    }

                    //CHECK IF THE AIRLINE COMPANY EXIST IN ARRAY AND IS NOT PUSH THE DATA
                    if (!departureLogo.includes(airline)){
                        departureLogo.push(airline);
                    }
                });
            } else {

                // SAVE STOPS IN ARRAY
                props.route.map( airport => (
                    outboundRoutes.push(airport.flyTo)
                ));
            }

            // SAVE ALL STOP IN A STRING
            for(let i=0; i < (outboundRoutes.length - 1);i++){
                airportOutboundList += outboundRoutes[i] + " ";
            }
        }
    } else {
        props.route.forEach( airport => {
            let airline = airport.airline;
            if (airline === "RK"){
                airline = "FR";
            }

            // CHECK AND SAVE STOPS IN OUTBOUND ARRAY
            if (airport.cityTo !== props.cityTo && setOutbound) {

                if (props.logo.length > 1 && departureLogo.includes(airline) === false) {
                    departureLogo.push(airline);
                }
                outboundRoutes.push(airport.flyTo);
            }

            // SWITCH IN RETURN ARRAY
            if (airport.cityTo === props.cityTo) {
                setOutbound = false;
            }

            if (airport.cityFrom === props.cityTo){
                returnFlightTime = airport.local_departure.slice(11,16);
            }

            // CHECK AND SAVE STOPS IN RETURN ARRAY
            if (airport.cityTo !== props.cityTo && !setOutbound) {
                if(props.logo.length > 1 && returnLogo.includes(airline) === false){
                    returnLogo.push(airline);
                }
                returnRoutes.push(airport.flyTo);
            }
        });

        // SAVE A STRING OF OUTBOUND STOP LIST
        for(let i=0; i < (outboundRoutes.length);i++){
            airportOutboundList += outboundRoutes[i] + " ";
        }

        // SAVE A STRING OF RETURN STOP LIST
        for(let i=0; i < (returnRoutes.length - 1);i++){
            airportReturnList += returnRoutes[i] + " ";
        }
    }

    return (
        <div>
            <div className="container p-5">
                <div className="row">
                    <div className="col-7 containerFlight p-5 me-2 shadow borderRoundLeft">
                        <SingleFlight
                            cityCodeFrom={props.cityCodeFrom}
                            cityCodeTo={props.cityCodeTo}
                            airline={props.logo}
                            logo={departureLogo}
                            departure={props.outbound[0]}
                            arrival={props.outbound[1]}
                            changeAirport={props.changeAirport}
                            localTimeArrival={props.localTimeArrival}
                            localTimeDeparture={props.localTimeDeparture}
                            fullDuration={props.fullDuration.departure}
                            airportStops={airportOutboundList}
                            stop={outboundRoutes.length}
                        />
                        {(props.typeSearch === "return") &&
                            <SingleFlight
                                cityCodeFrom={returnRoutes[0]}
                                cityCodeTo={returnRoutes[returnRoutes.length-1]}
                                airline={props.logo}
                                logo={returnLogo}
                                departure={props.return[0]}
                                arrival={props.return[1]}
                                changeAirport={props.changeAirport}
                                localTimeArrival={props.route[props.route.length - 1 ].local_arrival.slice(11,16)}
                                localTimeDeparture={returnFlightTime}
                                fullDuration={props.fullDuration.return}
                                airportStops={airportReturnList}
                                stop={(returnRoutes.length - 1)}
                            />
                        }
                    </div>

                    {/*PRICE SECTION*/}
                    <div className="col-4 containerFlight pt-4 borderRoundRight shadow">
                        <div className="row text-center">
                            <div className="col-12 fw-bold fs-3 mb-2">{props.curr} {props.price}</div>
                            <div className="col-12">
                                <a href="#" className={"btn btn-success fs-5 fw-bold w-50"}> Save </a>
                            </div>
                            <div className="col-12 mt-3">
                                <a href={props.linkKiwi} className={"btn btn-primary fs-5 fw-bold w-50"}> Buy <ArrowRightShort size={30} /> </a>
                            </div>
                            <p>Available Seats {props.availableSeats}</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Flight;