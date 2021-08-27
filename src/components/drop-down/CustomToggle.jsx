import React from "react";

const CustomToggle = React.forwardRef(({ children, onClick }, ref) => (
    <a
        href="/"
        ref={ref}
        onClick={(e) => {
            e.preventDefault();
            onClick(e);
        }}
        className={"btn btn-outline-secondary d-grid text-start"}
    >
        <div className={"row"}>
            <div className={"col-10"}>{children}</div>
            <div className={"col-2"}>&#x25bc;</div>
        </div>
    </a>
));

export default CustomToggle;