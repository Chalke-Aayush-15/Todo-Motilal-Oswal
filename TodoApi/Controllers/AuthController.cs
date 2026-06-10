using Microsoft.AspNetCore.Mvc;
using TodoApi.DTOs;
using TodoApi.Services;

namespace TodoApi.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class AuthController : ControllerBase
    {
        private readonly IAuthService _authService;

        public AuthController(IAuthService authService)
        {
            _authService = authService;
        }

        [HttpPost("register")]
        public IActionResult Register(RegisterDto request)
        {
            var user = _authService.Register(request);

            return Ok(user);
        }

        [HttpPost("login")]
        public IActionResult Login(LoginDto request)
        {
            var user = _authService.Login(request);

            if (user == null)
            {
                return Unauthorized("Invalid Email or Password");
            }

            return Ok(user);
        }
    }
}