using TodoApi.DTOs;
using TodoApi.Models;

namespace TodoApi.Services
{
    public interface IAuthService
    {
        User Register(RegisterDto request);

        User? Login(LoginDto request);
    }
}