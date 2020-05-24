import React,{useContext, useState} from "react";
import {useHistory} from "react-router-dom";// to redirect the user to new location
import Input from "../../Common/components/form-elements/input/input";
import {
  VALIDATOR_REQUIRE
  
} from "../../Common/util/validators/validators";
import Button from "../../Common/components/form-elements/button";
import { useForm } from "../../Common/custom-hooks/form-hook";
import { useHttpClient } from "../../Common/custom-hooks/http-hook";

import ErrorModal from "../../Common/components/UIElements/model/error-model";
import SuccessModal from "../../Common/components/UIElements/model/success-model";
import LoadingSpinner from "../../Common/components/UIElements/loading-spinner/loading-spinner";
import {AuthContext} from "../../Common/context/auth-context";


const UpdatePassword = () => {
  const auth = useContext(AuthContext);
  const history=useHistory();// to redirect the user to new location.
  
  const { isLoading, error, sendRequest, errorPopupCloser } = useHttpClient();
    const [msg,setMsg]=useState();
    const SuccessPopupCloser=()=>{
        setMsg(null);
        history.push('/'); 
    }
  const [formState, inputHandler] = useForm(
    /* Object destructuring - according to (custom)form-hook -> useForm function, it return the formState and inputHandle. so using destructuring we can catch their values easily.  */
    {
      oldPassword: {
        value: "",
        isValid: false,
      },
      newPassword:{
          value:"",
          isValid:false,
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
    const responseData= await sendRequest(
      "http://localhost:9000/api/manager/password",
      "POST",
      JSON.stringify({
        oldPassword: formState.inputs.oldPassword.value,
        newPassword: formState.inputs.newPassword.value,
        userId:auth.userId,
        
      }),
      {'Content-Type':'application/json',Authorization: 'Bearer '+auth.token}
    );
    console.log(formState.inputs+auth.userId+responseData.msg);
    setMsg(responseData.msg);

    
  } catch (err) {}
  };

  return (
    <React.Fragment>
      <ErrorModal error={error} onClear={errorPopupCloser}></ErrorModal>
      <SuccessModal msg={msg} onClear={SuccessPopupCloser}></SuccessModal>
      <form className="place-form" onSubmit={managerSubmitHandler}>
        {isLoading && <LoadingSpinner asOverlay></LoadingSpinner>}
        <Input
          onInput={inputHandler}
          id="oldPassword"
          element="input"
          type="password"
          label="Current Password"
          errorText="Password should not be empty!!"
          validators={[VALIDATOR_REQUIRE()]}
        ></Input>
        <Input
          onInput={inputHandler}
          id="newPassword"
          element="input"
          type="password"
          label="New Password"
          errorText="Password should not be empty!!"
          validators={[VALIDATOR_REQUIRE()]}
        ></Input>
        
        
        <Button type="submit" disabled={!formState.isValid}>
          Change Password
        </Button>
      </form>
    </React.Fragment>
  );
};

export default UpdatePassword;
