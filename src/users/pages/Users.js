import React from "react";

import UsersList from "../components/UsersList";

const Users = () => {

    const items = [{id: "u1", name: "kavishka", places:6, image:"https://images.unsplash.com/photo-1503023345310-bd7c1de61c7d?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MXx8aHVtYW58ZW58MHx8MHx8&w=1000&q=80"}];

    return (
        <UsersList items={items} />
    );
};

export default Users;