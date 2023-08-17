import { actorMovieDTO } from "../actors/actors.model";
import { genreDTO } from "../genres/genres.model";
import { movieTheaterDTO } from "../movieTheaters/movieTheater.model";
import MovieForm from "./MovieForm";

export default function EditMovie(){

    const nonSelectedGenres: genreDTO[] = [{id:2, name:'Drama'}]
    const selectedGenres: genreDTO[] = [{id:1, name: 'Comedy'}]

    return (
        <>
            <h3>Edit Movie</h3>
            <MovieForm model={{title: 'Toy Story 3', 
            trailer: 'url',
            relaseDate: new Date('2019-01-01T00:00:00')
            }} 
            onSubmit={values=> console.log(values)} 
            nonSelectedGenres={nonSelectedGenres}
            selectedGenres={selectedGenres}
            />
        </>
    )
}