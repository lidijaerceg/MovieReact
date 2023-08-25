import axios, { AxiosResponse } from "axios";
import { useEffect, useState } from "react";
import { urlMovies } from "../endpoints";
import { Link, useParams } from "react-router-dom";
import { movieDTO } from "./movies.model";
import Loading from "../utils/Loading";
import ReactMarkdown from "react-markdown";
import Authorized from "../auth/Authorized";

export default function MovieDetails() {
  const { id }: any = useParams();
  const [movie, setMovie] = useState<movieDTO>();

  useEffect(() => {
    axios
      .get(`${urlMovies}/${id}`)
      .then((response: AxiosResponse<movieDTO>) => {
        setMovie(response.data);
      });
  }, [id]);

  function generateEmbeddedVideoURL(trailer: string): string {
    if (!trailer) {
      return "";
    }

    let videoId = trailer.split("v=")[1];
    const amersandPosition = videoId.indexOf("&");
    if (amersandPosition !== -1) {
      videoId = videoId.substring(0, amersandPosition);
    }

    return `https://www.youtube.com/embed/${videoId}`;
  }

  return movie ? (
    <div>
      <h2>{movie.title} </h2>
      <h4>Price: {movie.price}$</h4>
      {movie.genres?.map((genre) => (
        <Link
          key={genre.id}
          style={{ marginRight: "5px" }}
          className="btn btn-primary btn-sm rounded-pill"
          to={`/movies/filter?genreId=${genre.id}`}
          >
          {genre.name}
        </Link>
      ))}
      <div style={{ display: "flex", marginTop: "1rem" }}>
        <span style={{ display: "inline-block", marginRight: "1rem" }}>
          <img
            src={movie.poster}
            style={{ width: "225px", height: "315px" }}
            alt="poster"
          />
        </span>
        {movie.trailer ? (
          <div>
            <iframe
              title="youtube-trailer"
              width="560"
              height="315"
              src={generateEmbeddedVideoURL(movie.trailer)}
              frameBorder={0}
              allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            ></iframe>
          </div>
        ) : null}
      </div>
      {movie.summary ? (
        <div style={{ marginTop: "1rem" }}>
          <h3>Summary</h3>
          <div>
            <ReactMarkdown>{movie.summary}</ReactMarkdown>
          </div>
        </div>
      ) : null}
      The amount of copies: {movie.amount}
     
      <Authorized
      role="buyer"
      authorized={
        <div>
      <Link           className="btn btn-primary btn-sm rounded-pill"
 to={`/movie/buy/${id}`} >Purchase a DVD</Link>
      </div>
      }
      />
    </div>
  ) : (
    <Loading />
  );
}
