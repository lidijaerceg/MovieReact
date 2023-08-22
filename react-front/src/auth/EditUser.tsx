import axios, { AxiosResponse } from "axios"
import { useEffect, useState } from "react"
import { urlAccounts } from "../endpoints"
import { useHistory, useParams } from "react-router-dom";
import { editUserDTO, userCredentialsReg, userDTO } from "./auth.model";
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
                const model: userCredentialsReg = {
                    name: response.data.profile.name,
                    lastname: response.data.profile.lastname,
                    username: response.data.profile.username,
                    pictureURL: response.data.profile.pictureURL,
                    address: response.data.profile.address,
                    dateOfBirth: new Date(response.data.profile.dateOfBirth),
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

