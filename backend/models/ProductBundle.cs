public class ProductBundle
{
    public int Id { get; set; }

    public int BundleId { get; set; }      // matkassen
    public Product Bundle { get; set; } = null!;

    public int ProductId { get; set; }     // innehåll
    public Product Product { get; set; } = null!;

    public int Quantity { get; set; }      // hur mycket som ingår
}