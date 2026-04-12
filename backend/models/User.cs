public class User
{
    public int Id { get; set; }

    public string Email { get; set; } = string.Empty;
    public string PasswordHash { get; set; } = string.Empty;

    public string Role { get; set; } = "Customer"; // "Admin" eller "Customer"

    public DateTime CreatedAt { get; set; } = DateTime.UtcNow;

    public string FullName { get; set; } = string.Empty;
    public string Address { get; set; } = string.Empty;
    public string City { get; set; } = string.Empty;
    public string PostalCode { get; set; } = string.Empty;
    public string PhoneNumber { get; set; } = string.Empty;

    // Navigation
    public List<Order> Orders { get; set; } = new();
}