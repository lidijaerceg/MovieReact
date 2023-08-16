import MovieTheaterForm from "./MovieTheaterForm";

export default function EditMovieTheaters(){
    return(
        <>
            <h3>Edit Movie Theaters</h3>
            <MovieTheaterForm
                model={{name: ''}}
                onSubmit={values => console.log(values)}
            />
        </>
    )
}