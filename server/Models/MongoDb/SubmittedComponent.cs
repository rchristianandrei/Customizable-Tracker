namespace server.Models.MongoDb;

public class SubmittedComponent
{
    public string Id { get; set; } = null!;
    public string Label { get; set; } = null!;
    public string EncodedData { get; set; } = null!;
}
