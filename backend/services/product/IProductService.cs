public interface IProductService
{
    Task<List<Product>> GetAllAsync();
    Task<Product?> GetByIdAsync(int id);

    Task<Product> CreateAsync(Product product);
    Task<Product> UpdateAsync(int id, Product updated);
    Task DeleteAsync(int id);
    Task<List<Product>> GetFilteredAsync(string? type, bool? isLocal, string? search);
    Task<PaginationResponse<Product>> GetPagedAsync(
    int page,
    int pageSize,
    string? type,
    bool? isLocal,
    string? search);
    Task AddProductToBundleAsync(ProductBundleDto dto);
}