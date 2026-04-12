public class Product
{
    public int Id { get; set; }

    public string Name { get; set; } = string.Empty;
    public string Description { get; set; } = string.Empty;

    public decimal Price { get; set; }

    public string Type { get; set; } = string.Empty; 
    // "Matkasse", "Bakpaket"

    public bool IsLocalOnly { get; set; } // lokalproducerat

    public int Stock { get; set; }

    public DateTime CreatedAt { get; set; } = DateTime.UtcNow;

    // Navigation
    public List<OrderItem> OrderItems { get; set; } = new();
}