namespace API.Shared;

/// <summary>
/// Standard response returned by the API. I am sure there are better
/// standards but this is the standard here.
/// </summary>
/// <typeparam name="T">Result payload</typeparam>
public class StandardResult
{
    public bool Success { get; init; }
    public List<string> Errors { get; init; } = new();

    public StandardResult()
    {
    }

    public StandardResult(bool success)
    {
        Success = success;
    }

    public StandardResult(Exception ex)
    {
        Success = false;
        Errors.Add(ex.Message);
    }
}


public class StandardResult<T> : StandardResult where T : class
{
    public T Result { get; set; }

    public StandardResult(Exception ex)
    {
        Errors.Add(ex.Message);
        Success = false;
        Result = default;
    }

    public StandardResult()
    {

    }
    
    public StandardResult(T result)
    {
        Success = true;
        Result = result;
    }

    public StandardResult(bool success)
    {
        Success = success;
    }
}
