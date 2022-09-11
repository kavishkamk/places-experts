import React, { useEffect, useState } from "react";

import UsersList from "../components/UsersList";
import ErrorModal from "../../shared/components/UIElements/ErrorModal";
import LoadingSpinner from "../../shared/components/UIElements/LoadingSpinner";
import { useHttpClient } from "../../shared/hooks/http-hook";

const Users = () => {

    const [loadedUsers, setLoadedUsers] = useState();
    const { sendRequest, error, isLoading, clearError } = useHttpClient();

    useEffect(() => {
        const fetchUsers = async () => {
            
            try {
                const response = await sendRequest("users");
                setLoadedUsers(response.users);
            } catch (error) {
            }
           
        };
        fetchUsers();
    }, [sendRequest]);

    return (
        <React.Fragment>
            <ErrorModal error={error} onClear={clearError}/>
            {isLoading && <div className="center"><LoadingSpinner asOverlay /></div>}
            {!isLoading && loadedUsers && <UsersList items={loadedUsers} />}
        </React.Fragment>
    );
};

export default Users;