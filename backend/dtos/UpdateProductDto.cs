public class UpdateProductDto
{
    public string? Name { get; set; }
    public string? Description { get; set; }
    public string? LongDescription { get; set; }
    public string? Origin { get; set; }
    public int? MealsCount { get; set; }
    public decimal? Price { get; set; }
    public decimal? SalePrice { get; set; }
    public bool SetSalePrice { get; set; }
    public string? Type { get; set; }
    public bool? IsLocalOnly { get; set; }
    public bool? IsPopular { get; set; }
    public int? Stock { get; set; }
}