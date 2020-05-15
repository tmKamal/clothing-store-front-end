import React,{useState,useEffect} from "react";
import { useHistory } from "react-router-dom";
import Input from "../../Common/components/form-elements/input/input";
import ImageHandler from "../../Common/components/form-elements/image-handler/image-handler";
import { VALIDATOR_REQUIRE } from "../../Common/util/validators/validators";
import Button from "../../Common/components/form-elements/button";
import { useForm } from "../../Common/custom-hooks/form-hook";
import { useHttpClient } from "../../Common/custom-hooks/http-hook";
import Dropdown from "../../Common/components/form-elements/dropdown/dropdown"
import ErrorModal from "../../Common/components/UIElements/model/error-model";
import LoadingSpinner from "../../Common/components/UIElements/loading-spinner/loading-spinner";
import "./new-product.scss";

const NewProduct = () => {
    
  const history = useHistory(); // to redirect the user to new location.

  const { isLoading, error, sendRequest, errorPopupCloser } = useHttpClient();
  const [selectedCategory,setSelectedCategory]=useState();

  const [formState, inputHandler] = useForm(
    {
      name: {
        value: "",
        isValid: false,
      },

      price: {
        value: "",
        isValid: false,
      },
      discount: {
        value: "",
        isValid: false,
      },
      qty: {
        value: "",
        isValid: false,
      },
      image: {
        value: null,
        isValid: false,
      },
      
    },
    false
  );
  /* Retriving Categories for dropDown */
  
  const [loadedCategories, setLoadedCategories] = useState();

  const handleChange=(e)=>{
      console.log(e.target.value);
  }

  useEffect(() => {
    // we have use useEffect hook to stop the infinite loop. otherwise fetch will rerender to all the changes.
    const fetchCategories = async () => {
      // this method is only to use the async code. we can't use async directly on the useEffect hook. useEffect is not good for promisses.

      try {
        const responseData = await sendRequest(
          "http://localhost:9000/api/categories/"
        );

        setLoadedCategories(responseData.categories); //this is the key of the JSON response - view the backend code for more.
        
      } catch (err) {}
    };
    fetchCategories();
    
  }, [sendRequest]);

  

  const productSubmitHandler = async (event) => {
    event.preventDefault();
    console.log(formState.inputs);
    /* 
    In here, we have to pass a image too, but images has a binary data type
    so we can't pass binary data using JSON.
    therefore, we have to use FormData, which is a browser API.
    */
    try {
      const formData = new FormData();
      formData.append("name", formState.inputs.name.value); //fist parameter is the key, we will catch this requst in backend using this key.
      formData.append("price", formState.inputs.price.value);
      formData.append("discount", formState.inputs.discount.value);
      formData.append("qty", formState.inputs.qty.value);
      formData.append("category", selectedCategory);
      formData.append("image", formState.inputs.image.value);
      await sendRequest("http://localhost:9000/api/product/", "POST", formData);
      console.log(formState.inputs);
      history.push("/"); //redirecting user to main page
    } catch (err) {}
  };

  return (
    <React.Fragment>
      <ErrorModal error={error} onClear={errorPopupCloser}></ErrorModal>
      <form className="place-form" onSubmit={productSubmitHandler}>
        {isLoading && <LoadingSpinner asOverlay></LoadingSpinner>}
        <Input
          onInput={inputHandler}
          id="name"
          element="input"
          type="text"
          label="Name"
          errorText="Name should not be empty!!"
          validators={[VALIDATOR_REQUIRE()]}
        ></Input>
        <Input
          onInput={inputHandler}
          id="price"
          element="input"
          type="text"
          label="Price"
          errorText="Name should not be empty!!"
          validators={[VALIDATOR_REQUIRE()]}
        ></Input>
        <Input
          onInput={inputHandler}
          id="discount"
          element="input"
          type="text"
          label="Discount"
          errorText="Name should not be empty!!"
          validators={[VALIDATOR_REQUIRE()]}
        ></Input>
        <Input
          onInput={inputHandler}
          id="qty"
          element="input"
          type="text"
          label="Qty"
          errorText="Name should not be empty!!"
          validators={[VALIDATOR_REQUIRE()]}
        ></Input>
        <ImageHandler id="image" center onInput={inputHandler}></ImageHandler>
        
        {!isLoading&&loadedCategories&&<Dropdown id="cats" label="Category" menuArr={loadedCategories} changer={e=>{setSelectedCategory(e.target.value)}}></Dropdown>}

        <Button type="submit" disabled={!formState.isValid}>
          Add product
        </Button>
      </form>
    </React.Fragment>
  );
};

export default NewProduct;
