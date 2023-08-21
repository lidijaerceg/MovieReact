using Microsoft.AspNetCore.Identity;
using System.ComponentModel.DataAnnotations;

namespace projBack.Entities
{
    public class UserCredentialsRegistration : IdentityUser
    {
        public string Name { get; set; }
        public string Lastname { get; set; }
        public string Address { get; set; }
        public DateTime DateOfBirth { get; set; }
        public string Picture { get; set; }
    }
}
