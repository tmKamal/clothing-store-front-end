import React, { useReducer,useEffect } from "react";
import "./input.scss";
import { validate } from "../../../util/validators/validators";

/* 
  ========= useReducer Guide ==============================================================================
  # We have use useReducer to handle the complex states of Input Component.
  # inputReducer function is the main advantage of the useReduce, Using that function we can 
    handle many behaviours according to the state changes.
  # Dispatch is the one who calls the inputReducer function
  # changeHandler and touchHandler - both uses the 'dispatch' to update the states of the Input component. 
  =========================================================================================================




*/

const inputReducer = (state, action) => {
  switch (action.type) {
    case "CHANGE":
      return {
        ...state,
        value: action.val,
        isValid: validate(action.val, action.validators),
      };
      case "TOUCH":
        return {
          ...state,
          isTouched:true
        }
    default:
      return state;
  }
};
const Input = (props) => {

  const [inputState, dispatch] = useReducer(inputReducer, {
    value: props.initialValue||"",
    isValid: props.initialValidity||false,
    isTouched: false
  });

  //Object destructuring 
  const {id,onInput}=props;         //from props 
  const {value,isValid}=inputState; //from inputState

  /*
   onInput function is here for send the data back to the new-places
   component to handle its form validation 
  */ 
  useEffect(()=>{
    onInput(id,value,isValid)
  },[id,value,isValid,onInput])
  /* we have use object desturing here,becase if we added them directly into the useEffect()
   without destructing , it will update (rerender) for each props and state changes.Also there is some posibility
   of having a infinite loop.but now it will only rerender according to the changes of these destructerd variables.*/

  const changeHandler = (event) => {
    dispatch({
      type: "CHANGE",
      val: event.target.value,
      validators: props.validators,
    });
  };

  const touchHandler=()=>{
    dispatch({
      type:"TOUCH",
      
    })
  }

  const element =
    props.element === "input" ? (
      <input
        type={props.type}
        id={props.id}
        placeholder={props.placeholder}
        onChange={changeHandler}
        onBlur={touchHandler}
        value={inputState.value}
      ></input>
    ) : (
      <textarea
        id={props.id}
        rows={props.rows || 3}
        onChange={changeHandler}
        onBlur={touchHandler}
        value={inputState.value}
      ></textarea>
    );

  return (
    <div
      className={`form-control ${
        !inputState.isValid && inputState.isTouched && "form-control--invalid"
      }`}
    >
      <label htmlFor={props.id}>{props.label}</label>
      {element}
      {!inputState.isValid && inputState.isTouched &&  <p>{props.errorText}</p>}
    </div>
  );
};

export default Input;
