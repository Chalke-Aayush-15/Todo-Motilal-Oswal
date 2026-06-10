using System.Text.Json.Serialization;

namespace TodoApi.Models
{
    public class TodoItem
    {
        public int Id { get; set; }

        public string Title { get; set; } = string.Empty;

        public bool IsCompleted { get; set; }

        public string Description { get; set; } = string.Empty;

        // Foreign Key
        public int UserId { get; set; }

        // Navigation Property
        [JsonIgnore]
        public User? User { get; set; }
    }
}