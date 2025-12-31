using MongoDB.Bson;
using MongoDB.Bson.Serialization.Attributes;
using System.Text.Json.Serialization;

namespace AuthApi.Models;

public enum Status
{
    BACKLOG,
    PENDING,
    IN_PROGRESS,
    COMPLETED
}

public class Todo
{
    [BsonId]
    [BsonRepresentation(BsonType.ObjectId)]
    [JsonPropertyName("_id")]
    public string? Id { get; set; }

    [BsonElement("title")]
    public required string Title { get; set; }

    [BsonElement("description")]
    public string? Description { get; set; }
    
    [BsonElement("status")]
    [BsonRepresentation(BsonType.String)]
    public Status Status { get; set; } = Status.BACKLOG;
    
    [BsonElement("duration")]
    public string? Duration { get; set; }

    [BsonElement("due_date")]
    public DateTime? DueDate { get; set; }
    
    [BsonElement("created_at")]
    public DateTime CreatedAt { get; set; } = DateTime.UtcNow;

    [BsonElement("updated_at")]
    public DateTime UpdatedAt { get; set; } = DateTime.UtcNow;
    
    [BsonElement("user")]
    public TodoUserLink? UserLink { get; set; }

    [BsonIgnore]
    public string UserId 
    { 
        get => UserLink?.Id.ToString() ?? string.Empty;
        set 
        {
            if (string.IsNullOrEmpty(value)) throw new ArgumentException("UserId cannot be null or empty", nameof(value));
#pragma warning disable CS8602
            UserLink = new TodoUserLink { Id = ObjectId.Parse(value) };
        }
    }
}
