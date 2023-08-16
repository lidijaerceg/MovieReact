import CreateActor from "./actors/CreateActors";
import EditActor from "./actors/EditActor";
import IndexActors from "./actors/IndexActors";
import CreateGenre from "./genres/CreateGenre";
import EditGenre from "./genres/EditGenre";
import IndexGenres from "./genres/IndexGenres";
import CreateMovieTheaters from "./movieTheaters/CreateMovieTheaters";
import EditMovieTheaters from "./movieTheaters/EditMovieTheaters";
import IndexMovieTheater from "./movieTheaters/IndexMovieTheater";
import CreateMovie from "./movies/CreateMovie";
import EditMovie from "./movies/EditMovie";
import FilterMovies from "./movies/FilterMovies";
import LandingPage from "./movies/LandingPage";
import RedirectToLandingPage from "./utils/RedirectToLandingPage";

const routes = [
    {path: '/genres', component: IndexGenres, exact: true},
    {path: '/genres/create', component: CreateGenre},
    {path: '/genres/edit/:id(\\d+)', component: EditGenre},

    {path: '/actors', component: IndexActors, exact: true},
    {path: '/actors/create', component: CreateActor},
    {path: '/actors/edit/:id(\\d+)', component: EditActor},

    {path: '/movietheaters', component: IndexMovieTheater, exact: true},
    {path: '/movietheaters/create', component: CreateMovieTheaters},
    {path: '/movietheaters/edit/:id(\\d+)', component: EditMovieTheaters},

    {path: '/movies/filter', component: FilterMovies},
    {path: '/movies/create', component: CreateMovie},
    {path: '/movies/edit/:id(\\d+)', component: EditMovie},

    {path: '/', component: LandingPage, exact: true},
    {path: '*', component: RedirectToLandingPage}
    
];

export default routes;