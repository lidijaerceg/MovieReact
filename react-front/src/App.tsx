import { BrowserRouter, Route, Switch } from "react-router-dom";
import "./App.css";
import Menu from "./Menu";
import configureValidations from "./Validations";
import routes from "./route-config";
import { useEffect, useState } from "react";
import { claim } from "./auth/auth.model";
import AuthenticationContext from "./auth/AuthenticationContext";
import { getClaims } from "./auth/handleJWT";
import configureInterceptor from "./utils/httpInterceptors";

configureValidations();
configureInterceptor();

function App() {
  const [claims, setClaims] = useState<claim[]>([]);

  useEffect(()=> {
    setClaims(getClaims())
  },[])

  function isAdmin(){
    return claims.findIndex(claim => claim.name === 'role' && claim.value === 'admin') > -1;
  }

  function isSalesperson(){
    return claims.findIndex(claim => claim.name === 'role' && claim.value === 'salesperson') > -1;
  }

  function isBuyer(){
    return claims.findIndex(claim => claim.name === 'role' && claim.value === 'buyer') > -1;
  }

  return (
    <BrowserRouter>
      <AuthenticationContext.Provider value={{ claims, update: setClaims }}>
        <Menu />
        <div className="container">
          <Switch>
            {routes.map((route) => (
              <Route key={route.path} path={route.path} exact={route.exact}>
                {route.isAdmin && !isAdmin() ? (
                  <>You are not allowed to see this page!</>
                ) : route.isSalesperson && !isSalesperson() ? (
                  <>You are not allowed to see this page!</>
                ) : route.isBuyer && !isBuyer() ? (
                  <>You are not allowed to see this page!</>
                )
                
                : (
                  <route.component />
                )}
              </Route>
              
            ))}
          </Switch>
          
        </div>
        <footer className="bd-footer py-5 mt-5 bg-light">
          <div className="container">
            ReactMovies {new Date().getFullYear().toString()}
          </div>
        </footer>
      </AuthenticationContext.Provider>
    </BrowserRouter>
  );
}

export default App;
