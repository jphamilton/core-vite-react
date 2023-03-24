using Microsoft.AspNetCore.Identity;
using Microsoft.IdentityModel.Tokens;
using System.Globalization;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;

namespace API.Identity;

public class JwtTokenGenerator
{
    private const int ExpirationMinutes = 30;
    
    private readonly JwtSigningKey _jwtSigningKey;

    public JwtTokenGenerator(JwtSigningKey jwtSigningKey)
    {
        _jwtSigningKey = jwtSigningKey;
    }

    public string CreateToken(IdentityUser user)
    {
        var expiration = DateTime.UtcNow.AddMinutes(ExpirationMinutes);

        var token = CreateJwtToken(
            CreateClaims(user),
            CreateSigningCredentials(),
            expiration
        );

        var tokenHandler = new JwtSecurityTokenHandler();

        return tokenHandler.WriteToken(token);
    }

    private JwtSecurityToken CreateJwtToken(List<Claim> claims, SigningCredentials credentials, DateTime expiration)
    {
        return new(
            _jwtSigningKey.ValidIssuer,
            _jwtSigningKey.ValidAudience,
            claims,
            expires: expiration,
            signingCredentials: credentials
        );
    }

    private static List<Claim> CreateClaims(IdentityUser user)
    {
        try
        {
            var claims = new List<Claim>
                {
                    new Claim(JwtRegisteredClaimNames.Sub, "TokenForTheApiWithAuth"),
                    new Claim(JwtRegisteredClaimNames.Jti, Guid.NewGuid().ToString()),
                    new Claim(JwtRegisteredClaimNames.Iat, DateTime.UtcNow.ToString(CultureInfo.InvariantCulture)),
                    new Claim(ClaimTypes.NameIdentifier, user.Id),
                    new Claim(ClaimTypes.Name, user.UserName!),
                    new Claim(ClaimTypes.Email, user.Email!)
                };
            return claims;
        }
        catch (Exception e)
        {
            Console.WriteLine(e);
            throw;
        }
    }

    private SigningCredentials CreateSigningCredentials()
    {
        return new SigningCredentials(
            new SymmetricSecurityKey(_jwtSigningKey.Key),
            SecurityAlgorithms.HmacSha256
        );
    }
}
