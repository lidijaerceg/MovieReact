import { actorMovieDTO } from "../actors/actors.model";
import { genreDTO } from "../genres/genres.model";

export interface movieDTO {
    id:number;
    title:string;
    poster:string;
    trailer: string;
    summary?: string;
    genres: genreDTO[];
}

export interface movieCreationDTO{
    title: string;
    trailer: string;
    summary?: string;
    poster?: File;
    posterURL?: string;
    genresIds?: number[];
}

export interface landingPageDTO{
    movie?: movieDTO[];
}

export interface moviePostGetDTO{
    genres: genreDTO[]
}

export interface moviePutGetDTO{
    movie: movieDTO;
    selectedGenres: genreDTO[];
    nonSelectedGenres: genreDTO[];
}