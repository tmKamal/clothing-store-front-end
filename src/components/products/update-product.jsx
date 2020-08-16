import React, { useEffect, useState, useContext } from 'react';
import { useParams, useHistory } from 'react-router-dom';

import Input from '../../Common/components/form-elements/input/input';
import Button from '../../Common/components/form-elements/button';
import Card from '../../Common/components/UIElements/card/card';
import LoadingSpinner from '../../Common/components/UIElements/loading-spinner/loading-spinner';
import ErrorModal from '../../Common/components/UIElements/model/error-model';
import { VALIDATOR_REQUIRE } from '../../Common/util/validators/validators';
import { useForm } from '../../Common/custom-hooks/form-hook';
import { useHttpClient } from '../../Common/custom-hooks/http-hook';
import { AuthContext } from '../../Common/context/auth-context';
import './update-product.scss';

const UpdateProduct = () => {
    const auth = useContext(AuthContext);
    const { isLoading, error, sendRequest, clearError } = useHttpClient();
    const [loadedProducts, setLoadedProducts] = useState();
    const productId = useParams().pid;
    const history = useHistory();

    const [formState, inputHandler, setFormData] = useForm(
        {
            name: {
                value: '',
                isValid: false
            },
            price: {
                value: '',
                isValid: false
            },
            discount: {
                value: '',
                isValid: false
            },
            qty: {
                value: '',
                isValid: false
            }
        },
        false
    );

    useEffect(() => {
        const fetchProduct = async () => {
            try {
                const responseData = await sendRequest(
                    `https://quiet-hollows-79620.herokuapp.com/api/product/${productId}`
                );
                setLoadedProducts(responseData.product);
                setFormData(
                    {
                        name: {
                            value: responseData.product.name,
                            isValid: true
                        },
                        price: {
                            value: responseData.product.price,
                            isValid: true
                        },
                        discount: {
                            value: responseData.product.discount,
                            isValid: true
                        },
                        qty: {
                            value: responseData.product.qty,
                            isValid: true
                        }
                    },
                    true
                );
            } catch (err) {}
        };
        fetchProduct();
    }, [sendRequest, productId, setFormData]);

    const productUpdateSubmitHandler = async (event) => {
        event.preventDefault();
        console.log(auth.token);
        try {
            await sendRequest(
                `https://quiet-hollows-79620.herokuapp.com/api/product/${productId}`,
                'PATCH',
                JSON.stringify({
                    name: formState.inputs.name.value,
                    price: formState.inputs.price.value,
                    discount: formState.inputs.discount.value,
                    qty: formState.inputs.qty.value
                }),
                {
                    'Content-Type': 'application/json',
                    Authorization: 'Bearer ' + auth.token
                }
            );

            history.push('/');
        } catch (err) {}
    };

    if (isLoading) {
        return (
            <div className='center'>
                <LoadingSpinner />
            </div>
        );
    }

    if (!loadedProducts && !error) {
        return (
            <div className='center'>
                <Card>
                    <h2>Could not find Product!</h2>
                </Card>
            </div>
        );
    }

    return (
        <React.Fragment>
            <ErrorModal error={error} onClear={clearError} />
            {!isLoading && loadedProducts && (
                <form
                    className='place-form'
                    onSubmit={productUpdateSubmitHandler}
                >
                    <Input
                        id='name'
                        element='input'
                        type='text'
                        label='Name'
                        validators={[VALIDATOR_REQUIRE()]}
                        errorText='Please enter a valid Name'
                        onInput={inputHandler}
                        initialValue={loadedProducts.name}
                        initialValid={true}
                    />
                    <Input
                        id='price'
                        element='input'
                        label='Price'
                        validators={[VALIDATOR_REQUIRE()]}
                        errorText='Please enter a price.'
                        onInput={inputHandler}
                        initialValue={loadedProducts.price}
                        initialValid={true}
                    />
                    <Input
                        id='discount'
                        element='input'
                        label='Discount'
                        validators={[VALIDATOR_REQUIRE()]}
                        errorText='please enter 0, if there is not any discounts.'
                        onInput={inputHandler}
                        initialValue={loadedProducts.discount}
                        initialValid={true}
                    />
                    <Input
                        id='qty'
                        element='input'
                        label='Qty'
                        validators={[VALIDATOR_REQUIRE()]}
                        errorText='Please enter a valid qty.'
                        onInput={inputHandler}
                        initialValue={loadedProducts.qty}
                        initialValid={true}
                    />
                    <Button type='submit'>UPDATE PRODUCT</Button>
                </form>
            )}
        </React.Fragment>
    );
};

export default UpdateProduct;
