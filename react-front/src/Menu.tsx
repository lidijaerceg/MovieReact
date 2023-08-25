import { Link, NavLink, useHistory, useParams } from "react-router-dom";
import Authorized from "./auth/Authorized";
import Button from "./utils/Button";
import { getClaims, logout } from "./auth/handleJWT";
import { useContext, useEffect, useState } from "react";
import AuthenticationContext from "./auth/AuthenticationContext";
import { editUserDTO, userDTO } from "./auth/auth.model";
import axios, { AxiosResponse } from "axios";
import { urlAccounts } from "./endpoints";

export default function Menu() {
//   const { id }: any = useParams();

//   const [user, setUser] = useState<userDTO>();


// useEffect(() => {
//   axios
//     .get(`${urlAccounts}/${id}`)
//     .then((response: AxiosResponse<userDTO>) => {
//       setUser(response.data);
//     });
// }, [id]);  
  const {update, claims} = useContext(AuthenticationContext);

  const token = localStorage.getItem


  function edit(props: userDTO){
   const buildLink = () => `/editProfile/${props.id}`;
  }
  
  const history = useHistory();
  
  
  const handleLogout = () => {
      logout();
      history.push('/'); // Redirect to the homepage
    };
  
  function getUserEmail(): string {
    return claims.filter(x=> x.name === "email")[0]?.value;
  }

  function getUserId(): string | undefined {
    return claims.find(x => x.name === 'id')?.value;
  }

  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-light">
      <div className="container-fluid">
        <NavLink className="navbar-brand" to="/">
          Retro DVD store
        </NavLink>
        <div
          className="collapse navbar-collapse"
          style={{ display: "flex", justifyContent: "space-between" }}
        >
          <ul className="navbar-nav me-auto mb-2 mb-lg-0">
            <li className="nav-item">
              <NavLink className="nav-link" to="/movies/filter">
                Filter Movies
              </NavLink>
            </li>
            <Authorized 
              role="salesperson"
              authorized={
                <>
               
                <li className="nav-item">
                    <NavLink className="nav-link" to="/movies/create">
                      Create a Movie
                    </NavLink>
                  </li>
                  
                </>
              }
            />
            <Authorized
              role="admin" 
              authorized={
                <>
                  <li className="nav-item">
                    <NavLink className="nav-link" to="/genres">
                      Genres
                    </NavLink>
                  </li>
                   <li className="nav-item">
                    <NavLink className="nav-link" to="/purchases">
                      Purchases 
                    </NavLink>
                  </li>
                  {/*<li className="nav-item">
                    <NavLink className="nav-link" to="/movietheaters">
                      menjaj posle
                    </NavLink>
                  </li> */}
                  {/* <li className="nav-item">
                    <NavLink className="nav-link" to="/movies/create">
                      Create a Movie
                    </NavLink>
                  </li> */}
                  <li className="nav-item">
                    <NavLink className="nav-link" to="/users">
                      Users
                    </NavLink>
                  </li>
                </>
              }
            />
          </ul>
          <div className="d-flex">
            <Authorized
              authorized={
                <>
                  
                  <Link to='/editProfile' className="nav-link">Hello, {getUserEmail()}</Link>
                  <Button className="nav-link btn btn-link" onClick={() =>{
                    logout();
                    handleLogout();
                    update([]);
                  }}>
                    Log out
                  </Button>
                </>
              }
              notAuthorized={
                <>
                  <Link to="/register" className="nav-link btn btn-link">
                    Register
                  </Link>
                  <Link to="/login" className="nav-link btn btn-link">
                    Login
                  </Link>
                </>
              }
            />
          </div>
        </div>
      </div>
    </nav>
  );
}
