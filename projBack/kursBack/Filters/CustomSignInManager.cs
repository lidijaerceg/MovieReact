using Microsoft.AspNetCore.Authentication;
using Microsoft.AspNetCore.Identity;
using Microsoft.Extensions.Options;
using projBack.Entities;

namespace projBack.Filters
{
    public class CustomSignInManager : SignInManager<UserCredentialsRegistration>
    {
        public CustomSignInManager(UserManager<UserCredentialsRegistration> userManager, IHttpContextAccessor contextAccessor,
        IUserClaimsPrincipalFactory<UserCredentialsRegistration> claimsFactory, IOptions<IdentityOptions> optionsAccessor,
        ILogger<SignInManager<UserCredentialsRegistration>> logger, IAuthenticationSchemeProvider schemes,
        IUserConfirmation<UserCredentialsRegistration> confirmation)
        : base(userManager, contextAccessor, claimsFactory, optionsAccessor, logger, schemes, confirmation)
        {
        }
    }
}
