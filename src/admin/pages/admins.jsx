import React, { useEffect, useState } from 'react';
import { useHttpClient } from '../../Common/custom-hooks/http-hook';
import UserList from '../components/user-list/user-list';
import ErrorModal from '../../Common/components/UIElements/model/error-model';
import LoadingSpinner from '../../Common/components/UIElements/loading-spinner/loading-spinner';

const Admins = () => {
    const { isLoading, error, sendRequest, errorPopupCloser } = useHttpClient();
    const [loadedUsers, setLoadedUsers] = useState();

    useEffect(() => {
        // we have use useEffect hook to stop the infinite loop. otherwise fetch will rerender to all the changes.
        const fetchUsers = async () => {
            // this method is only to use the async code. we can't use async directly on the useEffect hook. useEffect is not good for promisses.

            try {
                const responseData = await sendRequest(
                    'https://quiet-hollows-79620.herokuapp.com//api/admin/'
                );

                setLoadedUsers(responseData.admins); //this is the key of the response - view the backend code for more.
            } catch (err) {}
        };
        fetchUsers();
    }, [sendRequest]);

    return (
        <React.Fragment>
            <ErrorModal error={error} onClear={errorPopupCloser}></ErrorModal>
            <h1 className='admin-title'>Admins</h1>
            {isLoading && (
                <div className='center'>
                    <LoadingSpinner></LoadingSpinner>
                </div>
            )}
            {loadedUsers && !isLoading && <UserList items={loadedUsers} />}
        </React.Fragment>
    );
};

export default Admins;
