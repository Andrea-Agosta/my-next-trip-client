import {useState} from "react";


function CountPassenger(props){
    const [count, setCount] = useState(0);
    function increase(){
        setCount(count + 1);
    }
    function decrease(){
        setCount( count - 1);
    }
    return (
        <div className={"container"}>
            <h4>{props.description}</h4>
            <button onClick={decrease}> - </button>
            <h4>{count}</h4>
            <button onClick={increase}> + </button>
        </div>
    );
}

export default CountPassenger;