using System.ComponentModel.DataAnnotations;

namespace projBack.Entities
{
    public class Movie
    {
        public int Id { get; set; }
        [StringLength(maximumLength:75)]
        public string Title { get; set; }
        public string Summary { get; set; }
        public string Trailer { get; set; }
        public string Poster { get; set; }
        public List<MoviesGenres> MoviesGenres { get; set; }
        public int UserId { get; set; }
        public int Price { get; set; }
        public int Amount { get; set; }
    }
}
