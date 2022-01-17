import plane from "../../images/plane.svg";


// SHOW ONE FLIGHT ROUTE
function SingleFlight(props){

    // SET NUMBER OF RED DOT (stop) IN FLIGHT LINE GRAPH
    function stopSpan(nStop){
        let stop = [];
        for (let i = 1; i <= nStop; i++) {
            stop.push(<span className={"noStop stopFlight"}/>);
        }
        return stop;
    }

    // INSERT LOGOS IMG
    function logoList(logo){
        let imgList = [];
        for (let i = 0; i < logo.length; i++) {
            imgList.push(
                <img
                    src={"https://images.kiwi.com/airlines/32x32/"+ logo[i] +".png"}
                    key={i} alt="logo"
                    className={"me-2"}
                />
            )
        }
        return imgList;
    }

    return(
        <div className="row text-center mt-4">
            <div className="col-3 mt-3 fw-bold fs-5">
                <div className={"logoAirline"}>
                    {
                        (props.airline !== undefined &&
                            props.airline.length !== undefined &&
                            props.airline.length > 1
                        ) ? logoList(props.logo) :
                            <img
                                src={"https://images.kiwi.com/airlines/32x32/" + props.airline + ".png"}
                                className={"me-2"}
                                alt="logo"
                            />
                    }
                </div>
            </div>
            <div className="col-3">
                <div className="row text-end me-1">
                    <div className="col-12 fs-4">{props.localTimeDeparture}</div>
                    <div className="col-12 fs-6">{props.departure}</div>
                </div>
            </div>
            <div className="col-3">
                <div className="row">
                    <div className="col-12 mb-1 smlText">
                        {Math.floor(props.fullDuration / 3600)} h &nbsp;
                        {Math.floor(props.fullDuration % 3600/60)} min
                    </div>
                    <div className="col-12 journeyLine">
                        {(props.stop > 0) && stopSpan(props.stop)}
                        <img className={"planeLogo"} src={plane} alt="plane icon"/>
                    </div>
                    <div className="col-12 smlText"> {props.airportStops} </div>
                    <div className="col-12 smlText">{props.stop < 1 ? "Direct" : (props.stop) + " stop"}</div>
                    <div className={"alert-danger"}>{ props.changeAirport && "change airport" }</div>
                </div>
            </div>
            <div className="col-3">
                <div className="row text-start ms-1">
                    <div className="col12 fs-4">{props.localTimeArrival}</div>
                    <div className="col12 fs-6">{props.arrival}</div>
                </div>
            </div>
        </div>
    );
}

export default SingleFlight;