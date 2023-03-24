using MediatR;
using Microsoft.AspNetCore.Mvc;
using API.Requests.Identity;

namespace API.Controllers;

[ApiController]
[Route("[controller]")]
public class AuthController : StandardController
{

    public AuthController(ISender sender) : base(sender)
    {
    }

    [HttpPost]
    [Route("register")]
    public async Task<IActionResult> Register(RegistrationRequest request)
    {
        return await Send(request);
    }

    [HttpPost]
    [Route("login")]
    public async Task<IActionResult> Authenticate([FromBody] AuthRequest request)
    {
        return await Send(request);
    }
}
