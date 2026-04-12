public class UserService : IUserService
{
    private readonly IUserRepository _userRepo;

    public UserService(IUserRepository userRepo)
    {
        _userRepo = userRepo;
    }

    public async Task<UserProfileDto> GetProfileAsync(int userId)
    {
        var user = await _userRepo.GetByIdAsync(userId);

        if (user == null)
            throw new Exception("User not found");

        return new UserProfileDto
        {
            Email = user.Email,
            FullName = user.FullName,
            Address = user.Address,
            City = user.City,
            PostalCode = user.PostalCode,
            PhoneNumber = user.PhoneNumber
        };
    }

    public async Task UpdateProfileAsync(int userId, UpdateProfileDto dto)
    {
        var user = await _userRepo.GetByIdAsync(userId);

        if (user == null)
            throw new Exception("User not found");

        user.FullName = dto.FullName;
        user.Address = dto.Address;
        user.City = dto.City;
        user.PostalCode = dto.PostalCode;
        user.PhoneNumber = dto.PhoneNumber;

        await _userRepo.UpdateAsync(user);
    }


}