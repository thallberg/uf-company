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

    public async Task<Product> CreateAsync(Product product)
    {
        await _repo.AddAsync(product);
        return product; // 🔥 viktigt
    }

    public async Task<Product> UpdateAsync(int id, UpdateProductDto dto)
    {
        var existing = await _repo.GetByIdAsync(id);

        if (existing == null)
            throw new Exception("Product not found");

        // Uppdatera bara det som skickas in

        if (dto.Name != null)
            existing.Name = dto.Name;

        if (dto.Description != null)
            existing.Description = dto.Description;

        if (dto.LongDescription != null)
            existing.LongDescription = dto.LongDescription;

            if (dto.ImageUrl != null)
    existing.ImageUrl = dto.ImageUrl;

        if (dto.Origin != null)
            existing.Origin = dto.Origin;

        if (dto.MealsCount.HasValue)
            existing.MealsCount = dto.MealsCount.Value;

        if (dto.Price.HasValue)
            existing.Price = dto.Price.Value;

        if (dto.SetSalePrice)
        {
            existing.SalePrice = dto.SalePrice; // kan vara null eller number
        }

        if (dto.Type != null)
            existing.Type = dto.Type;

        if (dto.IsLocalOnly.HasValue)
            existing.IsLocalOnly = dto.IsLocalOnly.Value;

        if (dto.IsPopular.HasValue)
            existing.IsPopular = dto.IsPopular.Value;

        if (dto.Stock.HasValue)
            existing.Stock = dto.Stock.Value;



        await _repo.UpdateAsync(existing);

        return existing;
    }
    public async Task DeleteAsync(int id)
    {
        var product = await _repo.GetByIdForDeleteAsync(id);

        if (product == null)
            throw new Exception("Product not found");

        await _repo.RemoveFromBundles(id);

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

    public async Task AddProductToBundleAsync(ProductBundleDto dto)
    {
        var bundle = new ProductBundle
        {
            BundleId = dto.BundleId,
            ProductId = dto.ProductId,
            Quantity = dto.Quantity
        };

        await _repo.AddProductToBundleAsync(bundle);
    }
}