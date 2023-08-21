import axios, { AxiosResponse } from "axios"
import { useEffect, useState } from "react"
import { urlAccounts } from "../endpoints"
import { useHistory, useParams } from "react-router-dom";
import { editUserDTO, userCredentialsReg } from "./auth.model";
import DisplayErrors from "../utils/DisplayErrors";
import EditForm from "./EditForm";
import Loading from "../utils/Loading";
import { convertProfileToFormData } from "../utils/formDataUtils";

export default function EditUser(){

    const { id }: any = useParams();
    const[profile, setProfile] = useState<userCredentialsReg>();
    const[editProfile, setEditProfile] = useState<editUserDTO>();
    const [errors, setErrors] = useState<string[]>([]);
    const history = useHistory();
  
    useEffect(() => {
        axios.get(`${urlAccounts}/PutGet/${id}`)
            .then((response: AxiosResponse<editUserDTO>) =>{
                const model: userCredentialsReg ={
                    email: response.data.profile.email,
                    password: response.data.profile.password,
                    username: response.data.profile.password,
                };

                setProfile(model);
                setEditProfile(response.data);
            })
    }, [id]);

    async function edit(profileToEdit: userCredentialsReg){
        try{
            const formData = convertProfileToFormData(profileToEdit);
            await axios({
                method: "put",
                url: `${urlAccounts}/${id}`,
                data: formData,
                headers: { "Content-Type": "multipart/form-data" },
            });
            history.push('/');
        }
        catch(error){
            setErrors(error.response.data);
        }
    }

    return (
        <>
            <h3>Edit profile</h3>
            <DisplayErrors errors={errors}/>
            {profile && editProfile ? (
                <EditForm 
                    model={profile}
                    onSubmit={async (values) => await edit(values)}
                />
            ) : <Loading />
            }
        </>
    )
}

