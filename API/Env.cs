using System;

public static class Env 
{
    public static string ConnectionString = Environment.GetEnvironmentVariable("PG_CONN_STRING");
    public static string JwtValidAudience = Environment.GetEnvironmentVariable("JWT_VALID_AUDIENCE");
    public static string JwtValidIssuer = Environment.GetEnvironmentVariable("JWT_VALID_ISSUER");
    public static string JwtSigningKey = Environment.GetEnvironmentVariable("JWT_SIGNING_KEY");
}