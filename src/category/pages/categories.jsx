import React, { useEffect, useState } from 'react';
import { useHttpClient } from '../../Common/custom-hooks/http-hook';

import CategoryList from '../components/category-list/category-list';
import ErrorModal from '../../Common/components/UIElements/model/error-model';
import LoadingSpinner from '../../Common/components/UIElements/loading-spinner/loading-spinner';

const Categories = () => {
    const { isLoading, error, sendRequest, errorPopupCloser } = useHttpClient();
    const [loadedCategories, setLoadedCategories] = useState();

    useEffect(() => {
        // we have use useEffect hook to stop the infinite loop. otherwise fetch will rerender to all the changes.
        const fetchCategories = async () => {
            // this method is only to use the async code. we can't use async directly on the useEffect hook. useEffect is not good for promisses.

            try {
                const responseData = await sendRequest(
                    'https://quiet-hollows-79620.herokuapp.com/api/categories/'
                );

                setLoadedCategories(responseData.categories); //this is the key of the JSON response - view the backend code for more.
            } catch (err) {}
        };
        fetchCategories();
    }, [sendRequest]);

    return (
        <React.Fragment>
            <ErrorModal error={error} onClear={errorPopupCloser}></ErrorModal>
            {isLoading && (
                <div className='center'>
                    <LoadingSpinner></LoadingSpinner>
                </div>
            )}
            {loadedCategories && !isLoading && (
                <CategoryList items={loadedCategories} />
            )}
        </React.Fragment>
    );
};

export default Categories;
