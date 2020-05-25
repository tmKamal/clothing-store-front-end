import React, { useContext } from 'react';
import Button from '../../Common/components/form-elements/button';
import { useParams, useHistory } from 'react-router-dom';
import ErrorModal from '../../Common/components/UIElements/model/error-model';
import LoadingSpinner from '../../Common/components/UIElements/loading-spinner/loading-spinner';
import { useHttpClient } from '../../Common/custom-hooks/http-hook';
import { AuthContext } from '../../Common/context/auth-context';
const DeleteProduct = () => {
    const auth = useContext(AuthContext);
    const productId = useParams().pid;
    const history = useHistory();
    const { isLoading, error, sendRequest, errorPopupCloser } = useHttpClient();
    const confirmDeleteHandler = async () => {
        try {
            await sendRequest(
                `https://quiet-hollows-79620.herokuapp.com/api/product/${productId}`,
                'DELETE',
                null,
                {
                    Authorization: 'Bearer ' + auth.token
                }
            );
            history.push('/');
        } catch (err) {}
    };
    return (
        <React.Fragment>
            <ErrorModal error={error} onClear={errorPopupCloser}></ErrorModal>
            {isLoading && <LoadingSpinner asOverlay></LoadingSpinner>}
            <div style={{ textAlign: 'center' }} className='row'>
                <div className='col-md-12'>
                    <h2 danger>Are you sure?</h2>
                </div>
                <div className='col-md-6'>
                    <Button onClick={confirmDeleteHandler} danger>
                        Delete
                    </Button>
                </div>
                <div className='col-md-6'>
                    <Button to={`/all-products`} danger>
                        Cancel
                    </Button>
                </div>
            </div>
        </React.Fragment>
    );
};
export default DeleteProduct;
