using API.Extensions;
using API.FIlters;
using API.Hubs;
using API.Identity;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using Microsoft.IdentityModel.Tokens;
using Microsoft.OpenApi.Models;
using Registry;

var builder = WebApplication.CreateBuilder(args);

var jwtSigningKey = new JwtSigningKey(
    Env.JwtValidIssuer,
    Env.JwtValidAudience,
    Env.JwtSigningKey
);

builder.Services.AddDbContext<UsersContext>(options => {
    options.UseNpgsql(Environment.GetEnvironmentVariable("PG_CONN_STRING"));
});

builder.Services.AddAuthentication(JwtBearerDefaults.AuthenticationScheme)
    .AddJwtBearer(options =>
    {
        options.TokenValidationParameters = new TokenValidationParameters()
        {
            ClockSkew = TimeSpan.Zero,
            ValidateIssuer = true,
            ValidateAudience = true,
            ValidateLifetime = true,
            ValidateIssuerSigningKey = true,
            ValidIssuer = jwtSigningKey.ValidIssuer,
            ValidAudience = jwtSigningKey.ValidAudience,
            IssuerSigningKey = new SymmetricSecurityKey(jwtSigningKey.Key)
        };

        options.Events = new JwtBearerEvents
        {
            OnMessageReceived = context =>
            {
                var accessToken = context.Request.Query["access_token"];

                var path = context.HttpContext.Request.Path;
                if (!string.IsNullOrEmpty(accessToken) &&
                    path.StartsWithSegments("/signalr"))
                {
                    context.Token = accessToken;
                }

                return Task.CompletedTask;
            }
        };
    });

builder.Services
    .AddIdentityCore<IdentityUser>(options =>
    {
        options.SignIn.RequireConfirmedAccount = false;
        options.User.RequireUniqueEmail = true;
        options.Password.RequireDigit = true;
        options.Password.RequiredLength = 8;
        options.Password.RequireNonAlphanumeric = true;
        options.Password.RequireUppercase = true;
        options.Password.RequireLowercase = true;
    })
    .AddEntityFrameworkStores<UsersContext>();

builder.Services.AddSignalR(hubOptions =>
{
    hubOptions.KeepAliveInterval = TimeSpan.FromSeconds(15);
    hubOptions.HandshakeTimeout = TimeSpan.FromSeconds(15);
    hubOptions.EnableDetailedErrors = true;
});

builder.Services.AddControllers(config =>
{
    // validate model state and return errors in a standard API response
    config.Filters.Add(new StandardResultValidationFilter());
})
.ConfigureApiBehaviorOptions(options =>
{
    options.SuppressModelStateInvalidFilter = true;
});

builder.Services.AddEndpointsApiExplorer();

builder.Services.AddSwaggerGen(option =>
{
    option.SwaggerDoc("v1", new OpenApiInfo { Title = "Core-Vite-React", Version = "v1" });
    
    option.AddSecurityDefinition("Bearer", new OpenApiSecurityScheme
    {
        In = ParameterLocation.Header,
        Description = "Please enter a valid token",
        Name = "Authorization",
        Type = SecuritySchemeType.Http,
        BearerFormat = "JWT",
        Scheme = "Bearer"
    });

    option.AddSecurityRequirement(new OpenApiSecurityRequirement
    {
        {
            new OpenApiSecurityScheme
            {
                Reference = new OpenApiReference
                {
                    Type=ReferenceType.SecurityScheme,
                    Id="Bearer"
                }
            },
            new string[]{}
        }
    });
});

builder.Services.AddMediatR(cfg => cfg.RegisterServicesFromAssemblyContaining<Program>());

// configure dependency inject using our registry
builder.Services.AddDependenciesFromRegistry<DependencyRegistry>();
// add a few local dependencies
builder.Services.AddSingleton<JwtSigningKey>((_) => {
    return new JwtSigningKey(
        Env.JwtValidIssuer,
        Env.JwtValidAudience,
        Env.JwtSigningKey
    );
});
builder.Services.AddScoped<JwtTokenGenerator>();

var app = builder.Build();

if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}
else
{
    app.UseHsts();
}

app.UseHttpsRedirection();
app.UseStaticFiles();

app.UseAuthentication();
app.UseAuthorization();

app.MapHub<TelemetryHub>("/signalr/telemetry");

app.MapControllers();
app.MapFallbackToFile("index.html");

app.Run();
