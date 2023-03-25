using API.Shared;
using MediatR;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers;

public abstract class StandardController : ControllerBase
{
    private readonly ISender _sender;

    public StandardController(ISender sender)
    {
        _sender = sender;
    }

    protected async Task<IActionResult> Send(IStandardRequest request)
    {
        try
        {
            var response = await _sender.Send(request);
            return Ok(response);
        }
        catch(UnauthorizedAccessException)
        {
            return Unauthorized();
        }
        catch (Exception ex)
        {
            return BadRequest(new StandardResult(ex.Message));
        }
    }

    protected async Task<IActionResult> Send<TResponse>(IStandardRequest<TResponse> request)
        where TResponse : class
    {
        try
        {
            var response = await _sender.Send(request);
            return Ok(response);
        }
        catch (UnauthorizedAccessException)
        {
            return Unauthorized();
        }
        catch (Exception ex)
        {
            return BadRequest(new StandardResult(ex.Message));
        }
    }

}

