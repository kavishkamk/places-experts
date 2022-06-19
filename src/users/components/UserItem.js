import React from "react";
import { Link } from "react-router-dom";

import Avatar from "../../shared/components/UIElements/Avatar";
import Card from "../../shared/components/UIElements/Card";

const UserItem = props => {
    return (
        <li className="group m-4 w-cardw min-w-70">
            <Card className="p-0">
                <Link to={`/${props.id}/places`} className="flex items-center w-full h-full no-underline p-4 text-white bg-darkblack hover:bg-goldcolor active:bg-goldcolor">
                    <div className="w-16 h-16 mr-4">
                        <Avatar image={props.image} alt={props.name} />
                    </div>
                    <div className="">
                        <h2 className="text-base m-0 mb-2 font-normal text-goldcolor group-hover:text-darkblack group-active:text-darkblack">{props.name}</h2>
                        <h3 className="group-hover:text-darkblack group-active:text-darkblack m-0">{props.placeCount} {props.placeCount === 1 ? "place" : "places"}</h3>
                    </div>
                </Link>
            </Card>
        </li>
    );
};

export default UserItem;