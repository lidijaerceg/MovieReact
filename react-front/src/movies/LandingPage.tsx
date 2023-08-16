import { useEffect, useState } from "react";
import MoviesList from "./MoviesList";
import { landingPageDTO } from "./movies.model";

export default function LandingPage(){
    const [movies, setMovies] = useState<landingPageDTO>({});

    useEffect(() => {
    const timerId = setTimeout(()=>{
      setMovies({
        inTheaters:[{
          id:1,
          title: 'Barbie',
          poster: 'https://deadline.com/wp-content/uploads/2023/04/barbie-BARBIE_VERT_TSR_W_TALENT_2764x4096_DOM_rgb.jpg?w=800'
        },
        { 
          id:2,
          title: 'Oppenheimer',
          poster: 'https://m.media-amazon.com/images/M/MV5BMDBmYTZjNjUtN2M1MS00MTQ2LTk2ODgtNzc2M2QyZGE5NTVjXkEyXkFqcGdeQXVyNzAwMjU2MTY@._V1_.jpg'
        }
      ],
        upcomingReleases:[
          {
            id:3,
            title: 'Avengers: End Game',
            poster: 'https://m.media-amazon.com/images/I/51LNtFacJBL._AC_UF1000,1000_QL80_.jpg'  
          },
          {
            id:4,
            title: 'Ant-Man',
            poster: 'https://i2.wp.com/raisingwhasians.com/wp-content/uploads/2015/06/Ant-Man-Avengers-movie-poster.jpg'  
          },
          ]
      
      })
    },1000);
    return () => clearTimeout(timerId);
    
  });

    return(
        <>
            <h3>In Theaters</h3>
            <MoviesList  movies={movies.inTheaters}/>
            
            <h3>Upcoming Releases</h3>
            <MoviesList movies={movies.upcomingReleases}/>
        </>
    )

}