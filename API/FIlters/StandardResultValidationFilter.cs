using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.Filters;
using API.Shared;

namespace API.FIlters;

/// <summary>
/// Validate ModelState and return StandardResult with errors
/// </summary>
public class StandardResultValidationFilter : IActionFilter
{
    public void OnActionExecuted(ActionExecutedContext context)
    {

    }

    public void OnActionExecuting(ActionExecutingContext context)
    {
        if (!context.ModelState.IsValid)
        {
            var errors = context.ModelState.Values
                .SelectMany(e => e.Errors)
                .Select(x => x.ErrorMessage).ToList();

            var result = new StandardResult(errors);
            result.Errors.AddRange(errors);
            context.Result = new BadRequestObjectResult(result);
        }
    }
}
