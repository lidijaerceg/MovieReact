import axios, { AxiosResponse } from "axios";
import { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import { urlMovies } from "../endpoints";
import { genreDTO } from "../genres/genres.model";
import DisplayErrors from "../utils/DisplayErrors";
import Loading from "../utils/Loading";
import { convertMovieToFormData } from "../utils/formDataUtils";
import MovieForm from "./MovieForm";
import { movieCreationDTO, moviePostGetDTO } from "./movies.model";

export default function CreateMovie(){

    const [nonSelectedGenres, setNonSelectedGenres] = useState<genreDTO[]>([]);
    
    const [loading, setLoading] = useState(true);
    const [errors, setErrors] = useState<string[]>([]);

    const history = useHistory();

    useEffect(()=>{
        axios.get(`${urlMovies}/postget`)
            .then((response: AxiosResponse<moviePostGetDTO>) => {
                setNonSelectedGenres(response.data.genres);
                setLoading(false);
            })
    }, [])

    async function create(movie: movieCreationDTO){
        try{
            const formData = convertMovieToFormData(movie);
            const response = await axios({
                method: 'post',
                url: urlMovies,
                data: formData,
                headers: {'Content-Type': 'multipart/form-data'}
            })
            
            history.push(`/movie/${response.data}`);

        }
        catch(error){
            if (axios.isAxiosError(error)) {
                if (error.response) {
                    console.error('Server Error Response:', error.response.data);
                } else {
                    console.error('Request Error:', error.message);
                }
                setErrors(error.response?.data.message || ['An error occurred.']);
            } else {
                console.error('Unknown Error:', error);
                setErrors(['An unknown error occurred.']);
            }
        }
    }

    return (
        <>
            <h3>Create Movie</h3>
            <DisplayErrors errors={errors}/>
            {loading ? <Loading /> : 
                <MovieForm model={{title: '', trailer: ''}} 
                onSubmit={async values=> await create(values)}
                nonSelectedGenres={nonSelectedGenres}
                selectedGenres={[]}
            /> }
        </>
    )
}