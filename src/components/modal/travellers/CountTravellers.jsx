function CountTravellers(props){
    return (
        <div className={"row p-2 pe-4"}>
            <div className={"col-8"}>
                <h5>{props.description}</h5>
            </div>
            <div className={"col-4"}>
                <div className={"row text-center"}>
                    <div className={"col-4"}>
                        <button onClick={props.remove} className={"btn btn-modal"} name={props.name}> - </button>
                    </div>
                    <div className={"col-4"}>
                        <h5 className={"text-primary ms-2"} >{props.traveller}</h5>
                    </div>
                    <div className={"col-4"}>
                        <button onClick={props.add} className={"btn btn-modal"} name={props.name}> + </button>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default CountTravellers;