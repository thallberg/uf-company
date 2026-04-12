using Microsoft.EntityFrameworkCore;

public class OrderRepository : IOrderRepository
{
    private readonly AppDbContext _context;

    public OrderRepository(AppDbContext context)
    {
        _context = context;
    }

    public async Task AddAsync(Order order)
    {
        _context.Add(order);
        await _context.SaveChangesAsync();
    }

    // 👤 CUSTOMER → bara sina orders
    public async Task<List<Order>> GetByUserIdAsync(int userId)
    {
        return await _context.Set<Order>()
            .Include(o => o.User)
            .Include(o => o.Items)
            .ThenInclude(i => i.Product)
            .Where(o => o.UserId == userId) // 🔥 VIKTIG (behåll!)
            .ToListAsync();
    }

    // 👑 ADMIN → alla orders
    public async Task<List<Order>> GetAllAsync()
    {
        return await _context.Set<Order>()
            .Include(o => o.User)
            .Include(o => o.Items)
            .ThenInclude(i => i.Product)
            .ToListAsync(); // 🔥 ingen WHERE här
    }

    public async Task<Order?> GetByIdAsync(int id)
    {
        return await _context.Set<Order>()
            .Include(o => o.Items)
            .ThenInclude(i => i.Product)
            .FirstOrDefaultAsync(o => o.Id == id);
    }

    public async Task UpdateAsync(Order order)
    {
        _context.Update(order);
        await _context.SaveChangesAsync();
    }
}