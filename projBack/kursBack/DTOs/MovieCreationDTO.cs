using Microsoft.AspNetCore.Mvc;
using projBack.Helpers;

namespace projBack.DTOs
{
    public class MovieCreationDTO
    {
        public string Title { get; set; }
        public string Summary { get; set; }
        public string Trailer { get; set; }
        public IFormFile Poster { get; set; }

        [ModelBinder(BinderType = typeof(TypeBinder<List<int>>))]
        public List<int> GenresIds { get; set; }
        public string UserId { get; set; }
        public int Price { get; set; }
        public int Amount { get; set; }
    }
}
