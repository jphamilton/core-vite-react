# ASP.NET Core + Vite + React

This is just a starter, not an opinion. This should at least give you an idea about how to set things up.

Includes:
- ASP.NET Core v7 (+MediatR)
- React v18 (+React Router)
- Vite (TypeScript + SWC template)
- SignalR


## Notes (maybe helpful, maybe not)

Vite runs on port 3000 and proxies api and web sockets calls to the app on port 7200

Make sure you have development certificate

```
dotnet dev-certs https

dotnet dev-certs https --trust
```

### Docker
Running the app from container should be as easy as
```
docker compose up -d
```

...but this runs in development mode. I don't have a production configuration yet.

### IIS

This is the way I do it, but there's probably a better way. I like to do everything by hand at first.

From <code>\Web</code>

```
dotnet publish -c Release
```

Copy the contents from <code>\Web\bin\Release\net7.0\publish</code> to wherever your web site will run.

In IIS, create an App Pool called "Unmanaged" and make sure .NET CLR version is set to "No Managed Code". 
You may or may not have to switch the App Pool identity from <code>ApplicationPoolIdentity</code> 
to <code>NetworkService</code>.

When you create your web site make sure to select the <code>Unmanaged</code> App Pool.

After you know everything is working, you can create a <code>Web Server (IIS)</code> publish profile.