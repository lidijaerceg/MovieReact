using System.ComponentModel.DataAnnotations;

namespace projBack.DTOs
{
    public class UserCredentialsReg
    {
        [Required]
        [EmailAddress]
        public string Email { get; set; }
        [Required]
        public string Password { get; set; }
        public string Username { get; set; }
        public string Name { get; set; }
        public string Lastname { get; set; }
        public string Address { get; set; }
        public DateTime DateOfBirth { get; set; }
        public IFormFile Picture { get; set; }
        public int UserId { get; set; }

    }
}
