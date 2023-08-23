import { useEffect, useState } from "react";
import { urlAccounts } from "../endpoints";
import IndexEntity from "../utils/IndexEntity";
import { userDTO } from "./auth.model";
import { useParams } from "react-router-dom";
import axios, { AxiosResponse } from "axios";
import Loading from "../utils/Loading";

export default function Profile(){
    const {id} : any = useParams();
    const[user,setUser] = useState<userDTO>();

    useEffect(() => {
        axios.get(`${urlAccounts}/${id}`)
            .then((response: AxiosResponse<userDTO>)=> {
                setUser(response.data);
            });
    }, [id]);

    return user ? (
        <>
            <h2>{user.username}</h2>
        </>
    ) : ( <Loading/> 
    );
}