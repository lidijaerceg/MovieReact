import { useContext, useEffect, useState } from "react";
import { userDTO } from "./auth.model";
import AlertContext from "../utils/AlertContext";
import Button from "../utils/Button";
import { Link } from "react-router-dom";
import { urlAccounts } from "../endpoints";
import axios, { AxiosResponse } from "axios";
import Loading from "../utils/Loading";

export default function IndividualProfile(props: userDTO){
    const buildLink = () => `/editProfile/${props.id}`;
    const customAlert = useContext(AlertContext);
    const [user, setUser] = useState<userDTO>();

    useEffect(() =>{
        axios.get(`${urlAccounts}/${props.id}`)
        .then((response: AxiosResponse<userDTO>)=>{
            setUser(response.data)
        })
    }, [props.id]);

    return user ?(
        <div>
            <h2>{user.username}</h2>
            <table>
                <tbody>
                    <tr>Name</tr>
                    <tr>{user.name}</tr>
                </tbody>
            </table>
            <Link to={buildLink()} className="btn btn-primary">
                Edit Profile
            </Link>
        </div>
    ) : (<Loading/>
    );
}

