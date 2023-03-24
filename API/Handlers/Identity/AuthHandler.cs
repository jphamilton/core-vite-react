using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using API.Identity;
using API.Requests.Identity;
using API.Shared;

namespace API.Handlers.Identity;

public class AuthHandler : IStandardHandler<AuthRequest, AuthResponse>
{
    private readonly UserManager<IdentityUser> _userManager;
    private readonly UsersContext _context;
    private readonly JwtTokenGenerator _jwtTokenGenerator;

    public AuthHandler(
        UserManager<IdentityUser> userManager,
        UsersContext context,
        JwtTokenGenerator jwtTokenGenerator)
    {
        _userManager = userManager;
        _context = context;
        _jwtTokenGenerator = jwtTokenGenerator;
    }

    public async Task<StandardResult<AuthResponse>> Handle(AuthRequest request, CancellationToken cancellationToken)
    {
        var result = new StandardResult<AuthResponse>();

        var managedUser = await _userManager.FindByEmailAsync(request.Email);

        if (managedUser == null)
        {
            result.Errors.Add("Bad credentials");
            return result;
        }

        var isPasswordValid = await _userManager.CheckPasswordAsync(managedUser, request.Password);

        if (!isPasswordValid)
        {
            result.Errors.Add("Bad credentials");
            return result;
        }

        var user = _context.Users.FirstOrDefault(u => u.Email == request.Email);

        if (user is null)
        {
            throw new UnauthorizedAccessException();
            //return Unauthorized();
        }

        var accessToken = _jwtTokenGenerator.CreateToken(user);

        await _context.SaveChangesAsync();

        result.Result = new AuthResponse
        {
            Username = user.UserName!,
            Email = user.Email!,
            Token = accessToken,
        };

        return result;
    }
}
