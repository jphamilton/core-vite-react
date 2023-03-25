using MediatR;

namespace API.Shared;

public interface IStandardRequest : IRequest<StandardResult>
{

}

public interface IStandardHandler<T> : IRequestHandler<T,StandardResult>
    where T : class, IRequest<StandardResult>
{

}


public interface IStandardRequest<T> : IRequest<StandardResult<T>>
    where T: class
{

}

public interface IStandardHandler<T, R> : IRequestHandler<T, StandardResult<R>>
    where T : class, IRequest<StandardResult<R>>
    where R : class
{

}


