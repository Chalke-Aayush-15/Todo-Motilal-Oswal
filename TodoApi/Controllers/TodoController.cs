using Microsoft.AspNetCore.Mvc;
using TodoApi.Models;
using TodoApi.Services;
using TodoApi.Dtos;

namespace TodoApi.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class TodoController : ControllerBase
    {
        private readonly ITodoService _todoService;

        public TodoController(ITodoService todoService)
        {
            _todoService = todoService;
        }
        
        [HttpGet]
        public async Task<IActionResult> GetAll()
        {
            var todos = await _todoService.GetAllTodos();
            return Ok(todos);
        }

        [HttpGet("{id}")]
        public async Task<IActionResult> GetById(int id)
        {
            var todo = await _todoService.GetTodoById(id);

            if (todo == null)
                return NotFound();

            return Ok(todo);
        }

        [HttpGet("user/{userId}")]
        public async Task<IActionResult> GetByUserId(int userId)
        {
            var todos = await _todoService.GetTodosByUserId(userId);

            return Ok(todos);
        }

        [HttpPost("/api/users/{userId}/todos")]
        public async Task<IActionResult> Create(
            int userId,
            [FromBody] CreateTodoDto dto)
        {
            var result = await _todoService.CreateTodo(userId, dto);

            return Ok(result);
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> Update(int id, TodoItem todo)
        {
            var result = await _todoService.UpdateTodo(id, todo);

            if (result == null)
            {
                return NotFound();
            }

            return Ok("Todo Updated");
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> Delete(int id)
        {
            var deleted = await _todoService.DeleteTodo(id);

            if (!deleted)
                return NotFound();

            return Ok("Todo Deleted");
        }
    }
}