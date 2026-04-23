public class Product
{
    public int Id { get; set; }

    public string Name { get; set; } = string.Empty;
    public string Description { get; set; } = string.Empty;
    public string? LongDescription { get; set; }

    public string? ImageUrl { get; set; }

    public string? Origin { get; set; }

    public int MealsCount { get; set; }

    public decimal Price { get; set; }
    public decimal? SalePrice { get; set; }

    public string Type { get; set; } = string.Empty;
    // "Matkasse", "Bakpaket"

    public bool IsLocalOnly { get; set; } // lokalproducerat

      public bool IsPopular { get; set; } 

    public int Stock { get; set; }

    public DateTime CreatedAt { get; set; } = DateTime.UtcNow;

    // Navigation
    public List<ProductBundle> BundleItems { get; set; } = new();
}