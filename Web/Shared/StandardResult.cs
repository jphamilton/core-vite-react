namespace Web.Shared
{
    public class StandardResult<T>
    {
        public bool Success { get; set; }
        public T? Result { get; set; }
        public string? Error { get; set; }
    }
}
