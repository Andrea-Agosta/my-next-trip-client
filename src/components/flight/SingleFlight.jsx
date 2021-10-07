import plane from "../../images/plane.svg";

function SingleFlight(props){
    return(
        <div className="row text-center mt-5">
            <div className="col-5 mt-3 fw-bold fs-5">Lufthansa</div>
            <div className="col-2">
                <div className="row text-end me-1">
                    <div className="col-12 fs-4">08:45</div>
                    <div className="col-12 fs-6">MAN</div>
                </div>
            </div>
            <div className="col-3">
                <div className="row">
                    <div className="col-12 mb-1 smlText">22h 55min</div>
                    <div className="col-12 journeyLine">
                        <span className={"stop"} />
                        <img className={"planeLogo"} src={plane} alt="plane icon"/>
                    </div>
                    <div className="col-12 smlText">1scalo ZRH</div>
                </div>
            </div>
            <div className="col-2">
                <div className="row text-start ms-1">
                    <div className="col12 fs-4">22:30</div>
                    <div className="col12 fs-6">FLR</div>
                </div>
            </div>
        </div>
    );
}

export default SingleFlight;