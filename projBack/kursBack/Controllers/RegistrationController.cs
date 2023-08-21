using AutoMapper;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.IdentityModel.Tokens;
using projBack.DTOs;
using projBack.Entities;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;

namespace projBack.Controllers
{
    //[ApiController]
    //[Route("api/accounts")]
    public class RegistrationController : ControllerBase
    {
        private readonly UserManager<UserCredentialsRegistration> userManager;
        private readonly IConfiguration configuration;
        private readonly ApplicationDbContext context;
        private readonly IMapper mapper;

        public RegistrationController(UserManager<UserCredentialsRegistration> userManager,
            IConfiguration configuration,
            ApplicationDbContext context,
            IMapper mapper)
        {
            this.userManager = userManager;
            this.configuration = configuration;
            this.context = context;
            this.mapper = mapper;
        }

        [HttpPost("create")]
        public async Task<ActionResult<AuthenticationResponse>> Create(
           [FromBody] UserCredentialsReg userCredentials)
        {
            var user = new UserCredentialsRegistration{ UserName = userCredentials.Username, Email = userCredentials.Email, Name = userCredentials.Name };
            var result = await userManager.CreateAsync(user, userCredentials.Password);

            if (result.Succeeded)
            {
                return await BuildToken(userCredentials);
            }
            else
            {
                return BadRequest(result.Errors);
            }
        }

        private async Task<AuthenticationResponse> BuildToken(UserCredentialsReg userCredentials)
        {
            var claims = new List<Claim>()
            {
                new Claim("email", userCredentials.Email)
            };

            var user = await userManager.FindByNameAsync(userCredentials.Email);
            var claimsDB = await userManager.GetClaimsAsync(user);

            claims.AddRange(claimsDB);

            var key = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(configuration["keyjwt"]));
            var creds = new SigningCredentials(key, SecurityAlgorithms.HmacSha256);

            var expiration = DateTime.UtcNow.AddYears(1);

            var token = new JwtSecurityToken(issuer: null, audience: null, claims: claims,
                expires: expiration, signingCredentials: creds);

            return new AuthenticationResponse()
            {
                Token = new JwtSecurityTokenHandler().WriteToken(token),
                Expiration = expiration
            };
        }
    }
}
