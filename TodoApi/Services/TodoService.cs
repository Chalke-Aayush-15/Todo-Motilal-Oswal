using Microsoft.EntityFrameworkCore;
using TodoApi.Data;
using TodoApi.Models;
using TodoApi.Dtos;

namespace TodoApi.Services
{
    public class TodoService : ITodoService
    {
        private readonly AppDbContext _context;

        public TodoService(AppDbContext context)
        {
            _context = context;
        }

        public async Task<List<TodoItem>> GetAllTodos()
        {
            return await _context.Todos.ToListAsync();
        }

        public async Task<List<TodoItem>> GetTodosByUserId(int userId)
        {
            return await _context.Todos
                .Where(t => t.UserId == userId)
                .ToListAsync();
        }

        public async Task<TodoItem?> GetTodoById(int id)
        {
            return await _context.Todos.FindAsync(id);
        }

        public async Task<TodoItem> CreateTodo(
            int userId,
            CreateTodoDto dto)
        {
            var user = await _context.Users
                .FindAsync(userId);

            if (user == null)
                throw new Exception("User not found");

            var todo = new TodoItem
            {
                Title = dto.Title,
                Description = dto.Description,
                IsCompleted = dto.IsCompleted,
                UserId = userId
            };

            _context.Todos.Add(todo);

            await _context.SaveChangesAsync();

            return todo;
        }

       public async Task<TodoItem?> UpdateTodo(int id, TodoItem updatedTodo)
        {
            var todo = await _context.Todos.FindAsync(id);

            if (todo == null)
                return null;

            todo.Title = updatedTodo.Title;
            todo.Description = updatedTodo.Description;
            todo.IsCompleted = updatedTodo.IsCompleted;

            await _context.SaveChangesAsync();

            return todo;
        }

        public async Task<bool> DeleteTodo(int id)
        {
            var todo = await _context.Todos.FindAsync(id);

            if (todo == null)
                return false;

            _context.Todos.Remove(todo);
            await _context.SaveChangesAsync();

            return true;
        }
    }
}