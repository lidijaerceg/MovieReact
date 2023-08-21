using Microsoft.AspNetCore.Identity;
using Microsoft.Extensions.Options;
using projBack.Entities;

namespace projBack.Filters
{
    public class CustomUserManager : UserManager<UserCredentialsRegistration>
    {
        public CustomUserManager(IUserStore<UserCredentialsRegistration> store, IOptions<IdentityOptions> optionsAccessor,
        IPasswordHasher<UserCredentialsRegistration> passwordHasher, IEnumerable<IUserValidator<UserCredentialsRegistration>> userValidators,
        IEnumerable<IPasswordValidator<UserCredentialsRegistration>> passwordValidators, ILookupNormalizer keyNormalizer,
        IdentityErrorDescriber errors, IServiceProvider services, ILogger<UserManager<UserCredentialsRegistration>> logger)
        : base(store, optionsAccessor, passwordHasher, userValidators, passwordValidators, keyNormalizer, errors, services, logger)
        {
        }
    }
}
