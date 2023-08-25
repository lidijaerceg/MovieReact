import { useEffect, useState } from "react";
import ActorForm from "./ActorForm";
import { userDTO } from "../auth/auth.model";
import axios, { AxiosResponse } from "axios";
import { urlAccounts } from "../endpoints";
import { useParams } from "react-router-dom";

export default function CreateActor(){
   
    return(
        <>
            <h3>Create actor</h3>
            <ActorForm model={{name: '', dateOfBirth: undefined}}
                onSubmit={values => console.log(values)}
            />

        </>
    )
}