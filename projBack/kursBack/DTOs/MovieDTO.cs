using System.ComponentModel.DataAnnotations;

namespace projBack.DTOs
{
    public class MovieDTO
    {
        public int Id { get; set; }
        public string Title { get; set; }
        public string Summary { get; set; }
        public string Trailer { get; set; }
        public string Poster { get; set; }

        public List<GenreDTO> Genres { get; set; }
        public string UserId { get; set; }
        public int Price { get; set; }
        public int Amount { get; set; }
    }
}
