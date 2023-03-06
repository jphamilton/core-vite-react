using Web.Shared;
using MediatR;
using Microsoft.AspNetCore.Mvc;

namespace Web.Controllers
{
    public class StandardController : ControllerBase
    {
        private readonly IMediator _mediator;

        public StandardController(IMediator mediator)
        {
            _mediator = mediator;
        }

        protected async Task<StandardResult<T>> Send<T>(IRequest<T> request)
        {
            try
            {
                return await StandardResult(() =>
                {
                    return _mediator.Send(request);
                });
            }
            catch (Exception ex)
            {

                return new StandardResult<T>
                {
                    Success = false,
                    Error = ex.Message,
                    Result = default
                };
            }
        }

        protected async Task<StandardResult<T>> StandardResult<T>(Func<Task<T>> func)
        {
            try
            {
                var result = await func();

                return new StandardResult<T>
                {
                    Result = result,
                    Success = true
                };
            }
            catch (Exception ex)
            {
                return new StandardResult<T>
                {
                    Error = ex.Message,
                    Success = false
                };
            }
        }
    }
}
