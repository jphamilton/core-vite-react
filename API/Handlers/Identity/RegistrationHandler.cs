using Microsoft.AspNetCore.Identity;
using API.Requests.Identity;
using API.Shared;

namespace API.Handlers.Identity;

public class RegistrationHandler : IStandardHandler<RegistrationRequest>
{
    private readonly UserManager<IdentityUser> _userManager;

    public RegistrationHandler(UserManager<IdentityUser> userManager)
    {
        _userManager = userManager;
    }

    public async Task<StandardResult> Handle(RegistrationRequest request, CancellationToken cancellationToken)
    {
        var result = await _userManager.CreateAsync(
            new IdentityUser
            {
                UserName = request.UserName,
                Email = request.Email
            },
            request.Password
        );

        var response = new StandardResult(result.Succeeded);
        
        if (!result.Succeeded)
        {
            foreach (var error in result.Errors)
            {
                response.Errors.Add(error.Description);
            }
        }

        return response;
    }

}
