using Shared.Configuration;

namespace API.Extensions;

public static class ServiceCollectionExtensions
{
    public static void AddDependenciesFromRegistry<T>(this IServiceCollection services) where T: IDependencyRegistry
    {
        if (Activator.CreateInstance(typeof(T)) is IDependencyRegistry registry)
        {
            registry.Register(services);
            return;
        }

        throw new Exception("Unable to register dependencies. Registry not found.");
    }
}
