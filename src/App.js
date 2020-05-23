import React, { useCallback, useState, useEffect } from "react";

import UserAuth from "./user/pages/user-auth";
import "./App.css";
import {
  BrowserRouter as Router,
  Route,
  Switch,
  Redirect,
} from "react-router-dom";
import Users from "./admin/pages/admins";
import Categories from "./category/pages/categories";
import ProductsByCat from "./components/products/ProductsByCat";
import MainNavigation from "./Common/components/navigation/main-navigation";
import NewCategory from "./category/pages/new-category";
import NewProduct from "./components/products/new-product";
import Product from "./components/view-product/product";
import Auth from "./admin/pages/authentication";
import { AuthContext } from "./Common/context/auth-context";
import Cart from "./components/cart/cart.component";
import setAxiosToken from "./axiosutils/setAxiosToken";
import AdminPannel from "./Common/admin-pannel/admin-pannel";
import ContentContainer from "./Common/admin-pannel/admin-content-container/admin-content-container";
import AdminWrapper from "./Common/admin-pannel/wrapper/wrapper";
import NewManager from "./admin/pages/add-manager";

function App() {
  const [token, setToken] = useState(false);
  const [userId, setUserId] = useState(false);
  const [tokenExpAuto, setTokenExpAuto] = useState();
  const [role, setRole] = useState(false);
  const [IsLoading, setIsLoading] = useState(true);

  const login = useCallback((uid, token, role, tokenExpDate) => {
    setToken(token);
    setUserId(uid);
    setRole(role);
    setIsLoading(true);
    let tokenExp;
    if (!tokenExpDate) {
      tokenExp = new Date(new Date().getTime() + 10000 * 60 * 60); //Creating a new Expiration date => current time+1hr
      setTokenExpAuto(tokenExp);
    } else {
      tokenExp = tokenExpDate; //Assigning the old date
      setTokenExpAuto(tokenExp);
    }
    localStorage.setItem(
      "userData",
      JSON.stringify({
        userId: uid,
        token: token,
        role: role,
        tokenExp: tokenExp.toISOString(), //setting expiration time for the token we have storing in the local storage
      })
    );
    console.log("auto logged in" + role + " " + token);
    setAxiosToken(token);
  }, []);
  const logout = useCallback(() => {
    setToken(false);
    setUserId(null);
    setRole(null);
    setTokenExpAuto(null);
    
    localStorage.removeItem("userData");
    console.log("auto logged out");
    setAxiosToken(null);
  }, []); //we have use callback here because we do not need to recreate(rerender) this element to the unwanted changes of the states and to prevent from infinite loops.

  //Managing token expiration
  /* 
    we have set 1hr to expire the token in the backend.
    but still we have to manually expire the token which we have stored on the local storage.
    Therfore, we have call the localstorage.removeItem in logout function.
    yet we have to handle that logout to happen automatically using a useEffect.
    2nd useEffect is here for that.
  */
  useEffect(() => {
    const storedData = JSON.parse(localStorage.getItem("userData"));
    if (
      storedData &&
      storedData.token &&
      new Date(storedData.tokenExp) > new Date()
    ) {
      login(
        storedData.userId,
        storedData.token,
        storedData.role,
        new Date(storedData.tokenExp)
      );
    }
  }, [login]);
  //Auto logout, when time expires
  useEffect(() => {
    let logoutTime;
    if (token && tokenExpAuto) {
      const timer = tokenExpAuto.getTime() - new Date().getTime();
      logoutTime = setTimeout(logout, timer); //Executes the function, after waiting a specified number of milliseconds.
    } else {
      clearTimeout(logoutTime);
    }
  }, [token, logout, tokenExpAuto]);

  let routes;

  if (token && role === "admin") {
    routes = (
      <React.Fragment>
        <AdminWrapper>
          <Route path="/">
            <AdminPannel></AdminPannel>
          </Route>
          {console.log("Admins...")}

          <Switch>
            <Route path="/" exact>
              <Categories />
            </Route>
            <Route path="/new-manager" exact>
              <NewManager/>
            </Route>
            <Route path="/users" exact>
           
                <Users />
             
            </Route>
            <Route path="/new-category" exact>
              <NewCategory />
            </Route>
            <Route path="/new-product" exact>
              <NewProduct />
            </Route>
            <Route exact path="/product/:id">
              <Product />
            </Route>
            <Route exact path="/cat/:id">
              <ProductsByCat />
            </Route>
            <Route exact path="/cart">
              <Cart />
            </Route>

            <Redirect to="/" />
          </Switch>
        </AdminWrapper>
      </React.Fragment>
    );
  } else if (token && role === "user") {
    routes = (
      <React.Fragment>
        {console.log("users...")}
        <Route path="/">
          <MainNavigation />
        </Route>
        <Switch>
          <Route path="/" exact>
            <Categories />
          </Route>

          <Route path="/users" exact>
            <Users />
          </Route>
          <Route path="/new-category" exact>
            <NewCategory />
          </Route>

          <Redirect to="/" />
        </Switch>
      </React.Fragment>
    );
  } else if (token) {
    routes = (
      <Switch>
        {console.log("everyone who have a token...")}
        <Route path="/users" exact>
          <Users />
        </Route>
        <Route path="/" exact>
          <Categories />
        </Route>
        <Route path="/auth">
          <Auth />
        </Route>
        <Redirect to="/auth" />
      </Switch>
    );
  } else {
    
    routes = (
      <React.Fragment>
        {console.log("everyone...")}
        <Route path="/">
          <MainNavigation />
        </Route>
        <Switch>
          <Route path="/users" exact>
            <Users />
          </Route>
          <Route path="/" exact>
            <Categories />
          </Route>

          <Route exact path="/product/:id">
            <Product />
          </Route>
          <Route exact path="/cat/:id">
            <ProductsByCat />
          </Route>
          <Route exact path="/cart">
            <Cart />
          </Route>
          <Route path="/auth">
            <Auth />
          </Route>
          <Route path="/auth-user">
            <UserAuth></UserAuth>
          </Route>
          <Redirect to="/auth" />
        </Switch>
      </React.Fragment>
    );
  }

  return (
    <AuthContext.Provider
      value={{
        isLoggedIn: !!token,
        token: token,
        userId: userId,
        role: role,
        login: login,
        logout: logout,
      }}
    >
      {IsLoading ? <Router>{routes}</Router>:<div>{IsLoading}</div>}
    </AuthContext.Provider>
  );
}

export default App;
