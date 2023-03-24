# API and client served from ASP.NET Core
FROM mcr.microsoft.com/dotnet/aspnet:7.0 AS base
WORKDIR /app

FROM mcr.microsoft.com/dotnet/sdk:7.0 AS build-node
RUN bash -E $(curl -fsSL https://deb.nodesource.com/setup_19.x | bash - ); apt install -y nodejs

FROM build-node AS build
WORKDIR /src
COPY ["API/API.csproj", "API/"]
COPY ["Registry/Registry.csproj", "Registry/"]
COPY ["Services/Services.csproj", "Services/"]
COPY ["Shared/Shared.csproj", "Shared/"]
RUN dotnet restore "API/API.csproj"
COPY . .
WORKDIR "/src/API"
RUN dotnet build "API.csproj" -c Release -o /app/build

FROM build AS publish
RUN dotnet publish "API.csproj" -c Release -o /app/publish /p:UseAppHost=false

FROM build-node as frontend
WORKDIR /src
COPY client .
RUN npm ci && npm run build

FROM base AS final
WORKDIR /app
COPY --from=publish /app/publish .
COPY --from=frontend /src/dist wwwroot
EXPOSE 443

# within network, host is service name and internal port is used
ENV PG_CONN_STRING="Host=cvr-db;Port=5432;Database=postgres;Username=admin;Password=admin"
ENV JWT_VALID_AUDIENCE="cvr-audience"
ENV JWT_VALID_ISSUER="cvr-issuer"
ENV JWT_SIGNING_KEY="!*SuperSecretKey*!"

ENTRYPOINT ["dotnet", "API.dll"]
