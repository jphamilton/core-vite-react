using Shared.Telemetry;

namespace Services.Telemetry
{
    public class TelemetryService : ITelemetryService
    {
        private static readonly string[] Summaries = new[]
        {
            "Freezing", "Bracing", "Chilly", "Cool", "Mild", "Warm", "Balmy", "Hot", "Sweltering", "Scorching"
        };

        public Task<IEnumerable<TelemetryData>> GetLatestValues()
        {
            var result = Enumerable.Range(1, 10).Select(index => new TelemetryData
            {
                Date = DateTime.UtcNow.AddSeconds(Random.Shared.Next(-10, 0)),
                TemperatureC = Random.Shared.Next(-20, 55),
                Summary = Summaries[Random.Shared.Next(Summaries.Length)]
            }).OrderBy(t => t.Date).AsEnumerable();

            return Task.FromResult(result);
        }
    }
}
