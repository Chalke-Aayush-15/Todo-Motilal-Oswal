using TodoApi.DTOs;
using TodoApi.Models;
using TodoApi.Data;

namespace TodoApi.Services
{
    public class AuthService : IAuthService
    {
        private readonly AppDbContext _context;

        public AuthService(AppDbContext context)
        {
            _context = context;
        }

        public User Register(RegisterDto request)
        {
            var user = new User
            {
                FullName = request.FullName,
                Email = request.Email,
                Password = request.Password,
                Role = request.Role // or "User"
            };

            _context.Users.Add(user);
            _context.SaveChanges();

            return user;
        }

        public User? Login(LoginDto request)
        {
            return _context.Users.FirstOrDefault(x =>
                x.Email == request.Email &&
                x.Password == request.Password);
        }
    }
}