import React from "react";

import UserItem from "./UserItem";
import Card from "../../shared/components/UIElements/Card";
import "./UserList.css";

const UsersList = props => {
    if (props.items.length === 0) {
        return (
            <div className="center">
                <Card>
                    <h1>No user found.</h1>
                </Card>
            </div>
        );
    }

    return (
        <ul className="users-list">
            {props.items.map(item => {
                return <UserItem 
                    key={item.id} 
                    id={item.id} 
                    image={item.image} 
                    name={item.name} 
                    placeCount={item.places} />;
            })}
        </ul>
    );
}

export default UsersList;