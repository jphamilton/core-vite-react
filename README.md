# ASP.NET Core + Vite + React

Not a starter, but more of a "how would I hook all this stuff up?"

Includes:
- ASP.NET Core v7 (JWT Authentication)
- React v18 (Redux, React Router)
- Vite (React, TypeScript + SWC template)
- SignalR


## Notes for me (maybe helpful to you too)

Vite runs on port 3000 and proxies api and web sockets calls to the API on port 7200

Make sure you have a trusted development certificate installed

```
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
