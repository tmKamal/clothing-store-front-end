import React, { useState, useContext } from 'react';
import Input from '../../Common/components/form-elements/input/input';
import './manager.scss';
import { VALIDATOR_EMAIL } from '../../Common/util/validators/validators';
import { useForm } from '../../Common/custom-hooks/form-hook';
import Button from '../../Common/components/form-elements/button';
import Card from '../../Common/components/UIElements/card/card';
import { AuthContext } from '../../Common/context/auth-context';
import ErrorModal from '../../Common/components/UIElements/model/error-model';
import LoadingSpinner from '../../Common/components/UIElements/loading-spinner/loading-spinner';

const ManagerAuth = () => {
	const auth = useContext(AuthContext); //useContext is a special one, which will help us to pass some data obj without using props. we can use it like session.

	
	const [ isLoading, setIsLoading ] = useState(false);
	const [ error, setError ] = useState();

	
	const [ formState, inputHandler ] = useForm(
		{
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

	const submitHandler = async (event) => {
		event.preventDefault();
		setIsLoading(true);
		
			try {
				/* fetch is not handles the error throwing from backend as 404, 500, etc.
           because they are also a valid response.
           so we have to handle them manually.
        */

				const response = await fetch('http://localhost:9000/api/manager/login', {
					method: 'POST',
					headers: {
						'Content-Type': 'application/json'
					},
					body: JSON.stringify({
						//json to js
						email: formState.inputs.email.value,
						password: formState.inputs.password.value
					})
				});
				const responseData = await response.json();
				if (!response.ok) {
					throw new Error(responseData.message); // this will execute the catch block.
				}
				console.log(responseData);
				setIsLoading(false);
				//window.localStorage.setItem('adminId', responseData.userId);
				auth.login(responseData.userId, responseData.token,responseData.role); //we called the login function of the auth-context. actullly its a empty function, but we have declared its values in app.js, we included the userid too.
			} catch (err) {
				console.log(err);
				setIsLoading(false);
				setError(err.message || 'something went wrong!!!');
			}
		
			
		
	};

	const errorModalCloser = () => {
		setError(null);
	};

	return (
		<React.Fragment>
			<ErrorModal error={error} onClear={errorModalCloser} />
			<Card className='authentication'>
				{isLoading && <LoadingSpinner asOverlay />}
				<h2>Manager Login</h2>
				<hr />
				<form onSubmit={submitHandler}>
					
					<Input
						onInput={inputHandler}
						id='email'
						element='input'
						type='email'
						label='Email'
						errorText='Please enter a valid email'
						validators={[ VALIDATOR_EMAIL() ]}
					/>
					<Input
						onInput={inputHandler}
						id='password'
						element='input'
						type='password'
						label='Password'
						
					/>
					<Button type='submit' disabled={!formState.isValid}>
						{'LogIn'}
					</Button>
				</form>
				
			</Card>
		</React.Fragment>
	);
};
export default ManagerAuth;
