namespace Shared.Telemetry;

public class TelemetryData
{
    public DateTime Timestamp { get; set; } = DateTime.UtcNow;
    public string? Sensor { get; set; }
    public double Value { get; set; }   
    public string? Unit { get; set; }
}