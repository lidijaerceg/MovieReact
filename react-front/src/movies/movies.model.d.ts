import { actorMovieDTO } from "../actors/actors.model";
import { genreDTO } from "../genres/genres.model";

export interface movieDTO {
    id:number;
    title:string;
    poster:string;
}

export interface movieCreationDTO{
    title: string;
    trailer: string;
    summary?: string;
    relaseDate? : Date;
    poster?: File;
    posterURL?: string;
    genresIds?: number[];
    movieTheaterIds?: number[];
}

export interface landingPageDTO{
    inTheaters?: movieDTO[];
    upcomingReleases?: movieDTO[];
}

export interface moviePostGetDTO{
    genres: genreDTO[]
}