using projBack.Validations;
using System.ComponentModel.DataAnnotations;

namespace projBack.DTOs
{
    public class GenreCreationDTO
    {
        [StringLength(50)]
        [FirstLetterUppercase]
        public string Name { get; set; } 
    }
}
