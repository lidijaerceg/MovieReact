import { Form, Formik, FormikHelpers } from "formik";
import { movieCreationDTO } from "./movies.model";
import * as Yup from 'yup';
import Button from "../utils/Button";
import { Link } from "react-router-dom";
import TextField from "../forms/TextField";
import DateField from "../forms/DateField";
import ImageField from "../forms/imageField";
import CheckboxField from "../forms/CheckboxField";
import MultipleSelector, { multipleSelectorModel } from "../forms/MultipleSelector";
import { useState } from "react";
import { genreDTO } from "../genres/genres.model";
import { movieTheaterCreationDTO, movieTheaterDTO } from "../movieTheaters/movieTheater.model";
import TypeAheadActors from "../forms/TypeAheadActors";
import { actorMovieDTO } from "../actors/actors.model";
import MarkdownField from "../forms/MarkdownField";


export default function MovieForm(props: movieFormProps){

    const [selectedGenres, setSelectedGenres] = useState(mapToModel(props.selectedGenres));
    const [nonSelectedGenres, setNonSelectedGenres] = useState(mapToModel(props.nonSelectedGenres));



    function mapToModel(items: {id:number, name:string}[]): multipleSelectorModel[] {
        return items.map(item=>{
            return{key: item.id, value: item.name}
        })
    }

    return(
        <Formik
            initialValues={props.model}
            onSubmit={(values,actions) =>{
                values.genresIds = selectedGenres.map(item=>item.key);
                values.movieTheaterIds = selectedGenres.map(item=>item.key);
                props.onSubmit(values,actions)}}
            validationSchema={Yup.object({
                title:Yup.string().required('This ').firstLetterUppercase()
            })}
        >
            {(formikProps)=>(
                <Form>
                    <TextField displayName="Title" field="title"/>
                    <TextField displayName="Trailer" field="trailer"/>
                    <ImageField displayName="Poster" field="poster"
                        imageURL={props.model.posterURL}
                    />

                    <MarkdownField displayName="Summary" field="summary"/>

                    <MultipleSelector 
                        displayName="Genres"
                        nonSelected={nonSelectedGenres}
                        selected = {selectedGenres}
                        onChange={(selected, nonSelected) => {
                            setSelectedGenres(selected);
                            setNonSelectedGenres(nonSelected);
                        }}
                    />


                    <Button disabled={formikProps.isSubmitting} type='submit'>Save Changes</Button>
                    <Link className="btn btn-secondary" to="/genres">Cancel</Link>
                </Form>
            )}
        </Formik>
    )
}

interface movieFormProps{
    model: movieCreationDTO;
    onSubmit(values: movieCreationDTO, actions: FormikHelpers<movieCreationDTO>): void;
    selectedGenres: genreDTO[];
    nonSelectedGenres: genreDTO[];
}