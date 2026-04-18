using Microsoft.EntityFrameworkCore;

public class ProductRepository : IProductRepository
{
    private readonly AppDbContext _context;

    public ProductRepository(AppDbContext context)
    {
        _context = context;
    }

    public async Task<List<Product>> GetAllAsync()
    {
        return await _context.Set<Product>().ToListAsync();
    }

    public async Task<Product?> GetByIdAsync(int id)
    {
        return await _context.Products
            .Include(p => p.BundleItems)
            .ThenInclude(pb => pb.Product)
            .FirstOrDefaultAsync(p => p.Id == id);
    }

    public async Task AddAsync(Product product)
    {
        _context.Add(product);
        await _context.SaveChangesAsync();
    }

    public async Task UpdateAsync(Product product)
    {
        _context.Update(product);
        await _context.SaveChangesAsync();
    }

    public async Task DeleteAsync(Product product)
    {
        // 🔥 detach relations först
        _context.Entry(product).State = EntityState.Deleted;

        await _context.SaveChangesAsync();
    }

    public async Task<List<Product>> GetFilteredAsync(string? type, bool? isLocal, string? search)
    {
        var query = _context.Set<Product>().AsQueryable();

        if (!string.IsNullOrEmpty(type))
            query = query.Where(p => p.Type == type);

        if (isLocal.HasValue)
            query = query.Where(p => p.IsLocalOnly == isLocal.Value);

        if (!string.IsNullOrEmpty(search))
            query = query.Where(p => p.Name.ToLower().Contains(search.ToLower()));

        return await query.ToListAsync();
    }

    public async Task<(List<Product>, int totalCount)> GetPagedAsync(
        int page,
        int pageSize,
        string? type,
        bool? isLocal,
        string? search)
    {
        var query = _context.Products
            .Include(p => p.BundleItems)
            .ThenInclude(pb => pb.Product)
            .AsQueryable();

        if (type == "Bundle")
        {
            query = query
                .Include(p => p.BundleItems)
                .ThenInclude(pb => pb.Product);
        }

        if (!string.IsNullOrEmpty(type))
            query = query.Where(p => p.Type == type);

        if (isLocal.HasValue)
            query = query.Where(p => p.IsLocalOnly == isLocal.Value);

        if (!string.IsNullOrEmpty(search))
            query = query.Where(p =>
                p.Name.ToLower().Contains(search.ToLower()) ||
                p.Description.ToLower().Contains(search.ToLower()));

        var totalCount = await query.CountAsync();

        var data = await query
            .Skip((page - 1) * pageSize)
            .Take(pageSize)
            .ToListAsync();

        return (data, totalCount);
    }

    public async Task AddProductToBundleAsync(ProductBundle bundle)
    {
        _context.ProductBundles.Add(bundle);
        await _context.SaveChangesAsync();
    }
    public async Task RemoveFromBundles(int productId)
    {
        var items = await _context.ProductBundles
            .Where(x => x.ProductId == productId || x.BundleId == productId)
            .ToListAsync();

        _context.ProductBundles.RemoveRange(items);

        await _context.SaveChangesAsync();
    }

    public async Task<Product?> GetByIdForDeleteAsync(int id)
{
    return await _context.Products.FindAsync(id);
}
}