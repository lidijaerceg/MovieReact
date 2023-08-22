import axios from "axios";
import { urlAccounts } from "../endpoints";
import { authenticationResponse, userCredentialsReg } from "./auth.model";
import { useContext, useState } from "react";
import DisplayErrors from "../utils/DisplayErrors";
import AuthForm from "./AuthFormReg";
import { getClaims, saveToken } from "./handleJWT";
import AuthenticationContext from "./AuthenticationContext";
import { useHistory } from "react-router-dom";
import AuthFormReg from "./AuthFormReg";

export default function Register(){

    const[errors, setErrors] = useState<string[]>([]);
    const{update} = useContext(AuthenticationContext);
    const history = useHistory();

    async function register(credentials: userCredentialsReg){
        try{
            setErrors([]);
            const response = await axios
                .post<authenticationResponse>(`${urlAccounts}/create`, credentials);
            saveToken(response.data);
            update(getClaims());
            history.push('/');
        }
        catch(error){
            setErrors(error.response.data);
        }
    }

    return(
        <>
            <h3>Register</h3>
            <DisplayErrors errors={errors}/>
            <AuthFormReg
                model={{username: '',email: '', password: '', name: '', lastname: '', address: ''}}
                onSubmit={async values => await register(values)}
            />
        </>
    )
}