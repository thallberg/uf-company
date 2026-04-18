public interface IProductRepository
{
    Task<List<Product>> GetAllAsync();
    Task<Product?> GetByIdAsync(int id);
    Task<Product?> GetByIdForDeleteAsync(int id);
    Task RemoveFromBundles(int productId);

    Task AddAsync(Product product);
    Task UpdateAsync(Product product);
    Task DeleteAsync(Product product);
    Task<List<Product>> GetFilteredAsync(string? type, bool? isLocal, string? search);
    Task<(List<Product>, int totalCount)> GetPagedAsync(
    int page,
    int pageSize,
    string? type,
    bool? isLocal,
    string? search);
    Task AddProductToBundleAsync(ProductBundle bundle);
}