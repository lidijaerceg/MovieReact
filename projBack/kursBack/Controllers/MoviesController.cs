using AutoMapper;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using projBack.DTOs;
using projBack.Entities;
using projBack.Helpers;
using System.Security.Claims;

namespace projBack.Controllers
{
    [Route("api/movies")]
    [ApiController]
    [Authorize(AuthenticationSchemes = JwtBearerDefaults.AuthenticationScheme, Policy = "IsSalesperson")]
    public class MoviesController : ControllerBase
    {
        private readonly ApplicationDbContext context;
        private readonly IMapper mapper;
        private readonly IFileStorageService fileStorageService;
        private string container = "movies";

        public MoviesController(ApplicationDbContext context, IMapper mapper,
             IFileStorageService fileStorageService)
        {
            this.context = context;
            this.mapper = mapper;
            this.fileStorageService = fileStorageService;

        }

        [HttpGet]
        [AllowAnonymous]
        public async Task<ActionResult<LandingPageDTO>> Get()
        {
            var top = 6;
            var today = DateTime.Today;

            var movie = await context.Movies
                .OrderBy(x => x.Title)
                .Take(top)
                .ToListAsync();

            var landingPageDTO = new LandingPageDTO();
            landingPageDTO.Movie = mapper.Map<List<MovieDTO>>(movie);

            return landingPageDTO;
        }

        [HttpGet("{id:int}")]
        [AllowAnonymous]
        public async Task<ActionResult<MovieDTO>> Get(int id)
        {
            var movie = await context.Movies
               .Include(x => x.MoviesGenres).ThenInclude(x => x.Genre)
               .FirstOrDefaultAsync(x => x.Id == id);

            if (movie == null)
            {
                return NotFound();
            }

            var dto = mapper.Map<MovieDTO>(movie);
            return dto;
        }

        [HttpGet("filter")]
        [AllowAnonymous]
        public async Task<ActionResult<List<MovieDTO>>> Filter([FromQuery] FilterMoviesDTO filterMoviesDTO)
        {
            var moviesQueryable = context.Movies.AsQueryable();

            if (!string.IsNullOrEmpty(filterMoviesDTO.Title))
            {
                moviesQueryable = moviesQueryable.Where(x => x.Title.Contains(filterMoviesDTO.Title));
            }


            if (filterMoviesDTO.GenreId != 0)
            {
                moviesQueryable = moviesQueryable
                    .Where(x => x.MoviesGenres.Select(y => y.GenreId)
                    .Contains(filterMoviesDTO.GenreId));
            }

            await HttpContext.InsertarametersPaginationInHeader(moviesQueryable);
            var movies = await moviesQueryable.OrderBy(x => x.Title).Paginate(filterMoviesDTO.PaginationDTO)
                .ToListAsync();
            return mapper.Map<List<MovieDTO>>(movies);
        }



        [HttpGet("PostGet")]
        public async Task<ActionResult<MoviePostGetDTO>> PostGet()
        {
            var genres = await context.Genres.ToListAsync();

            var genresDTO = mapper.Map<List<GenreDTO>>(genres);

            return new MoviePostGetDTO() { Genres = genresDTO };
        }

        [HttpPost]
        public async Task<ActionResult<int>> Post([FromForm] MovieCreationDTO movieCreationDTO)
        {

            var movie = mapper.Map<Movie>(movieCreationDTO);

            //var userId = User.FindFirstValue(ClaimTypes.NameIdentifier);
            //movie.UserId = userId;

            

            if (movieCreationDTO.Poster != null)
            {
                movie.Poster = await fileStorageService.SaveFile(container, movieCreationDTO.Poster);
            }

            context.Add(movie);
            await context.SaveChangesAsync();
            return movie.Id;
        }

        [HttpGet("putget/{id:int}")]
        public async Task<ActionResult<MoviePutGetDTO>> PutGet(int id)
        {
            var movieActionResult = await Get(id);
            if(movieActionResult.Result is NotFoundResult)
            {
                return NotFound();
            }

            var movie = movieActionResult.Value;

            var genresSelectedIds = movie.Genres.Select(x => x.Id).ToList();
            var nonSelectedGenres = await context.Genres.Where(x => !genresSelectedIds.Contains(x.Id))
                .ToListAsync();

            var nonSelectedGenresDTOs = mapper.Map<List<GenreDTO>>(nonSelectedGenres);

            var response = new MoviePutGetDTO();
            response.Movie = movie;
            response.SelectedGenres = movie.Genres;
            response.NonSelectedGenres = nonSelectedGenresDTOs;

            return response;
        }

        [HttpPut("{id:int}")]
        public async Task<ActionResult> Put(int id, [FromForm] MovieCreationDTO movieCreationDTO)
        {
            var movie = await context.Movies.Include(x => x.MoviesGenres)
                .FirstOrDefaultAsync(x => x.Id == id);

            if(movie == null)
            {
                return NotFound();
            }

            //var userId = User.FindFirstValue(ClaimTypes.NameIdentifier);
            //if (movie.UserId != userId)
            //{
            //    return Forbid(); // Return a 403 Forbidden response if not the owner
            //}

            movie = mapper.Map(movieCreationDTO, movie);

            if(movieCreationDTO.Poster != null)
            {
                movie.Poster = await fileStorageService.EditFile(container, movieCreationDTO.Poster,
                    movie.Poster);
            }

            await context.SaveChangesAsync();
            return NoContent();
        }


        [HttpDelete("{id:int}")]
        public async Task<ActionResult> Delte(int id)
        {

            var movie = await context.Movies.FirstOrDefaultAsync(x => x.Id == id);
            
            if(movie == null)
            {
                return NotFound();
            }

            //var userId = User.FindFirstValue(ClaimTypes.NameIdentifier);
            //if(movie.UserId != userId)
            //{
            //    return Forbid();
            //}

            context.Remove(movie);
            await context.SaveChangesAsync();
            await fileStorageService.DeleteFile(movie.Poster, container);
            return NoContent();
        }

    }
}
