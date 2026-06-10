using TodoApi.Models;
using TodoApi.Dtos;

namespace TodoApi.Services
{
    public interface ITodoService
    {
        Task<List<TodoItem>> GetAllTodos();

        Task<List<TodoItem>> GetTodosByUserId(int userId);

        Task<TodoItem?> GetTodoById(int id);

        Task<TodoItem> CreateTodo(int userId, CreateTodoDto dto);

        Task<TodoItem?> UpdateTodo(int id, TodoItem updatedTodo);

        Task<bool> DeleteTodo(int id);
    }
}