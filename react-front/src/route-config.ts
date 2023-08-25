import CreateActor from "./actors/CreateActors";
import EditActor from "./actors/EditActor";
import IndexActors from "./actors/IndexActors";
import EditUser from "./auth/EditUser";
import IndexUsers from "./auth/IndexUsers";
import Login from "./auth/Login";
import Profile from "./auth/Profile";
import Register from "./auth/Register";
import CreateGenre from "./genres/CreateGenre";
import EditGenre from "./genres/EditGenre";
import IndexGenres from "./genres/IndexGenres";
import CreateMovieTheaters from "./movieTheaters/CreateMovieTheaters";
import EditMovieTheaters from "./movieTheaters/EditMovieTheaters";
import IndexMovieTheater from "./movieTheaters/IndexMovieTheater";
import BuyMovie from "./movies/BuyMovie";
import CreateMovie from "./movies/CreateMovie";
import EditMovie from "./movies/EditMovie";
import FilterMovies from "./movies/FilterMovies";
import LandingPage from "./movies/LandingPage";
import MovieDetails from "./movies/MovieDetails";
import RedirectToLandingPage from "./utils/RedirectToLandingPage";

const routes = [
    {path: '/genres', component: IndexGenres, exact: true, isAdmin: true},
    {path: '/genres/create', component: CreateGenre, isAdmin: true},
    {path: '/genres/edit/:id(\\d+)', component: EditGenre, isAdmin: true},

    {path: '/purchases', component: IndexActors, exact: true, isAdmin: true},
    {path: '/actors/create', component: CreateActor, isAdmin: true},
    {path: '/actors/edit/:id(\\d+)', component: EditActor, isAdmin: true},

    {path: '/movietheaters', component: IndexMovieTheater, exact: true, isAdmin: true},
    {path: '/movietheaters/create', component: CreateMovieTheaters, isAdmin: true},
    {path: '/movietheaters/edit/:id(\\d+)', component: EditMovieTheaters, isAdmin: true},

    {path: '/movies/filter', component: FilterMovies},
    {path: '/movies/create', component: CreateMovie, isSalesperson: true},
    {path: '/movies/edit/:id(\\d+)', component: EditMovie,  isSalesperson: true},
    {path: '/movie/:id(\\d+)', component: MovieDetails},
    {path: '/movie/buy/:id(\\d+)', component: BuyMovie, isBuyer: true},

    {path: '/register', component: Register},
    {path: '/login', component: Login},
    {path: '/users', component: IndexUsers, isAdmin: true},
    {path: '/editProfile/:id(\\d+)', component: EditUser},

    {path: '/', component: LandingPage, exact: true},
    {path: '*', component: RedirectToLandingPage}
    
];

export default routes;