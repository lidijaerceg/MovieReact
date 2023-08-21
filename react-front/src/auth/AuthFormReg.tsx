import { Form, Formik, FormikHelpers } from "formik";
import { userCredentials, userCredentialsReg } from "./auth.model";
import * as Yup from 'yup';
import TextField from "../forms/TextField";
import Button from "../utils/Button";
import { Link } from "react-router-dom";
import DateField from "../forms/DateField";
import ImageField from "../forms/imageField";

export default function AuthForm(props: authFormProps){
    return(
        <Formik
            initialValues={props.model}
            onSubmit={props.onSubmit}
            validationSchema={Yup.object({
                username: Yup.string().required('This field is required.'),
                // name: Yup.string().required('This field is required.'),
                // lastname: Yup.string().required('This field is required.'),
                // dateOfBirth: Yup.date().nullable().required('This field is required'),
                // address: Yup.string().required('This field is required.'),

                email: Yup.string().required('This field is required.')
                    .email('You have to insert a valid email'),
                password: Yup.string().required('This field is required.')
            })}
           
        >
            {formikProps =>(
                <Form>
                    <TextField displayName="Username" field="username"/>
                    <TextField displayName="Email" field="email"/>
                    <TextField displayName="Password" field="password" type="password"/>
                    <TextField displayName="Name" field="name"/>
                    {/* <TextField displayName="Lastname" field="lastname"/>
                    <DateField displayName="Date of birth" field="dateOfBirth" />
                    <TextField displayName="Address" field="address"/>
                    <ImageField displayName="Picture" field="picture" 
                    imageURL = {props.model.pictureURL} />*/}

                    <Button disabled={formikProps.isSubmitting} type="submit">Send</Button>
                    <Link className="btn btn-secondary" to="/">Cancel</Link>
                </Form>
            )}
        </Formik>
    )
}

interface authFormProps{
    model: userCredentialsReg;
    onSubmit(vales: userCredentialsReg, action: FormikHelpers<userCredentialsReg>): void;
}


