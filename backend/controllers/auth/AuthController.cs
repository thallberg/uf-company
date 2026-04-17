using Microsoft.AspNetCore.Mvc;

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
public async Task<IActionResult> Register(RegisterDto dto)
{
    try
    {
        var result = await _authService.RegisterAsync(dto);
        return Ok(result);
    }
    catch (ApplicationException ex)
    {
        if (ex.Message == "USER_EXISTS")
        {
            return BadRequest(new { message = "User already exists" });
        }

        return BadRequest(new { message = "Invalid request" });
    }
}

    [HttpPost("login")]
    public async Task<IActionResult> Login(LoginDto dto)
    {
        var token = await _authService.LoginAsync(dto);
        return Ok(new { token });
    }
    
}