using System.ComponentModel.DataAnnotations;
using API.Shared;

namespace API.Requests.Identity;

public class AuthRequest : IStandardRequest<AuthResponse>
{
    [Required]
    public required string Email { get; init; }
    [Required]
    public required string Password { get; init; }
}
