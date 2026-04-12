public class ProductService : IProductService
{
    private readonly IProductRepository _repo;

    public ProductService(IProductRepository repo)
    {
        _repo = repo;
    }

    public async Task<List<Product>> GetAllAsync()
    {
        return await _repo.GetAllAsync();
    }

    public async Task<Product?> GetByIdAsync(int id)
    {
        return await _repo.GetByIdAsync(id);
    }

    public async Task CreateAsync(Product product)
    {
        await _repo.AddAsync(product);
    }

    public async Task UpdateAsync(int id, Product updated)
    {
        var existing = await _repo.GetByIdAsync(id);
        if (existing == null)
            throw new Exception("Product not found");

        existing.Name = updated.Name;
        existing.Description = updated.Description;
        existing.Price = updated.Price;
        existing.Stock = updated.Stock;
        existing.Type = updated.Type;
        existing.IsLocalOnly = updated.IsLocalOnly;

        await _repo.UpdateAsync(existing);
    }

    public async Task DeleteAsync(int id)
    {
        var product = await _repo.GetByIdAsync(id);
        if (product == null)
            throw new Exception("Product not found");

        await _repo.DeleteAsync(product);
    }

    public async Task<List<Product>> GetFilteredAsync(string? type, bool? isLocal, string? search)
    {
        return await _repo.GetFilteredAsync(type, isLocal, search);
    }

    public async Task<PaginationResponse<Product>> GetPagedAsync(
        int page,
        int pageSize,
        string? type,
        bool? isLocal,
        string? search)
    {
        var (products, totalCount) =
            await _repo.GetPagedAsync(page, pageSize, type, isLocal, search);

        return new PaginationResponse<Product>
        {
            Page = page,
            PageSize = pageSize,
            TotalCount = totalCount,
            Data = products
        };
    }
}