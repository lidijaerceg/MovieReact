using System.ComponentModel.DataAnnotations;

namespace projBack.DTOs
{
    public class UserCredentials
    {
        [Required]
        [EmailAddress]
        public string Email { get; set; }
        [Required]
        public string Password { get; set; }
        public string Username { get; set; }
        public string UserId { get; set; }
    }
}
