using projBack.Validations;
using System.ComponentModel.DataAnnotations;

namespace projBack.DTOs
{
    public class GenreCreationDTO
    {
        [Required(ErrorMessage = "The field with name {0} is required")]
        [StringLength(50)]
        [FirstLetterUppercase]
        public string Name { get; set; } 
    }
}
