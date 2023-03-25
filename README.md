# ASP.NET Core + Vite + React

Not a starter, just an exploration into hooking these things up, playing with features, syntax and semantics. 

Includes:
- ASP.NET Core v7 (JWT Authentication)
- React v18 (Redux, React Router)
- Vite (React, TypeScript + SWC template)
- SignalR (with secure web sockets)


## Notes just for me

Vite runs on port 3000 and proxies api and web sockets calls to the API on port 7200

### Trusted development certificates
See [Developing ASP.NET Core Applications with Docker over HTTPS](https://github.com/dotnet/dotnet-docker/blob/main/samples/run-aspnetcore-https-development.md)
```
// Windows
dotnet dev-certs https

dotnet dev-certs https --trust
```

### Docker 
 This will spin up a container and seed the database with the required tables
for identity management.
```
docker compose -f docker-compose.postgres.yml up -d
```

pgAdmin will be available at <code>http://localhost:7433</code>. To add a new server, Host must match the service name. In this case, <code>cvr-postgres</code>. However, port should be the internal port <code>5432</code>

To just run the whole thing from a container (in development mode)
```
docker compose up -d
```
