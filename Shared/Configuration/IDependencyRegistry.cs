using Microsoft.Extensions.DependencyInjection;

namespace Shared.Configuration;

public interface IDependencyRegistry
{
    void Register(IServiceCollection serviceCollection);
}
