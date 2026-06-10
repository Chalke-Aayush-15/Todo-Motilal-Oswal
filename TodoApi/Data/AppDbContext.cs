using Microsoft.EntityFrameworkCore;
using TodoApi.Models; // If User class is in a Models folder

namespace TodoApi.Data
{
    public class AppDbContext : DbContext
    {
        public AppDbContext(DbContextOptions<AppDbContext> options)
            : base(options)
        {
        }

        public DbSet<User> Users { get; set; }

        public DbSet<TodoItem> Todos { get; set; }
    }
}