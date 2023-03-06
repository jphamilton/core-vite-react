FROM mcr.microsoft.com/dotnet/aspnet:7.0 AS base
WORKDIR /app
EXPOSE 443

FROM mcr.microsoft.com/dotnet/sdk:7.0 AS build-with-spa
RUN bash -E $(curl -fsSL https://deb.nodesource.com/setup_19.x | bash - ); apt install -y nodejs

FROM build-with-spa as build
WORKDIR /src
COPY ["Web.csproj", "."]
RUN dotnet restore "./Web.csproj"
COPY . .
WORKDIR "/src/."
RUN dotnet build "Web.csproj" -c Release -o /app/build

FROM build AS publish
RUN dotnet publish "Web.csproj" -c Release -o /app/publish /p:UseAppHost=false

FROM base AS final
WORKDIR /app
COPY --from=publish /app/publish .
ENTRYPOINT ["dotnet", "Web.dll"]