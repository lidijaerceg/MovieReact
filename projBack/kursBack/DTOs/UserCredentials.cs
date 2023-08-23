using projBack.Entities;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace projBack.DTOs
{
    public class UserCredentials
    {
        //[Required]
        [EmailAddress]
        public string Email { get; set; }
        //[Required]
        public string Password { get; set; }
        public string Username { get; set; }
        public string Id { get; set; }
        public string Name { get; set; }
        public string Lastname { get; set; }
        public string Address { get; set; }
        [NotMapped]
        public IFormFile Picture { get; set; }
        public string PictureURL { get; set; }
        public string Role { get; set; }


        public DateTime DateOfBirth { get; set; }
        [NotMapped]
        PersonalInformation PersonalInformation { get; set; }
    }
}
