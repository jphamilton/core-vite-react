namespace API.Requests.Identity;

public record AuthResponse
{
    public required string Username { get; init; }
    public required string Email { get; init; }
    public required string Token { get; init; }
}
