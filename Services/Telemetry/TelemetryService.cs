using Shared.Telemetry;

namespace Services.Telemetry;

// very fake and very primitive

public class TelemetryService : ITelemetryService
{
    private class Tag
    {
        public string? Name { get; set;}
        public string? Unit { get; set;}
    }

    private static readonly List<Tag> Tags = new()
    {
        new Tag { Name = "Temperature", Unit = "F" },
        new Tag { Name = "Pressure", Unit = "psi" },
        new Tag { Name = "Current", Unit = "A" },
        new Tag { Name = "Voltage", Unit = "V" },
        new Tag { Name = "Frequency", Unit = "Hz" },
    };

    public Task<IEnumerable<TelemetryData>> GetLatestValues()
    {
        var result = Tags.Select(t => new TelemetryData
        {
            Timestamp = DateTime.UtcNow.AddSeconds(Random.Shared.Next(-10, 0)),
            Sensor = t.Name,
            Value = Math.Round(Random.Shared.NextDouble() * Random.Shared.Next(100, 200), 2),
            Unit = t.Unit
        });

        return Task.FromResult(result);
    }
}
