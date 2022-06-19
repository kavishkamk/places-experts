import React, {useState} from "react";
import { Link } from "react-router-dom";

import MainHeader from "./MainHeader";
import NavBtnSpan from "./NavBtnSpan";
import NavLinks from "./NavLinks";
import SideDrawer from "./SideDrawer";
import Backdrop from "../UIElements/Backdrop";

import "./MainNavigation.css";

const MainNavigation = () => {

    const [drawerIsOpen, setDrawerIsOpen] = useState(false);

    const changeDrawerIsOpen = () => {
        setDrawerIsOpen(true);
    };

    const closeDrawer = () => {
        setDrawerIsOpen(false);
    };

    return (
        <React.Fragment>
            {drawerIsOpen && (<Backdrop onClick={closeDrawer} />) }
            <SideDrawer show={drawerIsOpen} onClick={closeDrawer}>
                <nav className="drawer-nav">
                    <NavLinks />
                </nav>
            </SideDrawer>
            
            <MainHeader>
                <button onClick={changeDrawerIsOpen}>
                    <NavBtnSpan />
                    <NavBtnSpan />
                    <NavBtnSpan />
                </button>
                <h1>
                    <Link to="/" className="div-a">Your Places</Link>
                </h1>
                <nav className="main-nav-header">
                    <NavLinks />
                </nav>
            </MainHeader>
        </React.Fragment>
    );
};

export default MainNavigation;