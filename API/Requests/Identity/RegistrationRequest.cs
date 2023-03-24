using MediatR;
using System.ComponentModel.DataAnnotations;
using API.Shared;

namespace API.Requests.Identity;

public class RegistrationRequest : IStandardRequest
{
    [Required]
    public string Email { get; set; } = null!;
    [Required]
    public string UserName { get; set; } = null!;
    [Required]
    public string Password { get; set; } = null!;
}

