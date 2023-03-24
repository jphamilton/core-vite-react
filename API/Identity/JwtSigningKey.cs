using System.Text;

namespace API.Identity;

public class JwtSigningKey
{
    public string ValidIssuer { get; }
    public string ValidAudience { get; }
    public byte[] Key { get; }

    public JwtSigningKey(string issuer, string audience, string jwtSigningKey)
    {
        ValidIssuer = issuer;
        ValidAudience = audience;
        Key = Encoding.UTF8.GetBytes(jwtSigningKey);
    }
}
