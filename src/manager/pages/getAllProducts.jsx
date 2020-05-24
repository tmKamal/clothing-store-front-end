import React, { useEffect, useState } from "react";
import { useHttpClient } from "../../Common/custom-hooks/http-hook";

import ErrorModal from "../../Common/components/UIElements/model/error-model";
import LoadingSpinner from "../../Common/components/UIElements/loading-spinner/loading-spinner";
import Button from "../../Common/components/form-elements/button";

const AllProducts = () => {
  const { isLoading, error, sendRequest, errorPopupCloser } = useHttpClient();
  const [loadedProducts, setLoadedProducts] = useState();

  useEffect(() => {
    // we have use useEffect hook to stop the infinite loop. otherwise fetch will rerender to all the changes.
    const fetchProducts = async () => {
      // this method is only to use the async code. we can't use async directly on the useEffect hook. useEffect is not good for promisses.

      try {
        const responseData = await sendRequest(
          "http://localhost:9000/api/product/products/all"
        );

        setLoadedProducts(responseData.products); //this is the key of the JSON response - view the backend code for more.
      } catch (err) {}
    };
    fetchProducts();
  }, [sendRequest]);

  return (
    <React.Fragment>
      <ErrorModal error={error} onClear={errorPopupCloser}></ErrorModal>
      {isLoading && (
        <div className="center">
          <LoadingSpinner></LoadingSpinner>
        </div>
      )}
      {loadedProducts && !isLoading && (
        <React.Fragment>
          <h1 className="admin-title">Products</h1>
          <table style={{ margin: "10px" }} className="table table-striped">
            <thead>
              <tr>
                <th scope="col">Name</th>
                <th scope="col">Image</th>
                <th scope="col">Price</th>
                <th scope="col">Update</th>
                <th scope="col">Delete</th>
              </tr>
            </thead>
            <tbody>
              {loadedProducts.map((prod) => (
                <tr key={prod.id}>
                  <th style={{ verticalAlign: "middle" }} scope="row">
                    {prod.name}
                  </th>
                  <td style={{ textAlign: "center" }}>
                    <img
                      src={prod.image}
                      alt={prod.name}
                      width="50"
                      height="auto"
                    />
                  </td>
                  <th style={{ verticalAlign: "middle" }}>LKR {prod.price}</th>
                  <th style={{ verticalAlign: "middle" }}>
                    <Button to={`/update/product/${prod.id}`}>Update</Button>
                  </th>
                  <th style={{ verticalAlign: "middle" }}>
                    <Button danger to={`/delete/product/${prod.id}`}>
                      Delete
                    </Button>
                  </th>
                </tr>
              ))}
            </tbody>
          </table>
        </React.Fragment>
      )}
    </React.Fragment>
  );
};

export default AllProducts;
