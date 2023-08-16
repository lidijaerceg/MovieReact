import { actorMovieDTO } from "../actors/actors.model";
import { genreDTO } from "../genres/genres.model";
import { movieTheaterDTO } from "../movieTheaters/movieTheater.model";
import MovieForm from "./MovieForm";

export default function EditMovie(){

    const nonSelectedGenres: genreDTO[] = [{id:2, name:'Drama'}]
    const selectedGenres: genreDTO[] = [{id:1, name: 'Comedy'}]
    const nonSelectedMovieTheaters: movieTheaterDTO[] = 
    [{id:1, name: 'Cineplexx'}]
    const selectedMovieTheaters: movieTheaterDTO[] = 
    [{id:2, name:'Sirmium'}]

    const selectedActors: actorMovieDTO[] = [{
        id:1, name:'Lidija', character:'Jane', picture: 'https://static.standard.co.uk/2023/01/17/15/75a76e10b6c61ed60ced79a95b00283aY29udGVudHNlYXJjaGFwaSwxNjc0MDUyNDY3-2.69130963.jpg?width=1200&auto=webp&quality=75'
    }]

    return (
        <>
            <h3>Edit Movie</h3>
            <MovieForm model={{title: 'Toy Story 3', inTheaters: true, 
            trailer: 'url',
            relaseDate: new Date('2019-01-01T00:00:00')
            }} 
            onSubmit={values=> console.log(values)} 
            nonSelectedGenres={nonSelectedGenres}
            selectedGenres={selectedGenres}
            nonSelectedMovieTheaters={nonSelectedMovieTheaters}
            selectedMovieTheaters={selectedMovieTheaters}
            selectedActors={selectedActors}
            />
        </>
    )
}