namespace API.Shared;

public class Void {

}

public class StandardResult<T>  where T : class
{
    public bool Success { get; set; }
    public List<string> Errors { get; set; } = new();
    public T? Result { get; set; }

    public StandardResult(bool success) {
        Success = success;
    }

    public StandardResult(T result) {
        Result = result;
        Success = true;
    }

    public StandardResult(IList<string> errors) {
        Errors.AddRange(errors);
        Success = false;
    }
   
    public StandardResult(string error) {
        Errors.Add(error);
        Success = false;
    }
}

public class StandardResult : StandardResult<Void> {
    
    public StandardResult(bool success): base(success) { }
    public StandardResult(IList<string> errors): base(errors) { }
    public StandardResult(string error): base(error) { }
}