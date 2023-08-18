using projBack.Validations;
using System.ComponentModel.DataAnnotations;

namespace projBack.Entities
{
    public class Genre
    {
        public int Id { get; set; }
        [StringLength(50)]
        [FirstLetterUppercase]
        public string Name { get; set; }

    }
}
