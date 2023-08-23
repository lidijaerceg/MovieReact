using Microsoft.AspNetCore.Identity;
using projBack.DTOs;
using System.ComponentModel.DataAnnotations;

namespace projBack.Entities
{
    public class PersonalInformation
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public string Lastname { get; set; }
        public string Address { get; set; }
        public DateTime DateOfBirth { get; set; }
        public string Picture { get; set; }
        public string Email { get; set; }
        public string Password { get; set; }
        public string Username { get; set; }
        public string Role { get; set; }

        public string UserId { get; set; }
        public UserCredentials User { get; set; }
    }
}
