import React from "react";

import "./MainHeader.css";

const MainHeader = props => {
    return (
        <header className="md:justify-between">
            {props.children}
        </header>
    );
};

export default MainHeader;