import React, { useContext } from 'react';
import { useHistory } from 'react-router-dom'; // to redirect the user to new location
import Input from '../../Common/components/form-elements/input/input';
import { VALIDATOR_REQUIRE } from '../../Common/util/validators/validators';
import Button from '../../Common/components/form-elements/button';
import { useForm } from '../../Common/custom-hooks/form-hook';
import { useHttpClient } from '../../Common/custom-hooks/http-hook';

import ErrorModal from '../../Common/components/UIElements/model/error-model';
import LoadingSpinner from '../../Common/components/UIElements/loading-spinner/loading-spinner';
import { AuthContext } from '../../Common/context/auth-context';

const NewManager = () => {
    const auth = useContext(AuthContext);
    const history = useHistory(); // to redirect the user to new location.

    const { isLoading, error, sendRequest, errorPopupCloser } = useHttpClient();

    const [formState, inputHandler] = useForm(
        /* Object destructuring - according to (custom)form-hook -> useForm function, it return the formState and inputHandle. so using destructuring we can catch their values easily.  */
        {
            name: {
                value: '',
                isValid: false
            },
            email: {
                value: '',
                isValid: false
            },
            password: {
                value: '',
                isValid: false
            }
        },
        false
    );

    const managerSubmitHandler = async (event) => {
        event.preventDefault();
        console.log(formState.inputs);
        /* 
    In here, we have to pass a image too, but images has a binary data type
    so we can't pass binary data using JSON.
    therefore, we have to use FormData, which is a browser API.
    */
        try {
            await sendRequest(
                'https://quiet-hollows-79620.herokuapp.com/api/manager/signup',
                'POST',
                JSON.stringify({
                    name: formState.inputs.name.value,
                    email: formState.inputs.email.value,
                    password: formState.inputs.password.value
                }),
                {
                    'Content-Type': 'application/json',
                    Authorization: 'Bearer ' + auth.token
                }
            );
            console.log(formState.inputs);
            history.push('/');
        } catch (err) {}
    };

    return (
        <React.Fragment>
            <ErrorModal error={error} onClear={errorPopupCloser}></ErrorModal>
            <h1 className='admin-title'>New Manager</h1>
            <form className='place-form' onSubmit={managerSubmitHandler}>
                {isLoading && <LoadingSpinner asOverlay></LoadingSpinner>}
                <Input
                    onInput={inputHandler}
                    id='name'
                    element='input'
                    type='text'
                    label='Name'
                    errorText='Name should not be empty!!'
                    validators={[VALIDATOR_REQUIRE()]}
                ></Input>
                <Input
                    onInput={inputHandler}
                    id='email'
                    element='input'
                    type='text'
                    label='Email'
                    errorText='Email should not be empty!!'
                    validators={[VALIDATOR_REQUIRE()]}
                ></Input>
                <Input
                    onInput={inputHandler}
                    id='password'
                    element='input'
                    type='password'
                    label='Name'
                    errorText='password should not be empty!!'
                    validators={[VALIDATOR_REQUIRE()]}
                ></Input>

                <Button type='submit' disabled={!formState.isValid}>
                    Add Manager to the Store
                </Button>
            </form>
        </React.Fragment>
    );
};

export default NewManager;
