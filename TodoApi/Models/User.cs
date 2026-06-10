using System.Text.Json.Serialization;
namespace TodoApi.Models
{
    public class User
    {
        public int Id { get; set; }

        public string FullName { get; set; } = string.Empty;

        public string Email { get; set; } = string.Empty;

        public string Password { get; set; } = string.Empty;

        public string Role { get; set; } = "User"; // New column

        // One User -> Many Todos
        [JsonIgnore]
        public ICollection<TodoItem> Todos { get; set; } = new List<TodoItem>();
    }
}