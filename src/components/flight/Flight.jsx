import {ArrowRightShort} from "react-bootstrap-icons";
import SingleFlight from "./SingleFlight";


function Flight(props){
    return (
        <div>
            <div className="container p-5">
                <div className="row">
                    <div className="col-7 containerFlight p-5 me-2 shadow borderRoundLeft">
                        <SingleFlight />
                        <SingleFlight />
                    </div>

                    {/*PRICE SECTION*/}
                    <div className="col-4 containerFlight pt-4 borderRoundRight shadow">
                        <div className="row text-center">
                            <div className="col-12 fw-bold fs-3 mb-2">£ 375</div>
                            <div className="col-12">
                                <a href="#" className={"btn btn-primary fs-5 fw-bold"}> Select <ArrowRightShort size={30} /> </a>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Flight;